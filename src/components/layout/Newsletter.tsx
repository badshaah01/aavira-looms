"use client";

import { useState } from "react";
import { siteConfig } from "@/constants/site";

export function Newsletter() {
  const { newsletter } = siteConfig;
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Success state (UI only, no actual backend submission)
    setError("");
    setIsSubmitted(true);
  };

  return (
    <section className="w-full bg-card py-24 md:py-32 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl md:text-5xl font-heading text-primary mb-6">
          {newsletter.heading}
        </h2>
        <p className="text-lg text-foreground/80 font-body mb-10 max-w-xl mx-auto">
          {newsletter.body}
        </p>

        {isSubmitted ? (
          <div className="bg-white/60 rounded-lg p-6 inline-block shadow-sm">
            <p className="text-xl font-medium text-primary font-body">
              {newsletter.successMessage}
            </p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto relative"
          >
            <div className="w-full relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder={newsletter.placeholderText}
                className={`w-full px-6 py-4 rounded-md border ${
                  error ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors font-body bg-white text-foreground`}
                aria-label={newsletter.placeholderText}
              />
              {error && (
                <p className="absolute -bottom-6 left-0 text-red-500 text-sm font-body text-left">
                  {error}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors shadow-sm whitespace-nowrap"
            >
              {newsletter.buttonLabel}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
