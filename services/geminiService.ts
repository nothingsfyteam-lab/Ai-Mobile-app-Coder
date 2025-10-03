import { GoogleGenAI, Type } from "@google/genai";
import { MOBILE_SYSTEM_INSTRUCTION, WEB_SYSTEM_INSTRUCTION } from '../constants';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const baseResponseSchema = {
    type: Type.OBJECT,
    properties: {
        code: { type: Type.STRING },
        message: {
            type: Type.STRING,
            description: "A short, friendly message for the user explaining the generated app."
        }
    },
    required: ["code", "message"],
};

const mobileResponseSchema = {
    ...baseResponseSchema,
    properties: {
        ...baseResponseSchema.properties,
        code: {
            ...baseResponseSchema.properties.code,
            description: "The complete React Native code for the App.js file."
        }
    }
};

const webResponseSchema = {
    ...baseResponseSchema,
    properties: {
        ...baseResponseSchema.properties,
        code: {
            ...baseResponseSchema.properties.code,
            description: "The complete, self-contained HTML code for the index.html file, including CSS and JavaScript."
        }
    }
};


export interface AppGenerationResult {
    code: string;
    message: string;
}

export async function generateAppCode(prompt: string, appType: 'mobile' | 'web'): Promise<AppGenerationResult> {
    const isMobile = appType === 'mobile';
    const systemInstruction = isMobile ? MOBILE_SYSTEM_INSTRUCTION : WEB_SYSTEM_INSTRUCTION;
    const responseSchema = isMobile ? mobileResponseSchema : webResponseSchema;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        
        const jsonString = response.text.trim();
        const parsed = JSON.parse(jsonString);

        if (parsed && typeof parsed.code === 'string' && typeof parsed.message === 'string') {
            return { code: parsed.code, message: parsed.message };
        } else {
            throw new Error("Invalid response format from Gemini API. Expected JSON with 'code' and 'message' properties.");
        }
    } catch (error) {
        console.error("Gemini API call failed:", error);
        throw new Error("Failed to generate code from AI. Please check the console for more details.");
    }
}