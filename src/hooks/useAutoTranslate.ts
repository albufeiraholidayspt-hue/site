import { translationService } from '../services/translationService';

const TARGET_LANGUAGES = ['en', 'fr', 'de'];

export interface TranslatedFields {
  [key: string]: string;
}

/**
 * Traduz automaticamente um texto para todos os idiomas suportados
 * @param text - Texto em português para traduzir
 * @param fieldName - Nome do campo (ex: 'description', 'tagline')
 * @returns Objeto com as traduções (ex: { description_en: '...', description_fr: '...', description_de: '...' })
 */
export async function autoTranslateField(
  text: string,
  fieldName: string
): Promise<TranslatedFields> {
  const translations: TranslatedFields = {};

  if (!text || text.trim() === '') {
    return translations;
  }

  try {
    for (let i = 0; i < TARGET_LANGUAGES.length; i++) {
      const lang = TARGET_LANGUAGES[i];
      const result = await translationService.translateText(text, lang, 'pt');
      translations[`${fieldName}_${lang}`] = result.translatedText;
      
      // Delay de 2 segundos entre idiomas para respeitar rate limit da API MyMemory
      if (i < TARGET_LANGUAGES.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  } catch (error) {
    console.error('Auto-translation failed:', error);
    // Em caso de erro, retorna objeto vazio - as traduções não serão atualizadas
  }

  return translations;
}

/**
 * Traduz automaticamente múltiplos campos de uma vez
 * @param fields - Objeto com os campos a traduzir (ex: { description: '...', tagline: '...' })
 * @returns Objeto com todas as traduções
 */
export async function autoTranslateFields(
  fields: Record<string, string>
): Promise<TranslatedFields> {
  const allTranslations: TranslatedFields = {};

  for (const [fieldName, text] of Object.entries(fields)) {
    if (text && text.trim() !== '') {
      const fieldTranslations = await autoTranslateField(text, fieldName);
      Object.assign(allTranslations, fieldTranslations);
    }
  }

  return allTranslations;
}

/**
 * Verifica se um campo foi alterado e precisa de nova tradução
 * @param oldValue - Valor antigo
 * @param newValue - Valor novo
 * @returns true se o campo foi alterado
 */
export function fieldChanged(oldValue: string | undefined, newValue: string | undefined): boolean {
  return (oldValue || '') !== (newValue || '');
}
