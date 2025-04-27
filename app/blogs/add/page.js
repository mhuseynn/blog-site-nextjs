import { SessionProvider } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import BlogForm from '@/components/BlogForm'; // Assuming BlogForm is your form component



function AddBlog({ session }) {
  return (
    <div>
        <BlogForm />
    </div>
  );
}

export default AddBlog;
