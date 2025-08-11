 export const VULGAR_WORDS = [
  // Add your list of inappropriate words here
  'damn', 'hell', 'shit', 'fuck', 'bitch', 'ass', 'bastard', 'crap',
  'piss', 'whore', 'slut', 'dick', 'cock', 'pussy', 'cunt', 'fag',
  'nigger', 'retard', 'gay', 'lesbian', 'homo', 'queer', 'tranny',
  // Add more words as needed, including variations and common substitutions
  'f*ck', 'sh*t', 'b*tch', 'a$$', 'h3ll', '5hit', 'fuk', 'fck',
  // Add Setswana inappropriate words if applicable
  'polo','lerete','sebono','marago','kaka','mosono','sefebe'
];

export const containsVulgarLanguage = (name: string): boolean => {
  const normalizedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  return VULGAR_WORDS.some(word => {
    const normalizedWord = word.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normalizedName.includes(normalizedWord);
  });
};

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
  const specialCharCount = (name.match(/[^a-zA-Z0-9\s]/g) || []).length;
  if (specialCharCount > 2) {
    return { isValid: false, message: 'Name contains too many special characters.' };
  }
  
  return { isValid: true };
};
