import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  isNew?: boolean;
};

const seed: Message[] = [
  {
    id: 1,
    sender: "Jenny / Suna",
    text: "oiiii aiyamii!! 🥺",
    time: "31st March, 2026 · 11:34 PM EDT",
  },
  {
    id: 2,
    sender: "Mann",
    text: "Jennyyyyyy!! ",
    time: "31st March, 2026 · 9:02 AM IST",
  },
];

function formatNow(sender: string) {
  const now = new Date();
  const tz = sender === "Mann" ? "IST" : "EDT";
  const timeStr = now.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return `${timeStr} ${tz}`;
}

function MessageBubble({ msg, index }: { msg: Message; index: number }) {
  const isMann = msg.sender === "Mann";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), msg.isNew ? 10 : index * 90 + 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={msg.isNew ? "message-new" : ""}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isMann ? "flex-end" : "flex-start",
        opacity: msg.isNew ? 1 : visible ? 1 : 0,
        transform: msg.isNew
          ? "none"
          : visible
          ? "translateY(0) translateX(0)"
          : `translateY(16px) translateX(${isMann ? "12px" : "-12px"})`,
        transition: msg.isNew
          ? "none"
          : "opacity 0.45s ease, transform 0.45s cubic-bezier(0.4,0,0.2,1)",
      }}
      data-testid={`message-${msg.id}`}
    >
      <p
        style={{
          fontSize: "10px",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          color: "var(--rose)",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "4px",
        }}
      >
        {msg.sender}
      </p>
      <div
        style={{
          maxWidth: "80%",
          background: isMann
            ? "linear-gradient(135deg, var(--rose), var(--deep))"
            : "hsl(var(--background))",
          color: isMann ? "white" : "hsl(var(--foreground))",
          border: isMann ? "none" : "1px solid var(--blush)",
          borderRadius: isMann ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
          padding: "0.75rem 1rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "15px",
          lineHeight: 1.8,
          fontWeight: 300,
          boxShadow: isMann
            ? "0 4px 14px rgba(201, 123, 132, 0.3)"
            : "0 2px 8px rgba(139, 74, 82, 0.06)",
        }}
      >
        {msg.text}
      </div>
      <p
        style={{
          fontSize: "10px",
          color: "var(--blush)",
          fontFamily: "'DM Sans', sans-serif",
          marginTop: "4px",
        }}
      >
        {msg.time}
      </p>
    </div>
  );
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(seed);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState<"Mann" | "Jenny / Suna">("Mann");
  const [focused, setFocused] = useState(false);
  const [sendHover, setSendHover] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(seed.length + 1);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const msg: Message = {
      id: nextId.current++,
      sender,
      text,
      time: formatNow(sender),
      isNew: true,
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10 fade-up visible">
        <p
          className="text-xs uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--rose)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Message Board
        </p>
        <h1
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(2rem, 5vw, 3rem)",
            color: "var(--deep)",
          }}
        >
          Leave a Message
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "var(--muted-color)",
          }}
        >
          A little space to say anything, across any distance.
        </p>
      </div>

      <div
        style={{
          background: "hsl(var(--card))",
          border: "1px solid var(--blush)",
          borderRadius: "1.25rem",
          overflow: "hidden",
          boxShadow: "0 4px 24px rgba(139, 74, 82, 0.07)",
        }}
      >
        {/* Message list */}
        <div
          ref={listRef}
          style={{
            maxHeight: "340px",
            overflowY: "auto",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            scrollbarWidth: "thin",
            scrollbarColor: "var(--blush) transparent",
          }}
        >
          {messages.map((msg, i) => (
            <MessageBubble key={msg.id} msg={msg} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "var(--blush)" }} />

        {/* Input area */}
        <div style={{ padding: "1rem 1.25rem" }}>
          {/* Sender switcher — sliding pill */}
          <div style={{ display: "flex", marginBottom: "0.75rem" }}>
            <div
              style={{
                position: "relative",
                display: "inline-flex",
                padding: "3px",
                background: "hsl(var(--muted))",
                borderRadius: "999px",
                border: "1px solid var(--blush)",
              }}
            >
              {/* Sliding pill */}
              <div
                style={{
                  position: "absolute",
                  top: "3px",
                  bottom: "3px",
                  left: "3px",
                  width: "calc(50% - 3px)",
                  background: "linear-gradient(135deg, var(--rose), var(--deep))",
                  borderRadius: "999px",
                  transform: sender === "Mann" ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
                  boxShadow: "0 2px 10px rgba(201,123,132,0.4)",
                  zIndex: 0,
                }}
              />
              {(["Mann", "Jenny / Suna"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSender(s)}
                  data-testid={`sender-${s.replace(/\s/g, "-")}`}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "4px 0",
                    width: "96px",
                    borderRadius: "999px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    background: "transparent",
                    color: sender === s ? "white" : "var(--muted-color)",
                    transition: "color 0.28s ease",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Write something..."
              rows={2}
              data-testid="input-message"
              style={{
                flex: 1,
                background: "hsl(var(--background))",
                border: `1px solid ${focused ? "var(--rose)" : "var(--blush)"}`,
                borderRadius: "0.75rem",
                padding: "0.6rem 0.85rem",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: "hsl(var(--foreground))",
                resize: "none",
                outline: "none",
                boxShadow: focused
                  ? "0 0 0 3px rgba(201, 123, 132, 0.15)"
                  : "none",
                transition: "border-color 0.25s ease, box-shadow 0.25s ease",
              }}
            />
            <button
              onClick={send}
              data-testid="button-send"
              onMouseEnter={() => setSendHover(true)}
              onMouseLeave={() => setSendHover(false)}
              style={{
                background: "linear-gradient(135deg, var(--rose), var(--deep))",
                color: "white",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0 1.25rem",
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                transform: sendHover ? "scale(1.04) translateY(-1px)" : "scale(1) translateY(0)",
                boxShadow: sendHover
                  ? "0 6px 18px rgba(201,123,132,0.45)"
                  : "0 2px 8px rgba(201,123,132,0.25)",
                transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1), box-shadow 0.2s ease",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
