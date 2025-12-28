"use client";

import React, { useEffect } from "react";
import { useForm } from "@formspree/react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export function ContactForm() {
  const [state, handleSubmit] = useForm("xwvknpjb");

  useEffect(() => {
    if (state.succeeded) {
      toast.success(
        "Thanks for reaching out! I will get back to you as soon as I can.",
        {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  }, [state.succeeded]);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-card border-2 border-border rounded-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Your Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full px-4 py-2 rounded-xl bg-card border-2 border-border
                       focus:outline-none focus:ring-2 focus:ring-primary
                       transition"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="phone"
            className="text-sm font-semibold text-foreground"
          >
            Your Phone
          </label>
          <input
            id="phone"
            name="phone"
            required
            className="w-full px-4 py-2 rounded-xl bg-card border-2 border-border
                       focus:outline-none focus:ring-2 focus:ring-primary
                       transition"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-foreground"
          >
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded-xl bg-card border-2 border-border
                       focus:outline-none focus:ring-2 focus:ring-primary
                       transition"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-foreground"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-2 rounded-xl bg-card border-2 border-border
                       resize-none focus:outline-none focus:ring-2 focus:ring-primary
                       transition"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center pt-2">
          <Button
            type="submit"
            className="px-8 py-2 bg-accent text-black font-semibold
                       border-2 border-border rounded-xl
                       hover:scale-95 hover:bg-accent/90
                       transition-transform"
            disabled={state.submitting}
          >
            {state.submitting ? "Sending..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}