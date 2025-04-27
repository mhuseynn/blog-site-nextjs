import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client'; // Assuming you're using Supabase or your preferred DB client

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = params; // Get the author's email from the URL

  const supabase = createClient();

  // Step 1: Fetch the author's id from the 'authors' table based on the provided email
  const { data: authorData, error: authorError } = await supabase
    .from('authors') // Assuming the table name is 'authors'
    .select('id')
    .eq('email', email) // Match the provided email
    .single(); // We expect only one result

  if (authorError || !authorData) {
    console.error("Error fetching author:", authorError); // Log error for debugging
    return NextResponse.json({ error: 'Author not found', details: authorError }, { status: 404 });
  }

  const authorId = authorData.id; // Get the author's id from the result

  // Step 2: Fetch the blogs by the author's id (authorId) from the 'blogs' table
  const { data: blogs, error: blogsError } = await supabase
    .from('blogs') // Assuming the table name is 'blogs'
    .select('*')
    .eq('author', authorId); // Use the 'author' column to filter by the author's id

  if (blogsError) {
    console.error("Error fetching blogs:", blogsError); // Log error for debugging
    return NextResponse.json({ error: 'Failed to fetch blogs', details: blogsError }, { status: 500 });
  }

  // Step 3: Return the blogs associated with the author
  return NextResponse.json(blogs);
}
