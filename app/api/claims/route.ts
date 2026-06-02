import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/claims - List claims
// POST /api/claims - Create claim
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('company_id');
  const rentalId = searchParams.get('rental_id');
  const status = searchParams.get('status');

  let query = supabase.from('claims').select('*, rental:rentals(*), company:companies(*)');

  if (companyId) {
    query = query.eq('company_id', companyId);
  }
  if (rentalId) {
    query = query.eq('rental_id', rentalId);
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
  const { rental_id, company_id, description } = body;

  if (!rental_id || !company_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('claims')
    .insert({ rental_id, company_id, description, status: 'open' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
