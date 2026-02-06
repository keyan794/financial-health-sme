from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files['file']
    df = pd.read_csv(file)

    revenue = df['revenue'].sum()
    expenses = df['expenses'].sum()
    profit = revenue - expenses

    if profit > 0:
        health = "Good"
        risk = "Low"
    else:
        health = "Poor"
        risk = "High"

    insights = [
        "Revenue trend is stable",
        "Optimize operational expenses",
        "Ensure adequate working capital"
    ]

    return jsonify({
        "revenue": int(revenue),
        "expenses": int(expenses),
        "profit": int(profit),
        "financial_health": health,
        "risk_level": risk,
        "ai_insights": insights
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
