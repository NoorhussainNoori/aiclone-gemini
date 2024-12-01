import React, { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Box, Button, Container, Grid, Typography } from "@mui/material";

const Chatbox = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "Bot",
      content: "Hello, I am Bot, How can I assist you today?",
      time: new Date().toLocaleDateString(),
    },
  ]);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const formatChatHistory = () => {
    return messages.map((msg) => `${msg.sender}: ${msg.content}`).join("\n");
  };
  const generateText = async () => {
    if (input.trim()) {
      const newMessage = {
        sender: "You",
        content: input,
        time: new Date().toLocaleDateString(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput("");
      setLoading(true);

      const conversationHistory = formatChatHistory() + `\nYou: ${input}`;

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
        console.error("Error generating text:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "Bot",
            content: "Error: Could not generate a response.",
            time: new Date().toLocaleDateString(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              height="60vh"
              maxWidth="800px"
              mx="auto"
              bgcolor="#0d0d0d"
              color="#e0e0e0"
              mb={3}
              p={2}
              borderRadius={4}
              boxShadow="0 0 10px 2px rgba(0, 255, 255, 0.5)"
            >
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
                {messages.map((msg, index) => {
                  return (
                    <Box
                      key={index}
                      display="flex"
                      justifyContent={
                        msg.sender === "You" ? "flex-end" : "flex-start"
                      }
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
                        <Box>{msg.content}</Box>
                        <Typography
                          variant="caption"
                          color="rgba(255, 255, 255, 0.6)"
                        >
                          {msg.time}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Box
            component={"textarea"}
            variant="outlined"
            placeholder="Type a message..."
            value={input}
            color={"white"}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && generateText()}
            fullWidth
            sx={{
              bgcolor: "#121212",
              borderRadius: "12px",
              padding: 2,
              input: {
                color: "#fff",
                fontFamily: input.match(/[\u0600-\u06FF\u0750-\u077F]/)
                  ? "'Vazir', sans-serif"
                  : "'Orbitron', sans-serif",
              },
              "& fieldset": { borderColor: "#333" },
              marginBottom: 1,
            }}
          />
        </Grid>
        <Grid itemxl={12} lg={12} md={12} sm={12} xs={12}>
          <Button variant="contained" onClick={generateText} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chatbox;
