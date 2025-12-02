import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAIExplanation = async (questionText: string, correctAnswer: string, existingExplanation?: string, pdfContent?: string): Promise<string> => {
  if (!API_KEY) {
    return "AI-powered explanations are currently unavailable. Please check the API key configuration.";
  }
  try {

    const pdfInstruction = pdfContent 
      ? `
      **Additional Context from PDF:**
      Use the following information extracted from a supplementary PDF to enhance your explanation. This may contain details about specific diagrams or methods that are crucial for the solution.
      ---
      ${pdfContent}
      ---
      `
      : "";

    const prompt = `
      You are an expert Msomesa AI Tutor, specializing in the Ugandan national examinations curriculum (PLE, UCE, and UACE). Your tone should be encouraging, clear, and conversational, like a friendly teacher guiding a student.

      A student has asked for an explanation for the following question.

      **Question:** "${questionText}"
      **Correct Answer:** "${correctAnswer}"

      Here is the existing, correct explanation which you should use as a foundation for your response:
      **Reference Explanation:**
      ---
      ${existingExplanation || 'No reference explanation provided.'}
      ---

      Your task is to enhance this explanation. Do not just repeat it. Instead, act as a tutor and walk the student through the solution step-by-step, making it even easier to understand.

      **Key Instructions:**
      1.  **Tutor Persona:** Start with a friendly opening (e.g., "Great question! Let's break this down together."). Explain the core concept behind the question before diving into the steps.
      2.  **Elaborate on Steps:** Use the reference explanation as a guide, but break down each step further. Explain *why* each step is taken. For example, if the reference says "borrow from the tens column," you should explain what borrowing means in this context.
      3.  **Conversational Tone:** Use phrases like "First, we need to...", "The next logical step is...", "See how that works?", "The key thing to remember here is...".
      4.  **Ugandan Context:** Tailor your language and examples to the Ugandan curriculum where appropriate.
      5.  **Formatting Guidelines:** Structure your answer for maximum clarity. Use simple Markdown:
          - Use clear headings for main topics (e.g., '### Breaking Down the Problem').
          - Use bullet points (* item) for lists or sequences of smaller actions.
          - Use bold text (**text**) to highlight key terms, numbers, formulas, or final results.
          - Ensure each major step is on a new line to create a clear, step-by-step flow.
      6.  **Encouragement:** End with a positive and encouraging closing statement to build the student's confidence (e.g., "You're doing great. Keep practicing!").
      
      ${pdfInstruction}

      **Your Enhanced, Step-by-Step Tutoring:**
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching AI explanation:", error);
    return "Sorry, we couldn't generate an explanation at this time. Please try again later.";
  }
};

export const generateImageFromDescription = async (prompt: string): Promise<string> => {
    if (!API_KEY) {
        throw new Error("API key not configured.");
    }
    try {
        const fullPrompt = `Create a simple, clear, black and white educational diagram for a Ugandan student based on this description: ${prompt}. The style should be like a textbook illustration.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [{ text: fullPrompt }],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString: string = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
};

export const getIncorrectAnswerFeedback = async (questionText: string, correctAnswer: string, userAnswer: string, existingExplanation?: string): Promise<string> => {
  if (!API_KEY) {
    return "AI feedback is currently unavailable.";
  }
  try {
    const prompt = `
      You are a friendly and encouraging Msomesa AI Tutor for young Ugandan students.
      A student was asked the following question:
      **Question:** "${questionText}"
      
      The correct answer is **"${correctAnswer}"**.
      The student answered **"${userAnswer}"**.

      The correct method to solve this is:
      **Correct Method Reference:**
      ---
      ${existingExplanation || 'The goal is to find the correct answer by following the appropriate steps.'}
      ---

      Your goal is to provide helpful feedback. Please focus on **why the student's answer is incorrect** and gently guide them to the right path.

      **Key Instructions:**
      1.  **Acknowledge Positively:** Start by acknowledging the student's effort (e.g., "That's a good try! It looks like you're on the right track.").
      2.  **Identify the Misconception:** Based on their incorrect answer, try to figure out the likely mistake (e.g., calculation error, wrong formula) and explain it simply.
      3.  **Guide, Don't Just Tell:** Briefly refer to the correct method (using the reference) to show them the right way to think about it. For example, "It seems you might have forgotten to carry over the 1. Let's look at the first step again..." or "Remember, when we divide fractions, we need to flip the second fraction before multiplying."
      4.  **Keep it Concise and Encouraging:** End with a positive note like "You're very close! Give it another try."
    `;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error fetching incorrect answer feedback:", error);
    return "Sorry, we couldn't generate feedback for your answer at this time.";
  }
};

export const checkAnswerWithAI = async (questionText: string, correctAnswer: string, userAnswer: string, explanation: string): Promise<{ isCorrect: boolean; feedback: string; }> => {
    if (!API_KEY) {
        // Fallback for when API key is not available
        const isStrictlyCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        return { 
            isCorrect: isStrictlyCorrect, 
            feedback: isStrictlyCorrect ? "Correct." : "Your answer doesn't exactly match the expected answer." 
        };
    }

    try {
        const prompt = `
            You are a strict but fair auto-marker for the Ugandan national examinations.
            Your task is to evaluate a student's answer against the official correct answer.

            **Context:**
            - **Question:** "${questionText}"
            - **Official Correct Answer:** "${correctAnswer}"
            - **Additional Explanation/Accepted variations:** "${explanation}"
            - **Student's Answer to Evaluate:** "${userAnswer}"

            **Instructions:**
            1.  **Semantic Check:** Determine if the student's answer is semantically and factually correct, even if phrased differently.
            2.  **Numerical Tolerance:** For numerical answers, ignore units (e.g., 'km', 'Shs') and formatting differences like commas. Focus on the core number. '8.94 km' and '8.94' are both correct if the number matches.
            3.  **Mathematical Equivalence:** Accept answers that are mathematically equivalent (e.g., '7/3' is the same as '2 1/3').
            4.  **Conciseness:** A student's answer might be a short phrase instead of a full sentence (e.g., "by coiling" instead of "It coils its body"). This is acceptable if it contains the core correct concept.
            5.  **Spelling:** Ignore minor spelling mistakes.
            6.  **Context is Key:** Use the "Additional Explanation" to understand the range of acceptable answers.
            7.  **Output Format:** You must return ONLY a JSON object.

            **Evaluation Examples:**
            - Correct Answer: "It coils its body.", Student Answer: "by coiling" -> Correct.
            - Correct Answer: "8.94 km", Student Answer: "8.94" -> Correct.
            - Correct Answer: "Shs 622,500", Student Answer: "622500" -> Correct.
            - If the student's answer is factually wrong or misses the key point, mark it as incorrect.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        isCorrect: {
                            type: Type.BOOLEAN,
                            description: "Whether the student's answer is semantically or numerically correct."
                        },
                        feedback: {
                            type: Type.STRING,
                            description: "A very brief, one-sentence explanation for your decision. For example, 'Correct, you identified the main action.' or 'Incorrect, the main defense mechanism is coiling, not running.'"
                        }
                    },
                    required: ["isCorrect", "feedback"]
                },
            },
        });
        
        const jsonStr = response.text.trim();
        const result = JSON.parse(jsonStr);
        return result;

    } catch (error) {
        console.error("Error validating answer with AI:", error);
        // Fallback to strict check if AI fails
        const isStrictlyCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        return { 
            isCorrect: isStrictlyCorrect, 
            feedback: "Could not use AI to check the answer. Used a strict comparison instead." 
        };
    }
};