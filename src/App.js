import React, { useState } from "react";
import AzureImageAnalysis from "./AzureImageAnalysis";
// import './App.css'; // Make sure to create this CSS file for styling

function App() {
  const [inputValue, setInputValue] = useState("");
  const [analyze, setAnalyze] = useState(false); // New state to trigger analysis

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setAnalyze(false); // Reset analyze state when input changes
  };

  const handleAnalyzeClick = () => {
    console.log("Analyzing image with URL:", inputValue);
    setAnalyze(true); // Set analyze state to true to render the analysis component
  };

  // Removed the generateImage function, as it's not used in this snippet

  return (
    <div className="App">
      <header className="App-header">
        <h1>Computer Vision</h1>
      </header>
      <main>
        <div>Insert URL or type prompt:</div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter URL or type prompt"
        />
        <button onClick={handleAnalyzeClick}>Analyze</button>
        {/* Removed the generate button for simplicity */}
      </main>
      {/* Conditionally render the AzureImageAnalysis component */}
      {analyze && <AzureImageAnalysis imageUrl={inputValue} />}
    </div>
  );
}

export default App;
