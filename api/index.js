export default async function handler(req, res) { if (req.method === "POST") { const body = req.body;

const TOKEN = "7994148332:AAEsD6iiGddt3Ddvg2EKOONS9aZUV-d94fo";
const SOURCE_CHANNEL_ID = "-1002792792265";
const TARGET_CHANNEL_ID = "-1002792792265"; // same as source

// ✅ /start command handler
if (body.message && body.message.text === "/start") {
  const chat_id = body.message.chat.id;

  const reply = {
    chat_id: chat_id,
    text: "✅ Bot is active and ready to forward!",
  };

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reply),
  });

  return res.status(200).send("Start command received");
}

// ✅ Channel forward
if (body.message && body.message.chat.id == SOURCE_CHANNEL_ID) {
  const messageId = body.message.message_id;

  const url = `https://api.telegram.org/bot${TOKEN}/forwardMessage`;
  const data = {
    chat_id: TARGET_CHANNEL_ID,
    from_chat_id: SOURCE_CHANNEL_ID,
    message_id: messageId,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Forward result:", result);
  } catch (error) {
    console.error("Error forwarding message:", error);
  }
}

res.status(200).send("OK");

} else { res.status(405).send("Method Not Allowed"); } }

    
