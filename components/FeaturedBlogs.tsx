import { createClient } from "@/utils/supabase/server";
import React from "react";
import BlogShowcase from "./BlogShowcase";
import { Button } from "./ui/button";
import Link from "next/link";

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
}

async function FeaturedBlogs() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("is_published", true)
    .limit(2)
    .order("created_at", { ascending: false })
    .returns<Blog[]>();

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-start gap-y-10 py-10">
      <h2 className="text-2xl md:text-3xl text-foreground text-left self-start border-b-2 border-border">
        <span className="text-foreground/60">Featured</span> Blogs
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-5 md:gap-y-3">
        {data?.map((blog: Blog) => {
          return <BlogShowcase key={blog.id} blog={blog} />;
        })}
      </div>
      <div className="mt-5 mb-5 w-full flex justify-center items-center">
        <Link href="/blogs">
          <Button className="bg-primary border-2 border-border cursor-pointer hover:scale-95 hover:bg-accent text-black font-semibold">
            See More Blogs...
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FeaturedBlogs;