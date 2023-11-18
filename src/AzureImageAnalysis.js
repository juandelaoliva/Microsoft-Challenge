import React, { useState, useEffect } from "react";

const AzureImageAnalysis = ({ imageUrl }) => {
 const [analysisResult, setAnalysisResult] = useState(null);
 const [error, setError] = useState(null);

 useEffect(() => {
  const apiKey = process.env.apiKey; 
  const endpoint = process.env.endpoint;

  const visualFeatures = [
   "tags",
   "read",
   "caption",
   "denseCaptions",
   "smartCrops",
   "objects",
   "people",
  ];

  const headers = {
   "Content-Type": "application/json",
   "Ocp-Apim-Subscription-Key": apiKey,
  };

  const requestBody = {
   url: imageUrl,
  };

  const requestUrl = `${endpoint}computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview&features=${visualFeatures.join(
   ","
  )}`;

  fetch(requestUrl, {
   method: "POST",
   body: JSON.stringify(requestBody),
   headers: headers,
   features: visualFeatures.join(","),
  })
   .then((response) => response.json())
   .then((data) => {
    setAnalysisResult(data);
   })
   .catch((err) => {
    setError(err);
   });
 }, [imageUrl]); // Only re-run the effect if imageUrl changes

 if (error) {
  return <div>Error: {error.message}</div>;
 }

 if (!analysisResult) {
  return <div>Loading...</div>;
 }

 return (
  <div>
   <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
  </div>
 );
};

export default AzureImageAnalysis;
