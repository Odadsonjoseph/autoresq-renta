import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/community/groups - List groups
// POST /api/community/groups - Create group
export async function GET(request: Request) {
  const { data, error } = await supabase
    .from('community_groups')
    .select('*, company:companies(name, slug)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, created_by } = body;

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('community_groups')
    .insert({ name, created_by })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
