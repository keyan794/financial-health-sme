import React, { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const analyzeData = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>AI Financial Health Assessment for SMEs</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={analyzeData}>Analyze</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Dashboard</h2>
          <p><b>Total Revenue:</b> ₹{result.revenue}</p>
          <p><b>Total Expenses:</b> ₹{result.expenses}</p>
          <p><b>Profit:</b> ₹{result.profit}</p>
          <p><b>Financial Health:</b> {result.financial_health}</p>
          <p><b>Risk Level:</b> {result.risk_level}</p>

          <h3>AI Insights</h3>
          <ul>
            {result.ai_insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
