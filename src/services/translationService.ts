import axios from 'axios';

export interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
}

class TranslationService {
  private apiKey: string;
  private provider: 'libre' | 'myMemory';

  constructor() {
    this.apiKey = import.meta.env.VITE_TRANSLATION_API_KEY || '';
    // Prioritize free services: LibreTranslate -> MyMemory
    this.provider = this.apiKey ? 'libre' : 'myMemory';
  }

  async translateText(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult> {
    try {
      if (this.provider === 'libre') {
        return await this.translateWithLibre(text, targetLanguage, sourceLanguage);
      } else {
        return await this.translateWithMyMemory(text, targetLanguage, sourceLanguage);
      }
    } catch (error) {
      console.error('Translation error:', error);
      // Fallback to MyMemory if LibreTranslate fails
      if (this.provider === 'libre') {
        console.log('Falling back to MyMemory API');
        return await this.translateWithMyMemory(text, targetLanguage, sourceLanguage);
      }
      throw new Error('Failed to translate text');
    }
  }

  private async translateWithLibre(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult> {
    const libreUrl = import.meta.env.VITE_LIBRETRANSLATE_URL || 'https://libretranslate.de/translate';
    
    const response = await axios.post(libreUrl, {
      q: text,
      source: sourceLanguage || 'pt',
      target: targetLanguage,
      format: 'text',
      api_key: this.apiKey
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      translatedText: response.data.translatedText,
      sourceLanguage: sourceLanguage || 'pt',
      targetLanguage
    };
  }

  private async translateWithMyMemory(text: string, targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult> {
    const myMemoryUrl = 'https://api.mymemory.translated.net/get';
    const MAX_LENGTH = 500; // MyMemory free tier limit
    
    // Se o texto for muito longo, divide em partes
    if (text.length > MAX_LENGTH) {
      const sentences = text.split(/\n\n|\. /);
      let translatedParts: string[] = [];
      let currentChunk = '';
      
      for (const sentence of sentences) {
        if ((currentChunk + sentence).length > MAX_LENGTH && currentChunk) {
          // Traduz o chunk atual
          const response = await axios.get(myMemoryUrl, {
            params: {
              q: currentChunk,
              langpair: `${sourceLanguage || 'pt'}|${targetLanguage}`
            }
          });
          
          if (response.data.responseStatus === 200) {
            translatedParts.push(response.data.responseData.translatedText);
          }
          
          currentChunk = sentence;
          await new Promise(resolve => setTimeout(resolve, 100)); // Delay entre requests
        } else {
          currentChunk += (currentChunk ? '. ' : '') + sentence;
        }
      }
      
      // Traduz o último chunk
      if (currentChunk) {
        const response = await axios.get(myMemoryUrl, {
          params: {
            q: currentChunk,
            langpair: `${sourceLanguage || 'pt'}|${targetLanguage}`
          }
        });
        
        if (response.data.responseStatus === 200) {
          translatedParts.push(response.data.responseData.translatedText);
        }
      }
      
      return {
        translatedText: translatedParts.join('. '),
        sourceLanguage: sourceLanguage || 'pt',
        targetLanguage
      };
    }
    
    // Texto curto - traduz normalmente
    const response = await axios.get(myMemoryUrl, {
      params: {
        q: text,
        langpair: `${sourceLanguage || 'pt'}|${targetLanguage}`
      }
    });

    if (response.data.responseStatus === 200) {
      return {
        translatedText: response.data.responseData.translatedText,
        sourceLanguage: sourceLanguage || 'pt',
        targetLanguage
      };
    }

    throw new Error('MyMemory translation failed');
  }


  async translateMultipleTexts(texts: string[], targetLanguage: string, sourceLanguage?: string): Promise<TranslationResult[]> {
    const results: TranslationResult[] = [];
    
    // Process texts in batches to avoid rate limits
    for (let i = 0; i < texts.length; i += 5) {
      const batch = texts.slice(i, i + 5);
      const batchResults = await Promise.all(
        batch.map(text => this.translateText(text, targetLanguage, sourceLanguage))
      );
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + 5 < texts.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    return results;
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

  getProvider(): string {
    return this.provider;
  }

  isConfigured(): boolean {
    return this.provider === 'myMemory' || !!this.apiKey;
  }

  getProviderInfo(): { name: string; description: string; isFree: boolean } {
    switch (this.provider) {
      case 'libre':
        return {
          name: 'LibreTranslate',
          description: 'Serviço de tradução gratuito e open-source',
          isFree: true
        };
      case 'myMemory':
        return {
          name: 'MyMemory',
          description: 'Serviço gratuito com limite de 10.000 palavras/dia',
          isFree: true
        };
      default:
        return {
          name: 'Unknown',
          description: 'Serviço de tradução desconhecido',
          isFree: false
        };
    }
  }
}

export const translationService = new TranslationService();
