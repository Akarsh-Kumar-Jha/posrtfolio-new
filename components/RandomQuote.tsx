import React from "react";

async function RandomQuote() {
  let quoteData = null;
  let error = false;

  try {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random",
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const data = await res.json();
    quoteData = data?.data;
  } catch (err) {
    error = true;
  }

  if (error) {
    return (
      <div className="w-full flex justify-center">
        <div className="px-4 py-3 bg-card border-2 border-border rounded-2xl">
          <p className="text-sm text-foreground/70 italic">
            Failed to load quote.
          </p>
        </div>
      </div>
    );
  }

  if (!quoteData) {
    return (
      <div className="w-full flex justify-center">
        <div className="px-4 py-3 bg-card border-2 border-border rounded-2xl animate-pulse">
          <p className="text-sm text-foreground/50">Loading quote...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4">
      <div
        className="max-w-3xl w-full p-4 flex flex-col gap-3
                   bg-card border-2 border-border rounded-2xl"
      >
        <p className="text-lg md:text-xl italic text-foreground leading-relaxed">
          “{quoteData.content}”
        </p>

       <div className="flex flex-col items-end gap-1">
  <span className="text-sm md:text-base text-foreground/70">
    — {quoteData.author || "Unknown"}
  </span>
<span className="text-xs italic text-foreground/40">
  (sorry for jyada gyaan 😅)
</span>
</div>
      </div>
    </div>
  );
}

export default RandomQuote;