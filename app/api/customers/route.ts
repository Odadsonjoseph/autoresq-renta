import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/customers - List customers
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const email = searchParams.get('email');

  let query = supabase.from('customers').select('*');

  if (id) {
    query = query.eq('id', id);
  }
  if (email) {
    query = query.eq('email', email);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

// POST /api/customers - Register customer
export async function POST(request: Request) {
  const body = await request.json();
  const { email, full_name, phone } = body;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('customers')
    .insert({ email, full_name, phone })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
