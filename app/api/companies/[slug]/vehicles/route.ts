import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Get company by slug
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', slug)
    .single();

  if (companyError || !company) {
    return NextResponse.json({ error: 'Company not found' }, { status: 404 });
  }

  // Get active vehicles for this company
  const { data: vehicles, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('company_id', company.id)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(vehicles || []);
}
