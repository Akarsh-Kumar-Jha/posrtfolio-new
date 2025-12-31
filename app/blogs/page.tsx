export const dynamic = 'force-dynamic';

import BlogShowcase from '@/components/BlogShowcase';
import { createClient } from '@/utils/supabase/server';
import React from 'react'

interface Blog {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  tags: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
  pinned: boolean
}

async function BlogsPage() {
  const supabase = await createClient();
  const {data:pinned} = await supabase.from("blogs").select().eq("pinned", true).eq("is_published", true).order("created_at", { ascending: false }).returns<Blog[]>();
  const { data } = await supabase.from("blogs").select().eq("is_published", true).eq("pinned", false).order("created_at", { ascending: false }).returns<Blog[]>();

  return (
    <div className='min-h-[75vh] w-full flex flex-col justify-start items-center gap-y-10 font-sans py-10'>
      <h2 className='text-2xl md:text-3xl text-foreground border-b-2 border-border font-semibold'>Blogs</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-10 justify-items-center'>
        {
          pinned?.map((blog) => (
            <BlogShowcase key={blog.id} blog={blog} />
          ))
        }
        {
        data?.map((blog) => (
          <BlogShowcase key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogsPage