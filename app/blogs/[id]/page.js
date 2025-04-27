// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function BlogDetailPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`/api/blogs/${id}`);
//         const data = await res.json();
//         setBlog(data);
//       } catch (err) {
//         console.error("Failed to load blog", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!blog) return <div>Blog not found.</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
//       <p className="text-sm text-gray-500 mb-6">{new Date(blog.created_at).toLocaleDateString()}</p>
//       {blog.thumbnail && (
//         <img src={blog.thumbnail} alt="Blog Thumbnail" className="w-full rounded-lg mb-6" />
//       )}
//       <div
//         className="prose"
//         dangerouslySetInnerHTML={{ __html: blog.body }}
//       />
//     </div>
//   );
// }
'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// interface Blog {
//   id: number;
//   title: string;
//   body: string;
//   thumbnail: string;
//   created_at: string;
//   category: string;
//   author: {
//     name: string;
//     thumbnail: string;
//   };
// }

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        console.log(data);
        setBlog(data);
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!blog) return <div className="text-center mt-10">Blog not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Category */}
      <span className="inline-block bg-blue-600 text-white  text-xs font-semibold px-3 py-1 rounded-full mb-4">
        {blog.category?.name}
      </span>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Author & Date */}
      <div className="flex items-center gap-3 text-gray-500 text-sm mb-6">
        <span>{blog.author?.email}</span>
        <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}</span>
      </div>

      {/* Thumbnail */}
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt="Blog Thumbnail"
          className="w-full rounded-lg mb-6"
        />
      )}

      {/* Body */}
      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.body }}
      />
    </div>
  );
}
