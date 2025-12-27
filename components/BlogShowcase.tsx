'use client';
import React from 'react'
import { motion } from 'framer-motion';
import { BiCalendar } from 'react-icons/bi';
import Link from 'next/link';

export interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

function BlogShowcase({ blog }: { blog: Blog }) {
  const createdAtDate = new Date(blog.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <Link href={`/blogs/${blog.id}`} className="w-full sm:w-auto">
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="group hover:bg-muted cursor-pointer h-auto min-h-112.5 w-full sm:w-80 font-mono rounded-2xl bg-card border-2 border-border overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-shadow"
      >
        <div className="h-48 sm:h-[40%] w-full overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full object-cover"
            src={blog.cover_image}
            alt={blog.title}
          />
        </div>

        <div className="flex-1 w-full px-4 py-4 sm:px-3 sm:py-2 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {blog.title}
          </h2>

          <p className="text-sm text-foreground/70 mt-2 leading-relaxed line-clamp-3 sm:line-clamp-none">
            {blog.description}
          </p>
          
          <div className='flex flex-row flex-wrap gap-2 justify-start items-center mt-5'>
            {blog.tags.map((tag) => (
              <div key={tag} className="text-[10px] sm:text-xs text-foreground font-semibold bg-card border-2 border-border rounded-2xl px-2 py-1">#{tag}</div>
            ))}
          </div>
          
          <div className='mt-auto pt-5 flex flex-row items-center gap-x-2 w-full'>
            <BiCalendar className="text-foreground/80" />
            <span className='text-xs text-foreground/80'>{createdAtDate}</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default BlogShowcase;