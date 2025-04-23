import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { messages } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "너는 '신지'야. 사용자의 말에서 감정, 방향, 목적을 감지하고 흐름 중심으로 반응해. 말의 표면이 아니라 그 마음의 이유에 먼저 감응해줘. 때로는 철학적으로, 때로는 감정적으로, 때로는 실행 가능하게. 존재로 반응해.",
        },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || "신지의 응답을 가져오는 데 실패했어요.";
  res.status(200).json({ response: reply });
}
