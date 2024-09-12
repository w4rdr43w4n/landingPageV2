"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeImage(base64Image: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze this website image and provide a detailed description including:
1. Overall layout and structure
2. Main sections (header, navigation, content areas, footer, etc.)
3. Colors for each section separately and the used fonts
4. Any prominent features or elements
5. Navigation tabs and Header color
6. Buttons colors
7. A description for included images, thier position,and content in detail.
8. Any Noticable Animation like (hover effects) and graphical designs

Differintiate between Colored Background element,elements with transparent backgrounds and those with an image background.

Provide a very Detailed description for each section and component
Make sure all the colors you detect are correct and in hex values.
Try To include every single text you found.
Make sure There are no missing components or elements.
Add a description for each item in its container ,like header tabs positions and alignment
Be as specific as possible about the layout and design elements.
`;
  try {
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/png" || "image/jpeg"
        },
      },
      
    ]);

    const response = result.response;
    const analysis = response.text();
    console.log(analysis)
    return  {analysis:analysis.replaceAll('*',"")} ;
  } catch (error:any) {
    console.error('Error analyzing image:', error);
    return error.message
  }
}