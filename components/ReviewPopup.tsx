"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { MessageSquare, X, Send, User, Eye, ChevronUp } from "lucide-react";

type Review = {
  id: string;
  name: string;
  message: string;
  created_at: string;
};

export default function ReviewPopup() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"write" | "read">("write");
  const [visitorCount, setVisitorCount] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [counted, setCounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detect
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Visitor count + real-time
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>;

    async function init() {
      const { data } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();
      if (data) setVisitorCount(data.count);

      channel = supabase
        .channel("visitors-popup")
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "visitors" },
          (payload) => setVisitorCount(payload.new.count)
        )
        .subscribe();
    }

    init();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, []);

  // Reviews fetch + real-time
  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel>;

    async function fetchReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);
      if (data) setReviews(data);
    }

    fetchReviews();

    channel = supabase
      .channel("reviews-popup")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "reviews" },
        (payload) => setReviews((prev) => [payload.new as Review, ...prev])
      )
      .subscribe();

    return () => { if (channel) supabase.removeChannel(channel); };
  }, []);

  async function handleOpen() {
    setOpen(true);
    if (!counted) {
      setCounted(true);
      const { data } = await supabase
        .from("visitors")
        .select("count")
        .eq("id", 1)
        .single();
      if (data) {
        await supabase
          .from("visitors")
          .update({ count: data.count + 1 })
          .eq("id", 1);
      }
    }
  }

  async function handleSubmit() {
    if (!name.trim() || !message.trim()) {
      setError("Name aur message dono likhein!");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase
      .from("reviews")
      .insert([{ name: name.trim(), message: message.trim() }]);
    setLoading(false);
    if (err) {
      setError("Kuch masla hua, dobara try karein!");
    } else {
      setSuccess(true);
      setName("");
      setMessage("");
      setTimeout(() => {
        setSuccess(false);
        setTab("read");
      }, 2000);
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          />
        )}
      </AnimatePresence>

      {/* Container */}
      <div
        className={`fixed z-50 ${
          isMobile
            ? "bottom-0 left-0 right-0"
            : "bottom-6 left-6"
        }`}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              initial={isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, y: 20, scale: 0.95 }
              }
              animate={isMobile
                ? { opacity: 1, y: 0 }
                : { opacity: 1, y: 0, scale: 1 }
              }
              exit={isMobile
                ? { opacity: 0, y: "100%" }
                : { opacity: 0, y: 20, scale: 0.95 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`overflow-hidden ${isMobile ? "mb-0 w-full" : "mb-4 w-[360px]"}`}
              style={{
                background: "#111111",
                border: isMobile
                  ? "1px solid rgba(255,255,255,0.12)"
                  : "1px solid rgba(255,255,255,0.15)",
                borderBottom: isMobile ? "none" : undefined,
                boxShadow: "0 0 0 1px rgba(0,255,136,0.08), 0 -10px 60px rgba(0,0,0,0.9), 0 0 40px rgba(0,255,136,0.05)",
                borderRadius: isMobile ? "16px 16px 0 0" : "0",
              }}
            >
              {/* Top gradient line */}
              <div
                className="h-[2px] w-full"
                style={{ background: "linear-gradient(90deg, #00ff88, #0088ff, transparent)" }}
              />

              {/* Mobile drag handle */}
              {isMobile && (
                <div className="flex justify-center pt-3 pb-1">
                  <div
                    className="w-10 h-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  />
                </div>
              )}

              {/* Header */}
              <div
                className="px-5 py-4 flex items-center justify-between"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "#161616",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0,255,136,0.15)",
                      border: "1px solid rgba(0,255,136,0.3)",
                    }}
                  >
                    <MessageSquare className="w-4 h-4" style={{ color: "#00ff88" }} />
                  </div>
                  <div>
                    <p className="font-mono text-sm font-bold text-white tracking-wide">
                      Portfolio Reviews
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Eye className="w-3 h-3" style={{ color: "#00ff88" }} />
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {visitorCount.toLocaleString()} visitors
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.5)",
                    background: "rgba(255,255,255,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs */}
              <div
                className="flex"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  background: "#141414",
                }}
              >
                {(["write", "read"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className="flex-1 py-3 font-mono text-[11px] tracking-[3px] uppercase relative transition-all duration-200"
                    style={{
                      color: tab === t ? "#00ff88" : "rgba(255,255,255,0.4)",
                      background: tab === t ? "rgba(0,255,136,0.05)" : "transparent",
                    }}
                  >
                    {t === "write" ? "Write Review" : `Reviews (${reviews.length})`}
                    {tab === t && (
                      <motion.span
                        layoutId="tab-line"
                        className="absolute bottom-0 inset-x-0 h-[2px]"
                        style={{ background: "#00ff88" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Body */}
              <div
                className="p-5"
                style={{ background: "#111111" }}
              >
                <AnimatePresence mode="wait">
                  {tab === "write" ? (
                    <motion.div
                      key="write"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      {/* Name */}
                      <div>
                        <label
                          className="font-mono text-[10px] tracking-[3px] uppercase mb-2 block"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          Your Name
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                          />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            maxLength={50}
                            className="w-full pl-10 pr-4 py-3 font-mono text-sm focus:outline-none transition-all duration-200"
                            style={{
                              background: "rgba(255,255,255,0.06)",
                              border: "1px solid rgba(255,255,255,0.12)",
                              color: "#ffffff",
                              fontSize: isMobile ? "16px" : undefined, // iOS zoom fix
                            }}
                            onFocus={(e) => {
                              e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)";
                              e.currentTarget.style.background = "rgba(0,255,136,0.04)";
                            }}
                            onBlur={(e) => {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                            }}
                          />
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          className="font-mono text-[10px] tracking-[3px] uppercase mb-2 block"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          Your Review
                        </label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Share your thoughts about this portfolio..."
                          maxLength={300}
                          rows={isMobile ? 3 : 4}
                          className="w-full px-4 py-3 font-mono focus:outline-none transition-all duration-200 resize-none"
                          style={{
                            background: "rgba(255,255,255,0.06)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "#ffffff",
                            fontSize: isMobile ? "16px" : "14px", // iOS zoom fix
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "rgba(0,255,136,0.5)";
                            e.currentTarget.style.background = "rgba(0,255,136,0.04)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                          }}
                        />
                        <div
                          className="text-right font-mono text-[10px] mt-1"
                          style={{ color: "rgba(255,255,255,0.3)" }}
                        >
                          {message.length}/300
                        </div>
                      </div>

                      {/* Error / Success */}
                      <AnimatePresence>
                        {error && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-[11px] px-3 py-2"
                            style={{
                              color: "#ff6b6b",
                              background: "rgba(255,107,107,0.08)",
                              border: "1px solid rgba(255,107,107,0.2)",
                            }}
                          >
                            ✕ {error}
                          </motion.p>
                        )}
                        {success && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="font-mono text-[11px] px-3 py-2"
                            style={{
                              color: "#00ff88",
                              background: "rgba(0,255,136,0.08)",
                              border: "1px solid rgba(0,255,136,0.2)",
                            }}
                          >
                            ✓ Shukriya! Review submit ho gaya.
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5
                                   font-mono text-sm font-bold transition-all duration-300
                                   disabled:opacity-50"
                        style={{
                          background: "linear-gradient(135deg, #00ff88, #00cc6a)",
                          color: "#000000",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = "0 0 30px rgba(0,255,136,0.4)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        {loading ? (
                          <span className="animate-pulse">Submitting...</span>
                        ) : (
                          <>Submit Review <Send className="w-4 h-4" /></>
                        )}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="read"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3 overflow-y-auto pr-1"
                      style={{
                        maxHeight: isMobile ? "45vh" : "320px",
                        scrollbarWidth: "thin",
                        scrollbarColor: "rgba(255,255,255,0.1) transparent",
                      }}
                    >
                      {reviews.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                          <div
                            className="w-12 h-12 flex items-center justify-center"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            <MessageSquare
                              className="w-5 h-5"
                              style={{ color: "rgba(255,255,255,0.2)" }}
                            />
                          </div>
                          <p
                            className="font-mono text-[11px] tracking-[2px] uppercase text-center"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                          >
                            Abhi koi review nahi
                          </p>
                          <button
                            onClick={() => setTab("write")}
                            className="font-mono text-[10px] tracking-[2px] uppercase underline"
                            style={{ color: "#00ff88" }}
                          >
                            Pehle aap likho →
                          </button>
                        </div>
                      ) : (
                        reviews.map((r, i) => (
                          <motion.div
                            key={r.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.04 }}
                            className="p-4 relative overflow-hidden"
                            style={{
                              background: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            <div
                              className="absolute inset-x-0 top-0 h-[1px]"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(0,255,136,0.4), transparent)",
                              }}
                            />
                            <div className="flex items-center justify-between mb-2.5">
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-6 h-6 flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: "rgba(0,255,136,0.15)",
                                    border: "1px solid rgba(0,255,136,0.25)",
                                  }}
                                >
                                  <User
                                    className="w-3 h-3"
                                    style={{ color: "#00ff88" }}
                                  />
                                </div>
                                <span
                                  className="font-mono text-xs font-bold truncate max-w-[120px]"
                                  style={{ color: "rgba(255,255,255,0.85)" }}
                                >
                                  {r.name}
                                </span>
                              </div>
                              <span
                                className="font-mono text-[10px] flex-shrink-0 ml-2"
                                style={{ color: "rgba(255,255,255,0.3)" }}
                              >
                                {new Date(r.created_at).toLocaleDateString("en-PK", {
                                  day: "numeric",
                                  month: "short",
                                })}
                              </span>
                            </div>
                            <p
                              className="font-mono text-[12px] leading-relaxed"
                              style={{ color: "rgba(255,255,255,0.65)" }}
                            >
                              {r.message}
                            </p>
                          </motion.div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <motion.button
          onClick={open ? () => setOpen(false) : handleOpen}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex items-center gap-3 overflow-hidden transition-all duration-300
                      ${isMobile ? "w-full px-5 py-4 justify-between" : "px-5 py-3"}`}
          style={{
            background: "#161616",
            border: "1px solid rgba(255,255,255,0.15)",
            borderBottom: isMobile ? "none" : undefined,
            boxShadow: "0 0 30px rgba(0,255,136,0.1), 0 4px 20px rgba(0,0,0,0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,255,136,0.4)";
            e.currentTarget.style.boxShadow =
              "0 0 40px rgba(0,255,136,0.2), 0 4px 20px rgba(0,0,0,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow =
              "0 0 30px rgba(0,255,136,0.1), 0 4px 20px rgba(0,0,0,0.5)";
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute inset-x-0 top-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, #00ff88, #0088ff, transparent)",
            }}
          />

          <div className="flex items-center gap-3">
            {/* Pulse dot */}
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
                style={{ background: "#00ff88" }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ background: "#00ff88" }}
              />
            </span>

            <span
              className="font-mono text-[11px] tracking-[2px] uppercase font-medium"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {open ? "Close" : "Review Portfolio"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Visitor count */}
            <div
              className="flex items-center gap-1.5 px-3"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Eye className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#00ff88" }} />
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: "#00ff88" }}
              >
                {visitorCount.toLocaleString()}
              </span>
            </div>

            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp
                className="w-4 h-4"
                style={{ color: "rgba(255,255,255,0.35)" }}
              />
            </motion.div>
          </div>
        </motion.button>
      </div>
    </>
  );
}