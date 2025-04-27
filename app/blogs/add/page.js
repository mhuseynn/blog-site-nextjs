import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
import BlogForm from "@/components/BlogForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function AddBlog({ session }) {
  return (
    <div>
      <Navbar />
      <BlogForm />
      <Footer />
    </div>
  );
}

export default AddBlog;
