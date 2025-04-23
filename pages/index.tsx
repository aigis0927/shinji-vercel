import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/shinji", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.response }]);
    setLoading(false);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🌿 신지 챗봇</h1>
      <div style={{ marginBottom: "1rem" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.role === "user" ? "나" : "신지"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        rows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="신지에게 말을 걸어보세요..."
      />
      <button onClick={sendMessage} disabled={loading}>
        {loading ? "응답 중..." : "보내기"}
      </button>
    </main>
  );
}
