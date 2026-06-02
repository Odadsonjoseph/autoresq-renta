import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase';

// Dynamic company profile page - [slug]
export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Get company
  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!company) {
    return NextResponse.redirect(new URL('/404', request.url));
  }

  // Redirect to the dynamic page
  return NextResponse.next();
}
