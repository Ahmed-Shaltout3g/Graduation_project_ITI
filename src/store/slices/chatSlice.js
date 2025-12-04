import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userChatService } from "../../services/chatService";

// Async Thunks
export const fetchChats = createAsyncThunk("chat/fetchChats", async (_, { rejectWithValue }) => {
  try {
    const response = await userChatService.getChats();
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || { detail: "Failed to fetch chats" });
  }
});

export const startChat = createAsyncThunk("chat/startChat", async (productId, { rejectWithValue }) => {
  try {
    const response = await userChatService.startChat(productId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || { detail: "Failed to start chat" });
  }
});

export const startDirectChat = createAsyncThunk("chat/startDirectChat", async (userId, { rejectWithValue }) => {
  try {
    const response = await userChatService.startDirectChat(userId);
    return response;
  } catch (error) {
    return rejectWithValue(error.response?.data || { detail: "Failed to start direct chat" });
  }
});

export const fetchMessages = createAsyncThunk("chat/fetchMessages", async (chatId, { rejectWithValue }) => {
  try {
    const response = await userChatService.getMessages(chatId);
    return { chatId, messages: response };
  } catch (error) {
    return rejectWithValue(error.response?.data || { detail: "Failed to fetch messages" });
  }
});

export const sendMessage = createAsyncThunk("chat/sendMessage", async ({ chatId, text }, { rejectWithValue }) => {
  try {
    const response = await userChatService.sendMessage(chatId, text);
    return { chatId, message: response };
  } catch (error) {
    return rejectWithValue(error.response?.data || { detail: "Failed to send message" });
  }
});

// Initial State
const initialState = {
  chats: [],
  currentChat: null,
  messages: {}, // Object with chatId as keys
  unreadMessages: 0,
  loading: false,
  error: null,
};

// Slice
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    clearChatError: (state) => {
      state.error = null;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Chats
      .addCase(fetchChats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure payload is an array
        state.chats = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Start Chat
      .addCase(startChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
        // Ensure chats is an array
        if (!Array.isArray(state.chats)) {
          state.chats = [];
        }
        // Add new chat to chats list if not already present
        const existingChat = state.chats.find(chat => chat.id === action.payload.id);
        if (!existingChat) {
          state.chats.push(action.payload);
        }
      })
      .addCase(startChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Start Direct Chat
      .addCase(startDirectChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(startDirectChat.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChat = action.payload;
        // Ensure chats is an array
        if (!Array.isArray(state.chats)) {
          state.chats = [];
        }
        // Add new chat to chats list if not already present
        const existingChat = state.chats.find(chat => chat.id === action.payload.id);
        if (!existingChat) {
          state.chats.push(action.payload);
        }
      })
      .addCase(startDirectChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { chatId, messages } = action.payload;
        state.messages[chatId] = messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send Message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const { chatId, message } = action.payload;
        if (!state.messages[chatId]) {
          state.messages[chatId] = [];
        }
        state.messages[chatId].push(message);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentChat, clearChatError, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
