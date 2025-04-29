// src/context/Context.js
import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 10 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setInput("");
    setResultData("");
  };

  const onSent = async (prompt) => {
    const currentPrompt = prompt !== undefined ? prompt : input;

    if (!currentPrompt.trim()) return; // prevent empty prompt

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(currentPrompt);

    setPrevPrompts((prev) => {
      // ✅ Do not add if already exists
      if (!prev.includes(currentPrompt)) {
        return [...prev, currentPrompt];
      }
      return prev;
    });

    try {
      const response = await runChat(currentPrompt);

      let responseArray = response.split("**");
      let formattedResponse = "";

      for (let i = 0; i < responseArray.length; i++) {
        formattedResponse +=
          i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
      }

      formattedResponse = formattedResponse.split("*").join("</br>");
      const finalResponseArray = formattedResponse.split(" ");

      for (let i = 0; i < finalResponseArray.length; i++) {
        const nextWord = finalResponseArray[i];
        delayPara(i, nextWord + " ");
      }
    } catch (error) {
      console.error("Error while running chat:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
