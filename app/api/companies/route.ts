import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST /api/companies - Create company
export async function POST(request: Request) {
  const body = await request.json();
  const { name, slug, logo_url, primary_color, contact_email, contact_phone, address } = body;

  if (!name || !slug) {
    return NextResponse.json({ error: 'Name and slug are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('companies')
    .insert({ name, slug, logo_url, primary_color, contact_email, contact_phone, address })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
