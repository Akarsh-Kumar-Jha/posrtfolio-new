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
}

async function BlogsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("blogs").select().eq("is_published", true).returns<Blog[]>();

  return (
    <div className='min-h-[75vh] w-full flex flex-col justify-start items-center gap-y-10 font-sans py-10'>
      <h2 className='text-2xl md:text-3xl text-foreground border-b-2 border-border font-semibold'>Blogs</h2>
      <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-10 md:gap-y-7 justify-items-center'>
        {data?.map((blog) => (
          <BlogShowcase key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogsPage