import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET /api/community/posts - List community posts
// POST /api/community/posts - Create post
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('company_id');

  let query = supabase.from('community_posts').select('*, company:companies(name, slug)');

  if (companyId) {
    query = query.eq('company_id', companyId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { company_id, content, media_urls } = body;

  if (!company_id || !content) {
    return NextResponse.json({ error: 'Company ID and content are required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('community_posts')
    .insert({ company_id, content, media_urls })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
