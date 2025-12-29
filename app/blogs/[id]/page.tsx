export const dynamic = "force-dynamic";
import ScrollToUp from "@/components/ScrollToUp";
import SectionShowcase from "@/components/SectionShowcase";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import React from "react";
import {
  BiCalendar,
  BiLeftArrowAlt,
  BiUpArrow,
  BiUpArrowCircle,
} from "react-icons/bi";

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
interface Section {
  id: string;
  blog_id: string;
  heading: string;
  content: string;
  image: string[];
  code: string[];
  code_language: string[];
  order: number;
  created_at: string;
}

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = (await params).id;
  const supabase = await createClient();

  // fetch post information
  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", slug)
    .single<Blog>();

  if (error || !blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog does not exist.",
    };
  }

  return {
    title: `${blog.title} | Akarsh Jha`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [
        {
          url: blog.cover_image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.cover_image],
    },
  };
}

async function Blog({ params }: { params: Promise<{ id: string }> }) {
  const { id: blogId } = await params;
  const supabase = await createClient();
  const { data: BlogDetails } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", blogId)
    .single<Blog>();
  const { data } = await supabase
    .from("blog_scetions")
    .select("*")
    .eq("blog_id", blogId)
    .order("order", { ascending: true })
    .returns<Section[]>();
  const createdAtDate = new Date(
    BlogDetails?.created_at || "2025-06-12"
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-8 md:mt-16 relative w-full flex flex-col justify-start items-start gap-y-6 md:gap-y-7">
      <Link href={"/blogs"}>
        <Button className="bg-secondary text-xs md:text-sm dark:text-black text-foreground flex flex-row justify-center items-center gap-x-2">
          <BiLeftArrowAlt className="text-lg" /> Back To Blogs
        </Button>
      </Link>

      <section
        id="top"
        className="w-full h-56 md:h-100 rounded-2xl border-2 border-border overflow-hidden"
      >
        {BlogDetails?.cover_image && (
          <img
            src={BlogDetails.cover_image}
            alt={BlogDetails.title}
            className="w-full h-full object-fit"
          />
        )}
      </section>

      <div className="flex flex-col justify-between items-start gap-y-3 border-b-2 border-border pb-5 w-full">
        <h1 className="text-3xl md:text-5xl text-wrap leading-tight md:leading-normal text-foreground font-bold tracking-tight">
          {BlogDetails?.title}
        </h1>
        <p className="text-base md:text-lg text-foreground/70">
          {BlogDetails?.description}
        </p>
        <p className="flex flex-row justify-center items-center gap-x-2 text-foreground text-sm md:text-lg font-semibold mt-1">
          <BiCalendar className="text-xl" /> {createdAtDate}
        </p>
      </div>

      <div className="mt-5 w-full flex flex-col justify-start items-start gap-y-10 md:gap-y-12">
        {data?.map((section) => (
          <SectionShowcase key={section.id} section={section} />
        ))}
      </div>

      <div className="fixed top-[90vh] left-[80vw]">
        <ScrollToUp />
      </div>
      <div className="fixed right-10 flex flex-col"></div>

      <div className="mt-10 mb-10 w-full">
        <div className="text-foreground text-sm md:text-xl px-4 py-2 border-2 border-border w-fit bg-card rounded-xl">
          Written with ❤️ by{" "}
          <span className="text-foreground font-semibold">Akarsh Jha</span>
        </div>
      </div>
    </div>
  );
}

export default Blog;
