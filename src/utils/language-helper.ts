export const supportedLanguages = ['en', 'ru', 'de'];

/**
 * Extracts the supported language code from the pathname URL.
 * @param pathname - For example, window.location.pathname
 * @returns the language code ('en', 'ru', 'de') or null if not found.
 */
export const getLanguageFromPath = (pathname: string): string | null => {
    const pathParts = pathname.split('/').filter(Boolean); // ['ru', 'about']
    const potentialLang = pathParts[0];
    if (potentialLang && supportedLanguages.includes(potentialLang)) {
        return potentialLang;
    }
    return null;
};