import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CodeBlock } from "./ui/code-block";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

function SectionShowcase({ section }: { section: Section }) {
  return (
    <Card className="relative w-full bg-transparent border border-border/40 hover:border-border/70 transition-border duration-300 rounded-3xl overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Header */}
      <CardHeader className="relative px-5 md:px-8 pt-8 pb-6">
        <CardTitle className="text-foreground text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
          {section.heading}
        </CardTitle>

        {/* Accent Divider */}
        <div className="mt-4 h-0.75 w-24 rounded-full bg-linear-to-r from-primary to-secondary" />
      </CardHeader>

      <CardContent className="relative px-5 md:px-8 pb-10 flex flex-col gap-y-10">
        
        {/* Images */}
        {section.image.length > 0 && (
          <div className="grid grid-cols-1 gap-6">
            {section.image.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-border"
              >
                <img
                  src={image}
                  alt={section.heading}
                  className="w-full max-h-130 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        )}

        {/* Markdown Content */}
<div
  className="
    prose
    prose-neutral
    dark:prose-invert
    max-w-none
    leading-relaxed

    prose-headings:font-sans
    prose-headings:tracking-normal
    prose-h1:text-primary
    prose-h2:text-foreground
    prose-h3:text-foreground

    prose-p:text-foreground
    prose-p:leading-7

    prose-a:text-accent
    prose-a:font-medium
    prose-a:no-underline
    hover:prose-a:underline

    prose-strong:text-foreground
    prose-code:text-accent
    prose-code:bg-muted
    prose-code:px-1
    prose-code:py-0.5
    prose-code:rounded-none

    prose-pre:bg-muted
    prose-pre:text-foreground
    prose-pre:shadow-sm

    prose-blockquote:border-l-primary
    prose-blockquote:text-muted-foreground

    prose-hr:border-border

    prose-img:shadow-md
    prose-img:border
    prose-img:border-border
  "
>
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
    {section.content}
  </ReactMarkdown>
</div>


        {/* Code Blocks */}
        {section.code.length > 0 && (
          <div className="flex flex-col gap-y-8">
            {section.code.map((code, index) => (
              <div key={index} className="relative group">
                
                {/* Code Glow */}
                <div className="absolute -inset-1 rounded-2xl bg-linear-to-r from-primary/30 to-secondary/30 blur-lg opacity-20 group-hover:opacity-40 transition duration-700" />

                <div className="relative rounded-2xl overflow-hidden">
                  <CodeBlock
                    language={section.code_language[index] || "jsx"}
                    filename={
                      section.code_language[index]
                        ? `example.${section.code_language[index]}`
                        : "snippet"
                    }
                    code={code}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default SectionShowcase;