import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Message, TextUIPart } from './types';
import { CommunityGovernance, CulturalProtocol } from '@/lib/constants/community';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const shuffleArray = <T>(arr: T[]): void => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
  }
}

export function fillMessageParts(messages: Message[]): Message[] {
  return messages.map(message => ({
    ...message,
    parts: getMessageParts(message),
  }));
}

export function getMessageParts(message: Message): (TextUIPart)[] {
  return (
    message.parts ?? [
      ...(message.content
        ? [{ type: 'text' as const, text: message.content }]
        : []),
    ]
  );
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


export const formatGovernanceText = (model: CommunityGovernance) => {
  return model.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export const formatProtocolText = (protocol: CulturalProtocol) => {
  return protocol.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
};

export const getProtocolColor = (protocol: CulturalProtocol) => {
  switch (protocol) {
    case CulturalProtocol.PUBLIC:
      return "bg-green-100 text-green-800 border-green-300";
    case CulturalProtocol.COMMUNITY_ONLY:
      return "bg-blue-100 text-blue-800 border-blue-300";
    case CulturalProtocol.ELDER_APPROVAL_REQUIRED:
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case CulturalProtocol.GENDER_RESTRICTED:
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};
