import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client';

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = params;

  const supabase = createClient();

  
  const { data: authorData, error: authorError } = await supabase
    .from('authors') 
    .select('id')
    .eq('email', email) 
    .single(); 

  if (authorError || !authorData) {
    console.error("Error fetching author:", authorError); 
    return NextResponse.json({ error: 'Author not found', details: authorError }, { status: 404 });
  }

  const authorId = authorData.id; 

 
  const { data: blogs, error: blogsError } = await supabase
    .from('blogs') 
    .select('*')
    .eq('author', authorId); 

  if (blogsError) {
    console.error("Error fetching blogs:", blogsError); 
    return NextResponse.json({ error: 'Failed to fetch blogs', details: blogsError }, { status: 500 });
  }


  return NextResponse.json(blogs);
}
