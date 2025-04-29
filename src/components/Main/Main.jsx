import { useContext, useState } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      onSent();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setTimeout(() => {
      onSent();
    }, 100);
  };

  return (
    <div className={`main ${darkMode ? "dark" : ""}`}>
      <div className="nav">
        <p>Gemini</p>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img src={assets.user_icon} alt="user" />
          <button className="dark-toggle" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,Viplove...</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div
                className="card"
                onClick={() =>
                  handleSuggestionClick(
                    "Suggest me some unique birthday gift ideas"
                  )
                }
              >
                <p>Suggest me some unique birthday gift ideas</p>
                <img src={assets.compass_icon} alt="compass" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleSuggestionClick(
                    "Explain quantum physics in simple words"
                  )
                }
              >
                <p>Explain quantum physics in simple words</p>
                <img src={assets.bulb_icon} alt="bulb" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleSuggestionClick("Give a 5-minute daily workout routine")
                }
              >
                <p>Give a 5-minute daily workout routine</p>
                <img src={assets.message_icon} alt="message" />
              </div>
              <div
                className="card"
                onClick={() =>
                  handleSuggestionClick(
                    "Generate an inspirational quote about success"
                  )
                }
              >
                <p>Generate an inspirational quote about success</p>
                <img src={assets.code_icon} alt="code" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="user" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="gemini" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="gallery" />
              <img src={assets.mic_icon} alt="mic" />
              {input && (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  alt="send"
                />
              )}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may give inaccurate or inappropriate information, including
            about people, so double-check responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
