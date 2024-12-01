import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Import your desired fonts
import "@fontsource/vazir"; // Persian/Pashto/Arabic Font (Vazir)
import "@fontsource/orbitron"; // English Font (Orbitron)

export default function MessengerClone() {
  // Google Generative AI setup
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "Noor Bot",
      content: "Hi, I'm Noor Bot. How can I assist you today?",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [loading, setLoading] = useState(false); // Indicates AI is "thinking"

  // Function to format chat history
  const formatChatHistory = () => {
    return messages.map((msg) => `${msg.sender}: ${msg.content}`).join("\n");
  };

  // Function to format messages (e.g., handle bold and newlines)
  const formatMessage = (content) => {
    // Handle **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = content.split("\n").map((line, index) => {
      const formattedLine = line.split(boldRegex).map((part, idx) => {
        if (boldRegex.test(`**${part}**`)) {
          return (
            <Typography component="span" key={idx} sx={{ fontWeight: "bold" }}>
              {part}
            </Typography>
          );
        }
        return part;
      });

      return (
        <Typography
          key={index}
          sx={{
            display: "block",
            wordBreak: "break-word",
            fontFamily: content.match(/[\u0600-\u06FF\u0750-\u077F]/)
              ? "'Vazir', sans-serif" // If the content contains Arabic/Pashto/Persian, use Vazir
              : "'Orbitron', sans-serif", // Otherwise, use Orbitron for English
          }}
        >
          {formattedLine}
        </Typography>
      );
    });

    return parts;
  };

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: "You",
        content: message,
        time: new Date().toLocaleTimeString(),
      };

      // Append user's message to the chat
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Clear input field
      setMessage("");
      setLoading(true);

      const conversationHistory = formatChatHistory() + `\nYou: ${message}`;

      try {
        const result = await model.generateContent(conversationHistory);
        const aiResponse = await result.response.text();

        const aiMessage = {
          sender: "Noor Bot",
          content: aiResponse,
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching AI response:", error);
        const errorMessage = {
          sender: "Noor Bot",
          content: "Sorry, something went wrong. Please try again.",
          time: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="80vh"
      maxWidth="800px"
      mx="auto"
      bgcolor="#0d0d0d"
      color="#e0e0e0"
      p={2}
      borderRadius={4}
      boxShadow="0 0 10px 2px rgba(0, 255, 255, 0.5)"
    >
      {/* Chat Messages */}
      <Box
        flex={1}
        p={2}
        overflow="auto"
        sx={{
          background: "linear-gradient(to bottom, #0d0d0d, #1a1a1a)",
          border: "1px solid #444",
          borderRadius: "8px",
          boxShadow: "inset 0 0 10px rgba(0, 255, 255, 0.5)",
          color: "#f0f0f0",
          height: "75vh", // Fix height to limit box size
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent={msg.sender === "You" ? "flex-end" : "flex-start"}
            mb={2}
          >
            <Box
              maxWidth="70%"
              p={2}
              borderRadius={3}
              sx={{
                background: msg.sender === "You" ? "#6200ea" : "#222",
                color: msg.sender === "You" ? "#fff" : "#e0e0e0",
                boxShadow:
                  msg.sender === "You"
                    ? "0 0 10px rgba(98, 0, 234, 0.8)"
                    : "0 0 10px rgba(224, 224, 224, 0.1)",
              }}
            >
              {formatMessage(msg.content)}
              <Typography variant="caption" color="rgba(255, 255, 255, 0.6)">
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Loading indicator when AI is thinking */}
        {loading && (
          <Box display="flex" justifyContent="flex-start" mb={2}>
            <Typography sx={{ color: "#0ff" }}>
              Noor Bot is thinking...
            </Typography>
            <CircularProgress size={20} sx={{ ml: 2, color: "#0ff" }} />
          </Box>
        )}
      </Box>

      {/* Message Input */}
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          variant="outlined"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          fullWidth
          sx={{
            bgcolor: "#121212",
            borderRadius: "12px",
            input: {
              color: "#fff",
              fontFamily: message.match(/[\u0600-\u06FF\u0750-\u077F]/)
                ? "'Vazir', sans-serif"
                : "'Orbitron', sans-serif",
            },
            "& fieldset": { borderColor: "#333" },
            marginBottom: 1,
          }}
        />
        <IconButton onClick={handleSendMessage} sx={{ ml: 2, color: "#0ff" }}>
          <Send />
        </IconButton>
      </Box>
    </Box>
  );
}
