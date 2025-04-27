// app/search/page.tsx (using App Router)
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MediaList from "@/components/MediaList";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || ""; // Extract the 'query' parameter
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery) {
      searchBlogs(searchQuery);
    }
  }, [searchQuery]);

  const searchBlogs = async (query: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("blogs") // Replace with your table name
      .select("*, category (name),author (email)" )
      .ilike("title", `%${query}%`); // Perform a case-insensitive search in the 'title' column

    if (error) {
      console.error("Error fetching search results:", error);
      return;
    }

    setResults(data); // Set the results if there are no errors
  };

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
          Search Results for "{searchQuery}"
        </h1>

        {results.length === 0 ? (
          <p>No results found</p>
        ) : (
          <div >
            <MediaList blogs={results}/>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
