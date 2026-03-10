/** Search page */
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { searchContent } from "@/data/index";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = query.length >= 2 ? searchContent(query) : [];

  return (
    <main className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-display font-bold mb-6">Search</h1>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search courses, concepts, tools, commands..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          {query.length >= 2 && (
            <p className="text-sm text-muted-foreground mb-4">{results.length} results found</p>
          )}
          <div className="space-y-3">
            {results.map((r, i) => (
              <Link key={i} to={r.link} className="block glass rounded-xl p-4 hover:cyber-glow transition-shadow">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary capitalize">{r.type}</span>
                  <span className="font-semibold text-sm">{r.title}</span>
                </div>
                {r.titleAr && <p className="text-xs text-muted-foreground" dir="rtl">{r.titleAr}</p>}
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.snippet}</p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
