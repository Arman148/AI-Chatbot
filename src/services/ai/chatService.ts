import { OpenAIMessage } from "../../types/chat";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY; // from frontend .env

export const chatService = {
  async fetchResponse(messages: OpenAIMessage[]): Promise<string> {
    if (!API_KEY) {
      console.error(
        "API Key is missing. Make sure REACT_APP_OPENAI_API_KEY is set in .env"
      );
      throw new Error("API Key is missing! Check your .env file.");
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || "Failed to fetch response from AI"
        );
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error in chatService:", error);
      throw error;
    }
  },
};
