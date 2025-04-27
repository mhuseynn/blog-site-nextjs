'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';


const supabase =   createClient();


export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const router = useRouter();

  const toggleDropdown = () => {
    setOpen((prev) => !prev)
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleLogout = async () => {
     
    const { error } = await supabase.auth.signOut();
  
    if (!error) {
      router.push('/');
    } else {
      console.error('Logout failed:', error.message);
    }
    
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <img
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
          src="/profile4.svg"
          alt="Profile"
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <Link href="/profile">
            <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              Profile
            </div>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
