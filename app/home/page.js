"use client";

import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer";
import MediaList from "@/components/MediaList.tsx";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import Loading from "@/components/Loading";
import { useState } from "react";
const HomePage = () => {
  const [changeDetected, setChangeDetected] = useState(false);
  const {
    data: blogs,
    loading,
    error,
  } = useFetchData({
    url: "/api/blogs",
    options: { method: "GET" },
    trigger: changeDetected,
  });

  const oldestBlog = blogs?.reduce((oldest, current) => {
    return new Date(current.timestamp) < new Date(oldest.timestamp)
      ? current
      : oldest;
  }, blogs[0]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-4 py-10">
        {oldestBlog && (
          <Link href={`/blogs/${oldestBlog.id}`} className="block mb-8">
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <img
                src={oldestBlog.thumbnail}
                alt={oldestBlog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 text-white">
                <span className="text-blue-400 text-xs mb-2">{oldestBlog.category.name}</span>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {oldestBlog.title}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span>{oldestBlog.author?.email}</span>
                  <span>•</span>
                  <span>
                    {new Date(oldestBlog.created_at).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
        <MediaList blogs={blogs} />
      </main>
      <Footer/>
    </div>
  );
};
export default HomePage;
