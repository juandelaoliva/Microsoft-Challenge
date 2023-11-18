import React, { useState } from "react";
import AzureImageAnalysis from "./AzureImageAnalysis";
import GenerateImage from "./GenerateImage"; // Import the GenerateImage component

function App() {
  const [inputValue, setInputValue] = useState("");
  const [analyze, setAnalyze] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(""); // New state for image generation

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setAnalyze(false);
    setImagePrompt(""); // Reset image generation when input changes
  };

  const handleAnalyzeClick = () => {
    console.log("Analyzing image with URL:", inputValue);
    setAnalyze(true);
  };

  const handleGenerateClick = () => {
    setImagePrompt(inputValue); // Use the inputValue as the prompt for image generation
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Vision</h1>
        <h3>Challenge project - Create a React application with image analysis and generation capabilities with AI</h3>
        <h3>by Juan de la Oliva</h3>
      </header>
      <main>
        <div>
        <div>Insert URL or type prompt:</div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter URL or type prompt"
        />
        <button onClick={handleAnalyzeClick}>Analyze</button>
        <button onClick={handleGenerateClick}>Generate</button> {/* New button for image generation */}
        {/* Display the image with inline styling for max-width */}
        </div>
        <div className="results">
        {analyze && (
          <img 
            src={inputValue} 
            alt="To be analyzed" 
            style={{ maxWidth: '300px', height: 'auto' }}
          />
        )}
        {/* Render the AzureImageAnalysis component */}
        {analyze && <AzureImageAnalysis imageUrl={inputValue} />}
        {/* Render the GenerateImage component */}
        <GenerateImage prompt={imagePrompt} />
        </div>
      </main>
    </div>
  );
}

export default App;
