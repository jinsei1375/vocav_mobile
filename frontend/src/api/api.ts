import { supabase } from '@/src/lib/supabaseClient';
import { Vocab } from '../interfaces/vocab';

export const getSessionTokens = async () => {
  const session = await supabase.auth.getSession();
  const accessToken = session.data.session?.access_token;
  const refreshToken = session.data.session?.refresh_token;

  if (!accessToken || !refreshToken) {
    throw new Error('セッション情報が取得できません');
  }

  return { accessToken, refreshToken };
};

export const fetchVocabList = async (): Promise<Vocab[]> => {
  const { accessToken, refreshToken } = await getSessionTokens();

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken, refreshToken }),
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vocab list');
  }
  return await response.json();
};

export const createVocab = async (word: string, meaning: string): Promise<Vocab> => {
  const { accessToken, refreshToken } = await getSessionTokens();

  const requestBody = {
    session: {
      accessToken,
      refreshToken,
    },
    vocab: {
      word,
      meaning,
    },
  };

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error('Failed to create vocab');
  }
  return await response.json();
};

export const updateVocab = async (id: number, word: string, meaning: string): Promise<Vocab> => {
  const { accessToken, refreshToken } = await getSessionTokens();

  const requestBody = {
    session: {
      accessToken,
      refreshToken,
    },
    vocab: {
      id,
      word,
      meaning,
    },
  };

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error('Failed to update vocab');
  }
  return await response.json();
};

export const deleteVocab = async (id: number): Promise<void> => {
  const { accessToken, refreshToken } = await getSessionTokens();

  const requestBody = {
    session: {
      accessToken,
      refreshToken,
    },
    id,
  };

  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    throw new Error('Failed to delete vocab');
  }
};
