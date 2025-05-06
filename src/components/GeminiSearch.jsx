import React, { useState } from "react";
import { askGemini } from "../services/gemini";

const GeminiSearch = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse("");
    try {
      const result = await askGemini(input);
      setResponse(result);
    } catch (err) {
      setResponse("Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Gemini something..."
      />
      <button onClick={handleSearch}>Ask Gemini</button>
      {loading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  );
};

export default GeminiSearch;
