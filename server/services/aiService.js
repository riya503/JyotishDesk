const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class AIService {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Use supported model for this specific key
  }

  async generateConsultationSummary(notes) {
    if (!process.env.GEMINI_API_KEY) {
      return `[Fallback Summary] Astrological consultation logged. (Please set GEMINI_API_KEY to see AI summaries)`;
    }

    try {
      const prompt = `You are a professional Astrologer's AI assistant. 
Summarize the following consultation notes concisely and professionally in 2-3 sentences. 
Highlight the main concern, the suggested focus, and any key astrological or general observations.
Format as a clean paragraph without bold tags or asterisks.

Consultation Notes: "${notes}"`;

      const result = await this.model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error('Error generating consultation summary:', error);
      return `[System Summary] Consultation recorded successfully. (AI generation failed: ${error.message})`;
    }
  }

  async generateFollowupMessage(clientData, history) {
    if (!process.env.GEMINI_API_KEY) {
      return `Namaste ${clientData.name || 'Ji'}, checking in to see how you are doing. Please share your progress with the suggested remedies.`;
    }

    try {
      const historyText = history.map(h => `- ${h.category}: ${h.aiSummary || h.notes}`).join('\n');
      
      const prompt = `You are a professional, empathetic Astrologer composing a follow-up message for a client.
Client Name: ${clientData.name}
Main Problem Category: ${clientData.problemCategory}
Consultation History:
${historyText}

Draft a warm, professional, and respectful follow-up message (approx. 2-3 sentences). 
Start with "Namaste ${clientData.name.split(' ')[0]} Ji,". 
Ask about their progress and experiences regarding their previous concerns. 
Keep it concise and ready to send via WhatsApp or Email. Do not use placeholders like [Your Name].`;

      const result = await this.model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.error('Error generating follow-up message:', error);
      return `Namaste ${clientData.name.split(' ')[0]} Ji, checking in on your recent consultation regarding ${clientData.problemCategory}. Please let me know how you are progressing.`;
    }
  }

  async generateClientInsights(clientData) {
    if (!process.env.GEMINI_API_KEY) {
      return [
        `Review planetary alignments for ${clientData.name} (Problem: ${clientData.problemCategory}).`,
        `Client born on ${clientData.dob} at ${clientData.tob} in ${clientData.pob}. Check Transit details.`,
        "Gemini API key missing. Displaying fallback insights."
      ];
    }

    try {
      const prompt = `You are an expert Astrological Analyst.
Given the following client demographic and concern, generate exactly 3 brief, actionable insights or recommendations for the astrologer to consider during the next consultation.

Client Profile:
Name: ${clientData.name}
DOB: ${clientData.dob}
Time of Birth: ${clientData.tob}
Place of Birth: ${clientData.pob}
Primary Concern: ${clientData.problemCategory}

Provide the output as exactly 3 bullet points, without the bullet character (just the text on separate lines).`;

      const result = await this.model.generateContent(prompt);
      const text = result.response.text().trim();
      const lines = text.split('\n').map(line => line.replace(/^[\-\*\d\.]\s*/, '').trim()).filter(line => line.length > 0);
      
      return lines.slice(0, 3);
    } catch (error) {
      console.error('Error generating client insights:', error);
      return [
        `Focus on the ${clientData.problemCategory} concerns raised by ${clientData.name}.`,
        "Review D-1 and D-9 charts before the next session.",
        "AI Insights temporarily unavailable."
      ];
    }
  }

  async generateDashboardInsights(metrics) {
    if (!process.env.GEMINI_API_KEY) {
      return [
        { 
          id: "i1", 
          title: "Dashboard Overview", 
          description: `You have ${metrics.totalConsultations} consultations across ${metrics.totalClients} clients.`, 
          type: "trend" 
        },
        { 
          id: "i2", 
          title: "Follow-up Status", 
          description: `There are ${metrics.pendingFollowups} pending outreach alerts requiring attention.`, 
          type: "action" 
        }
      ];
    }

    try {
      const topCategory = metrics.categoryStats[0] ? metrics.categoryStats[0].name : 'N/A';
      
      const prompt = `You are a CRM AI Assistant for an Astrologer. 
Based on the following CRM metrics, generate exactly 3 business or actionable insights to show on the dashboard.

Metrics:
- Total Clients: ${metrics.totalClients}
- Total Consultations: ${metrics.totalConsultations}
- Pending Follow-ups: ${metrics.pendingFollowups}
- Today's Follow-ups: ${metrics.todaysFollowups}
- Most Common Problem Category: ${topCategory}

Return a valid JSON array of objects. Each object must have:
- "id": a unique string (e.g., "ai-insight-1")
- "title": A short 3-4 word title.
- "description": A 1-2 sentence detailed insight or recommendation based on the metrics.
- "type": either "trend" or "action" (use "action" for follow-ups or alerts, "trend" for general observations)

Ensure the output is ONLY valid JSON, without any markdown formatting like \`\`\`json.`;

      const result = await this.model.generateContent(prompt);
      let text = result.response.text().trim();
      
      // Cleanup markdown if present
      if (text.startsWith('```json')) text = text.replace('```json', '');
      if (text.startsWith('```')) text = text.replace('```', '');
      if (text.endsWith('```')) text = text.replace('```', '');
      
      return JSON.parse(text);
    } catch (error) {
      console.error('Error generating dashboard insights:', error);
      return [
        { 
          id: "e1", 
          title: "AI Analysis Failed", 
          description: "Unable to generate insights at this moment.", 
          type: "action" 
        }
      ];
    }
  }
}

module.exports = new AIService();
