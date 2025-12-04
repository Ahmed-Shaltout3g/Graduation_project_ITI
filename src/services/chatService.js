import axiosInstance from "./api.js"; // Your authenticated axios instance

const CHAT_API_URL = "chats/";
const MESSAGE_API_URL = "messages/";
const BOT_API_URL = "chatbot/";

// Bot chat (existing)
export const sendMessageToBot = async (message) => {
    try {
        const response = await axiosInstance.post(BOT_API_URL, { message });
        return response.data;
    } catch (err) {
        console.error("Error sending message:", err);
        throw err;
    }
};

// User chat functionality
// User chat functionality
export const userChatService = {
    // Start chat for a product
    startChat: async (productId) => {
        try {
            console.log("Starting chat for product:", productId);
            const response = await axiosInstance.post(`${CHAT_API_URL}start_chat/`, {
                product_id: productId
            });
            console.log("Product chat started, response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error starting product chat:", error);
            throw error;
        }
    },

    // Start direct chat with a user
    startDirectChat: async (userId) => {
        try {
            console.log("Starting direct chat with user:", userId);
            const response = await axiosInstance.post(`${CHAT_API_URL}start_chat/`, {
                user_id: userId
            });
            console.log("Direct chat started, response:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error starting direct chat:", error);
            throw error;
        }
    },

    // Get user's chats
    getChats: async () => {
        try {
            const response = await axiosInstance.get(CHAT_API_URL);
            return response.data;
        } catch (error) {
            console.error("Error fetching chats:", error);
            return [];
        }
    },

    // Get messages for a chat - now server-side filtering
    getMessages: async (chatId) => {
        try {
            const response = await axiosInstance.get(MESSAGE_API_URL, { 
                params: { chat: chatId }  // Server-side filtering
            });
            return Array.isArray(response.data) ? response.data : response.data.results || [];
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    },

    // Send message - this is correct
    sendMessage: async (chatId, text) => {
        try {
            const response = await axiosInstance.post(MESSAGE_API_URL, { 
                chat: chatId, 
                text 
            });
            return response.data;
        } catch (error) {
            console.error("Error sending message:", error);
            throw error;
        }
    },
};
