import React from "react";
import "./Chatbot.css";
import chatbotIcon from "../../assets/chatbot.webp"; // Ensure you have a chatbot icon image in this path

const Chatbot = ({
  toggleChatbot,
  sendMessage,
  abortResponse,
  messages,
  isTyping,
  isVisible,
}) => {
  return (
    <div>
      {/* Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <img src={chatbotIcon} alt="Chatbot Icon" />
      </div>

      {/* Chatbot Component */}
      <div id="chatbot" style={{ display: isVisible ? "flex" : "none" }}>
        <div id="chatbot-header">
          Chat with Lal!{" "}
          <span
            onClick={(e) => {
              e.stopPropagation(); // Prevent event propagation
              toggleChatbot(); // Close the chatbot
            }}
          >
            ×
          </span>
        </div>
        <div id="chatbot-body">
          <div id="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-message" : "bot-message"}
              >
                {/* Apply the color #FFAB5B to the "Lal:" text */}
                {msg.role === "bot" && (
                  <span style={{ color: "#FFAB5B" }}>Lal:</span>
                )}{" "}
                {msg.text.replace("Lal:", "")}
              </div>
            ))}
            {/* Update the typing indicator to style the "Lal:" text */}
            {isTyping && (
              <div className="typing-indicator">
                <span style={{ color: "#FFAB5B" }}>Lal:</span> is typing...
              </div>
            )}
          </div>
          <div className="input-container">
            <input
              id="chatbot-input"
              type="text"
              onKeyPress={(event) => sendMessage(event)}
              placeholder="Type your message..."
            />
            {/* Add the abort button */}
            <button id="abort-button" onClick={abortResponse}>
              ▬ {/* Unicode for the abort symbol */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
