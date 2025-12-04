// ChatbotWidget.jsx
import React, { useState, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { sendMessageToBot } from "../../../services/chatService";
import styles from "./ChatbotWidget.module.css";

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const toggleChat = () => setOpen(!open);

  // Auto-load personalized recommendations on component mount
  useEffect(() => {
    if (open && messages.length === 0) {
      fetchRecommendations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await sendMessageToBot("recommendation"); // Trigger backend to send recommendations
      const botMsg = {
        role: "bot",
        content: response.reply,
        products: response.products || []
      };
      setMessages([botMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages([{
        role: "bot",
        content: "An error occurred while fetching recommendations."
      }]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToBot(input);
      const botMsg = {
        role: "bot",
        content: response.reply,
        products: response.products || []
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(prev => [...prev, { role: "bot", content: "An error occurred while contacting the server." }]);
    } finally {
      setLoading(false);
    }
  };

  const renderBotMessage = (msg) => {
    if (!msg.products || msg.products.length === 0) {
      return <span>{msg.content}</span>;
    }

    const displayedProducts = showAll ? msg.products : msg.products.slice(0, 3);

    return (
      <div>
        <div style={{ marginBottom: '10px' }}>{msg.content}</div>

        {displayedProducts.map(product => (
          <div key={product.id} className={styles.productPreview}>
            <div 
              className={styles.productTitle} 
              style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.title}
            </div>
            <div className={styles.productMeta}>
              Seller: {product.seller.name} | University: {product.university} | Faculty: {product.faculty} | Price: ${product.price} | Condition: {product.condition}
            </div>
          </div>
        ))}

        {msg.products.length > 3 && (
          <button
            className={styles.seeMoreBtn}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show Less" : `See ${msg.products.length - 3} more`}
          </button>
        )}
      </div>
    );
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
            AI Product Assistant
            <FaTimes style={{ cursor: "pointer" }} onClick={toggleChat} />
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.role === "user" ? styles.user : styles.bot}`}
              >
                {msg.role === "bot" ? renderBotMessage(msg) : msg.content}
              </div>
            ))}

            {loading && (
              <div className={`${styles.message} ${styles.bot}`}>
                🔍 Loading...
              </div>
            )}
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Ask about calculators, rulers, etc..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={loading}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
