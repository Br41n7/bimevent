
import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanningResult, CustomizationOptions } from "../types";

// Fix: Strictly follow initialization rules by using process.env.API_KEY directly as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateEventPlan = async (
  eventType: string,
  guestCount: string,
  vibe: string,
  customization?: CustomizationOptions
): Promise<AIPlanningResult | null> => {
  try {
    let prompt = `Plan a unique ${eventType} for ${guestCount} guests with a ${vibe} vibe.`;
    
    if (customization) {
      prompt += ` Specifically follow a ${customization.theme} theme style, an ${customization.layout} layout arrangement, and a ${customization.colorPalette} color palette.`;
    }
    
    prompt += ` Include a title, theme description (incorporating the requested theme), a detailed checklist of 6-8 items, and a concise summary.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            theme: { type: Type.STRING },
            checklist: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            summary: { type: Type.STRING },
            estimatedVibe: { type: Type.STRING }
          },
          required: ["title", "theme", "checklist", "summary", "estimatedVibe"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim()) as AIPlanningResult;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
