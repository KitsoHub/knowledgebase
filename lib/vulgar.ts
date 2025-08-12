export const VULGAR_WORDS = [
  // Basic inappropriate words
  'damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap',
  'piss', 'whore', 'slut', 'dick', 'cock', 'pussy', 'cunt',
  // Slurs and offensive terms
  'nigger', 'fag', 'retard',
  // Common substitutions
  'f*ck', 'sh*t', 'b*tch', 'a$$', 'h3ll', '5hit', 'fuk', 'fck',
  // Setswana inappropriate words
  'polo', 'lerete', 'sebono', 'marago', 'kaka', 'mosono', 'sefebe'
];

export const containsVulgarLanguage = (name: string): boolean => {
  const normalizedName = name.toLowerCase();
  return VULGAR_WORDS.some(word => {
    const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    // Use word boundaries to match whole words only
    const regex = new RegExp(`\\b${normalizedWord}\\b`);
    return regex.test(normalizedName);
  });
};

function checkLeetSpeak(name: string): boolean {
  const leetMap: { [key: string]: string } = {
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '8': 'b',
    '@': 'a',
    '$': 's'
  };

  // Convert leet speak to normal text
  let converted = name.toLowerCase();
  Object.keys(leetMap).forEach(leet => {
    converted = converted.replace(new RegExp(leet, 'g'), leetMap[leet]);
  });

  // Check for vulgar words with word boundaries
  return VULGAR_WORDS.some(word => {
    const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    const regex = new RegExp(`\\b${normalizedWord}\\b`);
    return regex.test(converted);
  });
}

export const validateUsername = (name: string): { isValid: boolean; message?: string } => {
  // Check length
  if (name.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters long.' };
  }

  if (name.length > 20) {
    return { isValid: false, message: 'Name must be less than 20 characters long.' };
  }

  // Check for vulgar language
  if (containsVulgarLanguage(name) || checkLeetSpeak(name)) {
    return { isValid: false, message: 'Please choose an appropriate name.' };
  }

  // Check for excessive special characters
  const specialCharCount = (name.match(/[^a-zA-Z0-9]/g) || []).length;
  if (specialCharCount > name.length * 0.5) {
    return { isValid: false, message: 'Name contains too many special characters.' };
  }

  return { isValid: true, message: 'Name is valid.' };
};