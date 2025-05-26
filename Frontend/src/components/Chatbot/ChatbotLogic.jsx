import React, { useState, useRef } from "react";
import axios from "axios";
import Chatbot from "./Chatbot";
import "./Chatbot.css";

const ChatbotLogic = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Lal: Hello! I’m your Amhara tourism assistant. Ask me about destinations, hotels, or travel planning in the Amhara region of Ethiopia.",
    },
  ]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessageTime, setLastMessageTime] = useState(null);
  const abortController = useRef(new AbortController());

  const toggleChatbot = () => setIsVisible((prev) => !prev);

  const sendMessage = async (event) => {
    if (event.key !== "Enter") return;

    const now = Date.now();
    if (lastMessageTime && now - lastMessageTime < 1000) return; // Rate limiting: 1 second between messages
    setLastMessageTime(now);

    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();

    if (!message) return;
    if (message.length < 2) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Lal: Please ask a complete question about Amhara tourism.",
        },
      ]);
      return;
    }

    // Add user message and a placeholder for the bot's response
    setMessages((prev) => [
      ...prev,
      { role: "user", text: message },
      { role: "bot", text: "Lal: ..." },
    ]);
    input.value = "";
    setIsTyping(true);

    try {
      console.log("Sending message to backend:", message);

      const response = await axios.post("http://localhost:2000/chat", {
        message,
      });

      console.log("Backend Response Data:", response.data);

      if (response.data.reply) {
        let botReply = response.data.reply;

        // Ensure the response is prefixed with "Luma:"
        if (!botReply.startsWith("Lal:")) {
          botReply = `Lal: ${botReply}`;
        }

        // Replace the placeholder with the actual reply
        setMessages((prev) => [
          ...prev.slice(0, -1), // Remove the placeholder
          { role: "bot", text: botReply },
        ]);
      } else {
        throw new Error("Invalid response format from backend");
      }
    } catch (error) {
      console.error("Chatbot Error:", error.message);
      // Replace the placeholder with an error message
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove the placeholder
        {
          role: "bot",
          text: `Lal: I’m having trouble connecting to our services. Error: ${error.message}. Please try again later.`,
        },
      ]);
    } finally {
      setIsTyping(false);
      abortController.current = new AbortController();
    }
  };

  return (
    <Chatbot
      toggleChatbot={toggleChatbot}
      sendMessage={sendMessage}
      abortResponse={() => abortController.current.abort()}
      messages={messages}
      isTyping={isTyping}
      isVisible={isVisible}
    />
  );
};

export default ChatbotLogic;
