import { HfInference } from '@huggingface/inference';

const HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

export const hf = new HfInference(HF_TOKEN);

export const analyzeSentiment = async (text: string) => {
  try {
    const result = await hf.textClassification({
      model: 'nlptown/bert-base-multilingual-uncased-sentiment',
      inputs: text,
    });
    return result;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};

export const detectFraud = async (text: string) => {
  try {
    const result = await hf.textClassification({
      model: 'microsoft/mdeberta-v3-base',
      inputs: text,
    });
    return result;
  } catch (error) {
    console.error('Error detecting fraud:', error);
    throw error;
  }
};

export const analyzeDocument = async (text: string) => {
  try {
    const result = await hf.textClassification({
      model: 'facebook/bart-large-mnli',
      inputs: text,
    });
    return result;
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
};