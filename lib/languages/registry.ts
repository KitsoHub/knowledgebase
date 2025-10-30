/**
 * Central registry for all language metadata
 * Automatically available in any context
 */

import { LanguageMetadata } from '../languages-data'

const LANGUAGE_REGISTRY = new Map<string, LanguageMetadata>()

/**
 * Register a language's metadata
 * @example registerLanguage(setswanaMeta)
 */

export function registerLanguage(metadata: LanguageMetadata) {
  LANGUAGE_REGISTRY.set(metadata.id, metadata)
}

/**
 * Get metadata for current language
 * @example const meta = getLanguageMeta('setswana');
 */
export function getLanguageMeta(id: string): LanguageMetadata | undefined {
  return LANGUAGE_REGISTRY.get(id)
}

/**
 * Get metadata for language from context (e.g., in page routes)
 * @example const meta = getLanguageMetaFromContext(params.lang);
 */
export function getLanguageMetaFromContext(langCode: string): LanguageMetadata {
  const meta = LANGUAGE_REGISTRY.get(langCode)
  if (!meta) throw new Error(`Language metadata not found for ${langCode}`)
  return meta
}
