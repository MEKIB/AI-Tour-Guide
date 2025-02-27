import React, { useState, useRef } from 'react';
import Chatbot from './Chatbot';
import './Chatbot.css';

const apiKey = 'AIzaSyBNMBX8CrHQBfJ6ltXRXs8gxb3fqcYDLKc'; // Replace with your Google Gemini API key

// Predefined FAQ responses
const knowledgeBase = {
  "how do i book a hotel": "You can browse available hotels, select one, and confirm payment to complete your booking.",
  "what destinations can i explore": "You can explore various tourist attractions with VR/AR previews. Try searching for 'Popular places'.",
  "how do i get travel recommendations": "Our AI suggests locations based on your interests and travel history.",
  "can i see places in virtual reality": "Yes! Select a destination and choose 'VR Mode' to explore it in 3D.",
  "what is your name": "My name is Luma! I'm your AI assistant for the AI-based Touring Guide System.",
};

const ChatbotLogic = () => {
  const [messages, setMessages] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const abortController = useRef(new AbortController()); // For aborting API requests

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    console.log('Toggle chatbot clicked');
    setIsVisible((prev) => !prev);
  };

  // Get FAQ response if available
  const getFAQResponse = (userMessage) => {
    return knowledgeBase[userMessage.toLowerCase()] || null;
  };

  // Disable input during AI response
  const disableInput = () => {
    document.getElementById('chatbot-input').disabled = true;
    document.getElementById('abort-button').style.display = 'block';
  };

  // Enable input after AI response
  const enableInput = () => {
    document.getElementById('chatbot-input').disabled = false;
    document.getElementById('abort-button').style.display = 'none';
  };

  // Abort the AI response
  const abortResponse = () => {
    abortController.current.abort(); // Abort the ongoing request
    enableInput(); // Re-enable the input field
    setIsTyping(false); // Hide typing indicator

    // Add "Response aborted" message
    setMessages((prev) => [
      ...prev,
      { role: 'bot', text: 'Luma: Response aborted.' },
    ]);
  };

  // Send user message and fetch AI response
  const sendMessage = async (event) => {
    if (event.key === 'Enter') {
      const input = document.getElementById('chatbot-input');
      const message = input.value.trim();
      if (!message) return;

      // Add user message to the state
      setMessages((prev) => [...prev, { role: 'user', text: message }]);
      input.value = '';

      // Show typing indicator and disable input
      setIsTyping(true);
      disableInput();

      // Check if message matches an FAQ response
      const faqResponse = getFAQResponse(message);
      if (faqResponse) {
        setTimeout(() => {
          setMessages((prev) => [...prev, { role: 'bot', text: `Luma: ${faqResponse}` }]);
          setIsTyping(false);
          enableInput();
        }, 1000);
        return;
      }

      // Send the message to the Gemini API
      try {
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`;

        const requestBody = {
          contents: [
            {
              role: "user",
              parts: [{ text: message }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 150,
          },
        };

        console.log('Sending request to Gemini API:', { url, requestBody }); // Debugging

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
          signal: abortController.current.signal, // Add abort signal
        });

        console.log('Received response from Gemini API:', response); // Debugging

        if (!response.ok) {
          const errorData = await response.json();
          console.error('API Error:', errorData); // Debugging
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response Data:', data); // Debugging

        if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          const botReply = data.candidates[0].content.parts[0].text;
          setMessages((prev) => [...prev, { role: 'bot', text: `Luma: ${botReply}` }]);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error("Error:", error); // Debugging
        if (error.name !== 'AbortError') {
          setMessages((prev) => [
            ...prev,
            { role: 'bot', text: `Luma: Sorry, there was an error processing your request. Please try again later.` },
          ]);
        }
      } finally {
        setIsTyping(false);
        enableInput();
        abortController.current = new AbortController(); // Reset abort controller
      }
    }
  };

  return (
    <Chatbot
      toggleChatbot={toggleChatbot}
      sendMessage={sendMessage}
      abortResponse={abortResponse}
      messages={messages}
      isTyping={isTyping}
      isVisible={isVisible} // Pass isVisible state
    />
  );
};

export default ChatbotLogic;