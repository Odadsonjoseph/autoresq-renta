import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/rentals - List rentals (filtered by role)
// POST /api/rentals - Create new rental
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customer_id');
  const companyId = searchParams.get('company_id');
  const status = searchParams.get('status');

  let query = supabase.from('rentals').select('*, vehicle:vehicles(*), company:companies(*), customer:customers(*)');

  if (customerId) {
    query = query.eq('customer_id', customerId);
  }
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
  const { vehicle_id, company_id, customer_id, start_date, end_date, total_price } = body;

  if (!vehicle_id || !company_id || !customer_id || !start_date || !end_date || !total_price) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('rentals')
    .insert({
      vehicle_id,
      company_id,
      customer_id,
      start_date,
      end_date,
      total_price,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
