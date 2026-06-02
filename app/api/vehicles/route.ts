import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/vehicles - List vehicles for a company
// POST /api/vehicles - Create new vehicle
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('company_id');
  const status = searchParams.get('status');

  let query = supabase.from('vehicles').select('*');

  if (companyId) {
    query = query.eq('company_id', companyId);
  }
  if (status) {
    query = query.eq('status', status);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { company_id, make, model, year, color, vin, license_plate, retail_price, broker_price } = body;

  if (!company_id || !make || !model || !year || !retail_price) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      company_id,
      make,
      model,
      year,
      color,
      vin,
      license_plate,
      retail_price,
      broker_price,
      status: 'active',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
