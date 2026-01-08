import axios from 'axios';

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

class TranslationService {
  private apiKey: string;
  private baseUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor() {
    this.apiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY || '';
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult> {
    if (!this.apiKey) {
      throw new Error('Google Translate API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          q: text,
          source: sourceLanguage || 'auto',
          target: targetLanguage,
          format: 'text'
        }
      );

      const translation = response.data.data.translations[0];
      return {
        translatedText: translation.translatedText,
        sourceLanguage: translation.detectedSourceLanguage || sourceLanguage || 'auto',
        targetLanguage
      };
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }

  async translateMultipleTexts(texts: string[], targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult[]> {
    if (!this.apiKey) {
      throw new Error('Google Translate API key not configured');
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          q: texts,
          source: sourceLanguage || 'auto',
          target: targetLanguage,
          format: 'text'
        }
      );

      return response.data.data.translations.map((translation: any) => ({
        translatedText: translation.translatedText,
        sourceLanguage: translation.detectedSourceLanguage || sourceLanguage || 'auto',
        targetLanguage
      }));
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate texts');
    }
  }

  async translateObject(obj: any, targetLanguage: string, sourceLanguage?: string): Promise<any> {
    const textsToTranslate: string[] = [];
    const textPaths: string[] = [];

    // Extract all translatable strings from object
    const extractTexts = (current: any, path: string = '') => {
      if (typeof current === 'string' && current.trim()) {
        textsToTranslate.push(current);
        textPaths.push(path);
      } else if (typeof current === 'object' && current !== null) {
        for (const [key, value] of Object.entries(current)) {
          extractTexts(value, path ? `${path}.${key}` : key);
        }
      }
    };

    extractTexts(obj);

    if (textsToTranslate.length === 0) {
      return obj;
    }

    // Translate all texts
    const translations = await this.translateMultipleTexts(textsToTranslate, targetLanguage, sourceLanguage);

    // Rebuild object with translations
    const result = { ...obj };
    translations.forEach((translation, index) => {
      const path = textPaths[index];
      const keys = path.split('.');
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      current[keys[keys.length - 1]] = translation.translatedText;
    });

    return result;
  }

  getSupportedLanguages(): string[] {
    return ['pt', 'en', 'fr', 'de', 'es', 'it', 'nl', 'sv', 'no', 'da'];
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const translationService = new TranslationService();
