import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('blogs').select('*,category (name),author (email)').order('created_at', { ascending: false });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(req: Request) {
    const supabase = await createClient();
    const bodyData = await req.json();
    const { title, body, category,thumbnail,author } = bodyData;
  
    if (!title || !body) {
      return new Response(JSON.stringify({ error: "Missing required field" }), { status: 400 });
    }
  
    const categoryName = typeof category === 'string' ? category : category?.name;

  
    const { data, error } = await supabase
      .from("blogs")
      .insert([{ 
        title, 
        body, 
        category: categoryName,
        thumbnail,
        author,
      }])
      .single();
  
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  }