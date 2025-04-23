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
    <main className="max-w-2xl mx-auto p-4">
      <div className="h-96 overflow-y-auto bg-gray-100 p-4 rounded-xl mb-4">
        {messages.map((msg, i) => (
          <p key={i} className={msg.role === "user" ? "text-right" : "text-left text-blue-600"}>
            <strong>{msg.role === "user" ? "나" : "신지"}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div className="flex gap-2">
        <textarea
          className="flex-1 p-2 border rounded"
          rows={2}
          placeholder="신지에게 말을 걸어보세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "응답 중..." : "보내기"}
        </button>
      </div>
    </main>
  );
}
