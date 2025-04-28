'use client';

import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface BlogCategory {
  id: number;
  name: string;
}
interface User{
  email:string;
}

interface BlogAuthor {
  id: string;
  email: string;
  thumbnail: string;
}

interface Blog {
  id: number;
  created_at: string;
  thumbnail: string;
  title: string;
  body: string;
  author: BlogAuthor;
  category: BlogCategory;
}

interface MediaListProps {
  blogs: Blog[];
  showDelete?: boolean; 
}

export default function MediaList({ blogs, showDelete = false }: MediaListProps) {
  const [visibleCount, setVisibleCount] = useState(9);
  
  const handleLoadMore = () => setVisibleCount(v => v + 9);

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });

    if (res.ok) {
      window.location.reload(); 
    } else {
      alert('Failed to delete blog.');
    }
  };
  

 

  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {blogs.slice(0, visibleCount).map(blog => (
          <div
            key={blog.id}
            className="relative bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
          >
            
            {(showDelete ) && (
              <button
                onClick={() => handleDelete(blog.id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
              >
                <img
                src="/delete.svg"
                className="w-[20px]"
              />
              </button>
            )}

            <Link href={`/blogs/${blog.id}`} className="block">
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-3">
                <span className="text-xs text-blue-500 font-medium">
                  {blog.category?.name}
                </span>
                <h3 className="text-md font-semibold mt-2">{blog.title}</h3>
                <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                  <span>{blog.author?.email}</span>
                  <span>
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {visibleCount < blogs.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleLoadMore}
            className="border border-gray-500 text-black px-6 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}
