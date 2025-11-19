// ChatbotWidget.jsx
import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { sendMessageToBot } from "../../../services/chatService";
import styles from "./ChatbotWidget.module.css";

const ChatbotWidget = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleChat = () => setOpen(!open);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, newMessage]);
        setInput("");
        setLoading(true);

        try {
            const reply = await sendMessageToBot([...messages, newMessage]);
            setMessages((prev) => [...prev, { role: "bot", content: reply }]);
        } catch (err) {
            setMessages((prev) => [...prev, { role: "bot", content: "An error occurred." }]);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    };

    return (
        <div className={styles.widgetWrapper}>
            {!open && (
                <button className={styles.chatButton} onClick={toggleChat}>
                    <FaRobot />
                </button>
            )}

            {open && (
                <div className={styles.chatBox}>
                    <div className={styles.chatHeader}>
                        Chatbot
                        <FaTimes style={{ cursor: "pointer" }} onClick={toggleChat} />
                    </div>

                    <div className={styles.chatMessages}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`${styles.message} ${msg.role === "user" ? styles.user : styles.bot}`}
                            >
                                {msg.content}
                            </div>
                        ))}
                        {loading && (
                            <div className={`${styles.message} ${styles.bot}`}>Typing...</div>
                        )}
                    </div>

                    <div className={styles.chatInput}>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatbotWidget;
