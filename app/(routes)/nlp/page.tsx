'use client';
import { useState } from 'react';


type TranslationKeys = 'hello' | 'good morning' | 'how are you?';
interface Translations {
  [key: string]: { [key in TranslationKeys]: string };
}


const translations: Translations = {
  setswana: {
    'hello': 'Dumela',
    'good morning': 'Mmorong',
    'how are you?': 'O tsogile jang?'
  },
  ikalanga: {
    'hello': 'Mhoro',
    'good morning': 'Mhango wakanaka',
    'how are you?': 'Wakadini zvako?'
  },
  shekgalagari: {
    'hello': 'Mhoro',
    'good morning': 'Mhango wakanaka',
    'how are you?': 'O kae?'
  },
  ndebele: {
    'hello': 'Mholo',
    'good morning': 'Sawubona',
    'how are you?': 'Unjani?'
  },
  shona: {
    'hello': 'Mhoro',
    'good morning': 'Mangwanani zvakanaka',
    'how are you?': 'Wakadini zvako?'
  },
  mbukushu: {
    hello: 'Mura',
    'good morning': 'Mwandja gha yiro',
    'how are you?': 'Ku yendje gha yiro?'
  },
  subiya: {
    'hello': 'Mula',
    'good morning': 'Mwa zoba',
    'how are you?': 'Wa yuba hani?'
  },
  otjiherero: {
    'hello': 'Mba penduka',
    'good morning': 'Mwa penduka tje',
    'how are you?': 'Mwa penduka tje nava?'
  },
  sekgalagari: {
    'hello': 'Mhoro',
    'good morning': 'Mhango wakanaka',
    'how are you?': 'O kae?'
  },
  '!xoo': {
    hello: '!Xoo',
    'good morning': '!Xoo',
    'how are you?': '!Xoo'
  },
  thimbukushu: {
    'hello': 'Mura',
    'good morning': 'Mwandja gha yiro',
    'how are you?': 'Ku yendje gha yiro?'
  },
  chikuhane: {
    'hello': 'Mula',
    'good morning': 'Mwa zoba',
    'how are you?': 'Wa yuba hani?'
  },
  sebirwa: {
    'hello': 'Dumela',
    'good morning': 'Mmorong',
    'how are you?': 'O tsogile jang?'
  },
  afrikaans: {
    'hello': 'Hallo',
    'good morning': 'Goeie môre',
    'how are you?': 'Hoe gaan dit?'
  },
  sekwena: {
    'hello': 'Dumela',
    'good morning': 'Mmorong',
    'how are you?': 'O tsogile jang?'
  },
  sesarwa: {
    'hello': '!Xoo',
    'good morning': '!Xoo',
    'how are you?': '!Xoo'
  },
  english: {
    'hello': 'Hello',
    'good morning': 'Good morning',
    'how are you?': 'How are you?'
  },
  sengologa: {
    'hello': 'Mhoro',
    'good morning': 'Mhango wakanaka',
    'how are you?': 'O kae?'
  },
  nama: {
    'hello': '!Gai tsaub',
    'good morning': '!Gai !aub',
    'how are you?': '!Gai !naos'
  },
  sesubiya: {
    'hello': 'Mula',
    'good morning': 'Mwa zoba',
    'how are you?': 'Wa yuba hani?'
  }
};

const languages = Object.keys(translations);
const LANGUAGE_PLACEHOLDER = 'Choose a language';
const HELLO_EXAMPLE = 'e.g., Hello, Good morning, How are you?';
const TRANSLATION_TEXT = 'Translation:';

const normalizeInput = (input: string): string =>
  input.toLowerCase().trim().replace(/[.,!?]/g, '');

export default function Home() {
   const [selectedLanguage, setSelectedLanguage] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleTranslate = () => {
    if (!selectedLanguage) {
      setOutput('Please select a language.');
      return;
    }
    const normalized = normalizeInput(input);
    const languageDict = translations[selectedLanguage.toLowerCase() as keyof Translations];
    const translation =
      languageDict[normalized as TranslationKeys] ||
      'Sorry, I don\'t have a translation for that phrase.';
    setOutput(translation);
  };


  return (
    <div>
         <div>
          <section>
            <div className='mb-1 text-center bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-590/50 dark:hover:to-indigo-950/50 py-16'>
              <span className="inline-block mt-7 px-4 py-2 mb-6 rounded-full bg-white text-primary text-sm font-medium animate-fade-in">Contribute knowledge for a better Botswana</span>
              <h1 className='mb-5'>PuoAi</h1>
              <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                 This is a <strong>prototype</strong> for an NLP chatbot that translates English greetings
          into 20 Botswana languages, based on data from a{' '}
          <a
            href="https://web.facebook.com/culturebotswana/posts/314706016078519"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Culture Botswana post
          </a>.
          It supports translations for &quot;Hello,&quot; &quot;Good morning,&quot; and &quot;How are you?&quot;
          in languages like Setswana, Ikalanga, Nama, and more. This rule-based demo matches exact phrases
          and is a starting point for a more advanced NLP system (e.g., with fuzzy matching or ML models).
        </p>

            </div>

          </section></div>
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Botswana Languages Greeting Chatbot</h1>
        <p className="text-gray-700 mb-6">
          This is a <strong>prototype</strong> for an NLP chatbot that translates English greetings
          into 20 Botswana languages, based on data from a{' '}
          <a
            href="https://web.facebook.com/culturebotswana/posts/314706016078519"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Culture Botswana post
          </a>.
          It supports translations for &quot;Hello,&quot; &quot;Good morning,&quot; and &quot;How are you?&quot;
          in languages like Setswana, Ikalanga, Nama, and more. This rule-based demo matches exact phrases
          and is a starting point for a more advanced NLP system (e.g., with fuzzy matching or ML models).
        </p>
        <div className="mb-4">
          <label htmlFor="language" className="block text-gray-700 font-semibold mb-2">
            Select Language:
          </label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">{LANGUAGE_PLACEHOLDER}</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="input" className="block text-gray-700 font-semibold mb-2">
            Enter Greeting:
          </label>
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={HELLO_EXAMPLE}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleTranslate}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Translate
        </button>
        {output && (
          <div className="mt-4 p-4 bg-gray-50 rounded border">
            <p className="text-gray-800">
              <strong>Translation:</strong> {output}
            </p>
          </div>
        )}
      </div>
    </div>
    </div>

  );
}
