"use client";
import { createClient } from "@/utils/supabase/client";


import { Moon, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    getUser();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
  
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMyBlogsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.email) {
      router.push(`/author/${encodeURIComponent(user.email)}`);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-sm bg-white">
      {/* Logo */}
      <div onClick={()=>
        {
          router.push("/home");
        }
      } className="flex items-center gap-2 cursor-pointer">
        <div className="w-9 h-9">
          <img
            src="/logo2.svg"
            alt="Logo"
            className="w-full h-full object-contain "
          />
        </div>
        <span className="text-xl font-semibold">
          MetaBlog
        </span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-8 text-gray-700">
        <a href="/home">Home</a>
        {user ? (
          <a href="/blogs/add">Write a Blog</a>
        ) : (
          <a href="/sign-in">Write a Blog</a>
        )}

        {user?(
          <a onClick={handleMyBlogsSubmit} href="">My Blogs</a>
        ) : (
          <a href="/sign-in">My Blogs</a>
        )}
        
        <a href="#footer">Contact</a>
      </div>

      {/* Search, Theme Toggle, Sign In */}
      <div className="flex items-center gap-4">
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center px-3 py-1 bg-gray-100 rounded-full"
        >
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent outline-none text-sm px-1"
          />
          <Search size={16} className="text-gray-500" />
        </form>

        <button className="bg-gray-200 rounded-full p-1">
          <Moon size={18} />
        </button>

        {user ? (
          <ProfileDropdown/>
        ) : (
          <Link href="/sign-in">
            <button className="bg-black text-white px-4 py-1 rounded-md">
              Sign in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
