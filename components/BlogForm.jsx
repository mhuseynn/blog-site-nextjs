"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();
const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [body, setBody] = useState("");
    const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    
    const { data: { user } } = await supabase.auth.getUser(); 

    if (!user) {
      toast.error("User not logged in");
      return; 
    }

    console.log(user.id);

    const authorId = user?.id; 

    const formDataToSend = new FormData();

    console.log(thumbnail);

    const res = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        category: category,
        thumbnail: thumbnail,
        author: authorId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast.success("Blog post created successfully");
      setTimeout(() => {
        router.push('/'); 
      }, 1000);
    } else {
      toast.error("Failed to create blog post");
    }
  };

  return (
    <div>
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Write a new blog
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Add title for blog
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700">
              Select category
            </label>
            <select
              id="category"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select category</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-gray-700">
              Add thumbnail image
            </label>
            <input
              type="file"
              id="thumbnail"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  const base64String = reader.result;
                  setThumbnail(base64String); 
                };
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="blogBody" className="block text-gray-700">
              Add blog body
            </label>
            <textarea
              id="blogBody"
              rows="6"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              placeholder="Write your blog content here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 rounded w-full hover:bg-yellow-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
