import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Set model name
const MODEL_NAME = "gemini-2.0-flash";

// Access the API key from environment variables
const API_KEY = process.env.REACT_APP_API_KEY;

async function runChat(prompt) {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Please ensure it's set in the .env file."
    );
  }

  // Initialize the GoogleGenerativeAI instance with the API key
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Define generation configuration for the model
  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  // Define safety settings
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // Start chat with the model
  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  // Send the prompt message and get the result
  const result = await chat.sendMessage(prompt);
  const response = result.response;

  // Log and return the response
  console.log(response.text());
  return response.text();
}

export default runChat;
