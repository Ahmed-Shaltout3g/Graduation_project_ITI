// chatService.js
import axios from "axios";

export const sendMessageToBot = async (messages) => {
  if (!messages.length) return "";

  const userMessage = messages[messages.length - 1].content;

  try {
    const res = await axios.post("http://127.0.0.1:8000/api/chatbot/", {
      message: userMessage,
    });
    return res.data.reply;
  } catch (err) {
    console.error("Error sending message:", err);
    return "An error occurred.";
  }
};
