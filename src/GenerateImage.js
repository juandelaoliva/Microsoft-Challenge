import React, { useState, useEffect } from "react";

const GenerateImage = ({ prompt }) => {
 const [generatedImage, setGeneratedImage] = useState(null);
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 // Function to call your server-side endpoint
 function generateImageFromPrompt(prompt) {
  return fetch("https://api.openai.com/v1/images/generations", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer { OPENAI_API_KEY }",
   },
   body: JSON.stringify({
    model: "dall-e-2",
    prompt: prompt,
    n: 1,
    size: "1024x1024",
   }),
  })
   .then((response) => {
    if (!response.ok) {
     throw new Error("Network response was not ok");
    }
    return response.json();
   })
   .then((data) => {
    // Extract the image URL from the first image object in the list
    if (data && data.data && data.data.length > 0) {
     return data.data[0].url; // This is where you get the URL of the generated image
    }
    throw new Error("No images returned from the API");
   })
   .catch((error) => {
    console.error("Error generating image:", error);
    throw error;
   });
 }

 useEffect(() => {
  if (!prompt) return;

  setLoading(true);
  generateImageFromPrompt(prompt)
   .then((image) => {
    setGeneratedImage(image);
    setLoading(false);
   })
   .catch((err) => {
    setError(err);
    setLoading(false);
   });
 }, [prompt]);

 if (loading) {
  return <div>Generating image...</div>;
 }

 if (error) {
  return <div>Error: {error.message}</div>;
 }

 return generatedImage ? (
  <img src={generatedImage} alt={`Generated image for ${prompt}`} style={{ maxWidth: "300px" }} />
 ) : null;
};

export default GenerateImage;
