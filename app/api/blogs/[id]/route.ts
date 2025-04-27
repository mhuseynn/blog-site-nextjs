import { createClient } from "@/utils/supabase/server";

// @ts-ignore

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) 
{
  const supabase = await createClient();
  const id = params.id;

  if (!id)
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("blogs")
    .select("*,category ( name ), author ( email )")
    .eq("id", id)
    .single();

  if (error)
    return new Response(JSON.stringify({ error: "Blog not found" }), {
      status: 404,
    });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

// @ts-ignore
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) 
{
  const supabase = await createClient();
  const body = await req.json();
  const id = params.id;
  const { title, body: content, thumbnail, category, author, timestamp } = body;

  if (!id)
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });

  const { data, error } = await supabase
    .from("blogs")
    .update({ title, body: content, thumbnail, category, author, timestamp })
    .eq("id", id)
    .single();

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}

// @ts-ignore
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) 
{
  const supabase = await createClient();
  const id = params.id;

  if (!id)
    return new Response(JSON.stringify({ error: "ID is required" }), {
      status: 400,
    });

  const { error } = await supabase.from("blogs").delete().eq("id", id);

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });

  return new Response(null, { status: 204 });
}
