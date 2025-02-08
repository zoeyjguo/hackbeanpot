import { GoogleGenerativeAI } from "@google/generative-ai";

// a button that calls the gemini api with the prompt "say a joke" and prints the response to teh dev console

export default function Gemini() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ 
        model: "gemini-pro", 
        generationConfig: {
            temperature: 2,
            topP: 0.8,
            topK: 50,
            maxOutputTokens: 200,
            responseMimeType: "text/plain",
        }
    });

    const handleClick = async () => {
        const prompt = "Say a joke";
        const result = await model.generateContent(prompt);
        const response = await result.response.text();
        console.log(response);
    };

    return (
        <button onClick={handleClick}>Generate a joke</button>
    );
}