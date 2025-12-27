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
    <Card className="relative w-full bg-card border border-border rounded-3xl overflow-hidden">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Header */}
      <CardHeader className="relative px-5 md:px-8 pt-8 pb-6">
        <CardTitle className="text-foreground text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
          {section.heading}
        </CardTitle>

        {/* Accent Divider */}
        <div className="mt-4 h-[3px] w-24 rounded-full bg-gradient-to-r from-primary to-secondary" />
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
                  className="w-full max-h-[520px] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
            ))}
          </div>
        )}

        {/* Markdown Content */}
<div className="prose prose-neutral dark:prose-invert max-w-none leading-normal">
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
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-secondary/30 blur-lg opacity-20 group-hover:opacity-40 transition duration-700" />

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