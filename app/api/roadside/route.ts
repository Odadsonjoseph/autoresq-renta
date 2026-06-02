import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/roadside - List roadside requests
// POST /api/roadside - Create roadside request
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customer_id');
  const rentalId = searchParams.get('rental_id');
  const status = searchParams.get('status');

  let query = supabase.from('roadside_requests').select('*, rental:rentals(*), customer:customers(*)');

  if (customerId) {
    query = query.eq('customer_id', customerId);
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
  const { rental_id, customer_id, issue_type, location_lat, location_lng } = body;

  if (!rental_id || !customer_id || !issue_type) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('roadside_requests')
    .insert({
      rental_id,
      customer_id,
      issue_type,
      location_lat,
      location_lng,
      status: 'pending',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
