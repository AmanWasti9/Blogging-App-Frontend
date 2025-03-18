import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { Send } from "lucide-react";
import { IoClose } from "react-icons/io5";
import UserContext from "../../Context/UserContext";
import { chatBot } from "../../Services/PostService";
import { toast } from "react-toastify";

export default function ChatBot() {
  const [isVisible, setIsVisible] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const userContextData = useContext(UserContext);
  const userId = userContextData.user.data?.id;

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    // Add user message to chat history
    const userMessage = {
      sender: "user",
      text: message,
      timestamp: new Date().toISOString(),
    };

    setChatHistory([...chatHistory, userMessage]);
    setMessage("");

    setIsLoading(true);

    try {
      // Call the chatBot API
      const response = await chatBot(userId, message);

      console.log(response);

      // Add bot response to chat history
      const botMessage = {
        sender: "bot",
        text: response.response,
        timestamp: new Date().toISOString(),
      };

      setChatHistory((prevHistory) => [...prevHistory, botMessage]);
    } catch (error) {
      toast.error("Failed to get response from chatbot");
      console.error("Chatbot error:", error);
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <Wrapper>
      {isVisible && (
        <>
          <div className="chat-btn" onClick={toggleChat}>
            <IoChatbubbleEllipsesOutline className="chat-btn--icon" />
          </div>

          {isChatOpen && (
            <div className="chat-container">
              <div className="chat-header">
                <h3>Chat Support</h3>
                <button className="close-btn" onClick={toggleChat}>
                  <IoClose />
                </button>
              </div>

              <div className="chat-messages">
                {chatHistory.length === 0 ? (
                  <div className="welcome-message">
                    <p>Hello! How can I help you today?</p>
                  </div>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`message ${
                        msg.sender === "user" ? "user-message" : "bot-message"
                      }`}
                    >
                      <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                      <small>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </small>
                    </div>
                  ))
                )}

                {isLoading && (
                  <div className="message bot-message loading">
                    <div className="loading-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
              </div>

              <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button
                  type="submit"
                  style={{
                    borderRadius: "20px",
                    marginLeft: "5px",
                  }}
                >
                  <Send style={{ height: "17px", width: "17px" }} />
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .chat-btn {
    font-size: 2.5rem;
    width: 3.5rem;
    height: 3.5rem;
    color: #F05454;
    background-color: white;
    border: 2px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    &--icon {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  .chat-container {
    position: fixed;
    bottom: 7rem;
    right: 3rem;
    width: 320px;
    height: 400px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 998;
  }

  .chat-header {
    padding: 15px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #333;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      cursor: pointer;
      color: #F05454;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      &:hover {
        color: #D03434;
      }
    }
  }

  .chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .welcome-message {
      text-align: center;
      margin: 20px 0;
      color: #6c757d;
      font-style: italic;
    }

    .message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 15px;
      position: relative;
      word-wrap: break-word;

      p {
        margin: 0 0 5px 0;
      }

      small {
        font-size: 0.7rem;
        opacity: 0.7;
        display: block;
        text-align: right;
      }
    }

    .user-message {
      align-self: flex-end;
      background-color: #F05454;
      color: white;
      border-bottom-right-radius: 5px;
    }

    .bot-message {
      align-self: flex-start;
      background-color: #f1f1f1;
      color: #333;
      border-bottom-left-radius: 5px;
    }

    .loading {
      padding: 15px;

      .loading-dots {
        display: flex;
        justify-content: center;
        gap: 5px;

        span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #6c757d;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;

          &:nth-of-type(1) {
            animation-delay: -0.32s;
          }

          &:nth-of-type(2) {
            animation-delay: -0.16s;
          }
        }

        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      }
    }
  }

  .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #e9ecef;

    input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid #ced4da;
      border-radius: 20px;
      outline: none;
      font-size: 0.9rem;

      &:focus {
        border-color: #F05454;
        box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.25);
      }
    }



      svg {
        font-size: 1.2rem;
      }
    }
  }
`;
