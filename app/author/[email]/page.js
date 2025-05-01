"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MediaList from "@/components/MediaList";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { createClient } from "@/utils/supabase/client";

export default function AuthorPage() {
  const { email } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();
  }, []);
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs/author/${email}`); 
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBlogs(data); 
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchBlogs();
    }
  }, [email]);

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="w-full h-[200px] bg-black flex flex-col items-center ">
          <div className="flex">
          <img src="/logo2.svg" className="w-[100px] border rounded-2xl bg-gray-100 mt-[50px] mr-[20px] "></img>
          <div className="text-white bg-gray-500 p-[30px] border rounded-lg mt-[50px]">Author: {decodeURIComponent(email)}</div>
          </div>
          
        </div>
        {((user?.email != decodeURIComponent(email))) ?
        (<MediaList blogs={blogs} showDelete={false}/>) : (<MediaList blogs={blogs} showDelete={true}/>)
}
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
