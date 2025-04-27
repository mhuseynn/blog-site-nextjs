'use client';


const Footer = () => {
    return (
      <footer id="footer" className="bg-gray-50 text-[#141624] py-10 mt-16 border-t">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p className="text-sm text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
            </p>
            <p className="text-sm"><strong>Email :</strong> info@jstemplate.net</p>
            <p className="text-sm"><strong>Phone :</strong> 880 123 456 789</p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Quick Link</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Write a Blog</a></li>
              <li><a href="#" className="hover:underline">My Blogs</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
  
          {/* Category */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Category</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:underline">Lifestyle</a></li>
              <li><a href="#" className="hover:underline">Technology</a></li>
              <li><a href="#" className="hover:underline">Travel</a></li>
              <li><a href="#" className="hover:underline">Business</a></li>
              <li><a href="#" className="hover:underline">Economy</a></li>
              <li><a href="#" className="hover:underline">Sports</a></li>
            </ul>
          </div>
        </div>
  
        {/* Bottom */}
        <div className="max-w-6xl mx-auto mt-10 border-t pt-6 px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src="/logo2.svg" alt="Logo" className="w-6 h-6" />
            <span className="font-semibold">MetaBlog</span> © JS Template 2023. All Rights Reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Terms of Use</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  