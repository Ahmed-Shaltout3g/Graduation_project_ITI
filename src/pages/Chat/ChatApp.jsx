import React, { useState } from "react";
import Header from "@components/ecommerce/Chat/Header";
import ChatMessages from "@components/ecommerce/Chat/ChatMessage";
import MessageInput from "@components/ecommerce/Chat/MessageInput";
const ChatApp = () => {
  const [messages, setMessages] = useState([
    { sender: "John Doe", text: "Hi there! I have a question about the 'Quantum Leap' laptop.", time: "10:30 AM", type: "received" },
    { sender: "You", text: "Hello, John! Yes, the 'Quantum Leap' is in stock and ready to ship. What would you like to know?", time: "10:31 AM", type: "sent" },
    { sender: "John Doe", text: "Great! Could you tell me more about the warranty and return policy?", time: "10:32 AM", type: "received" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "You", text: input, time: "Now", type: "sent" }]);
    setInput("");
  };

  return (
    <div
      className="d-flex flex-column vh-100"
      style={{
        backgroundColor: "#0F1A24",
        color: "#fff",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Header */}
      <Header />

      {/* Chat messages */}
      <ChatMessages messages={messages} />

      {/* Message Input */}
      <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
    </div>
  );
};

export default ChatApp;
