"use server"

import { v1 } from "@google-cloud/vision";
  
const {ImageAnnotatorClient} = v1;

const visionClient = new ImageAnnotatorClient();

export async function analyzeImage(base64Image: string) {
  const [result] = await visionClient.annotateImage({
    image: { content: base64Image },
    features: [
      { type: 'TEXT_DETECTION' },
      { type: 'IMAGE_PROPERTIES' },
      { type: 'OBJECT_LOCALIZATION' },
      { type: 'LABEL_DETECTION' },
    ],
  });

  return result;
}
