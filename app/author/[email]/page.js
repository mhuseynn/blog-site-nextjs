// app/author/[email]/page.js

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // To access the dynamic parameter
import MediaList from "@/components/MediaList";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuthorPage() {
  const { email } = useParams(); // Get the author's email from the URL
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs for the author when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs/author/${email}`); // Adjust to your API route
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setBlogs(data); // Set the blogs to the state
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

  // Show loading or error message
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
          <div className="text-white bg-gray-500 p-[30px] border rounded-lg mt-[50px]">Author: {email}</div>
          </div>
          
        </div>
        <MediaList blogs={blogs} />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
