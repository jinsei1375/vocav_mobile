import { supabase } from '@/src/lib/supabaseClient';

export const fetchVocabList = async () => {
  const session = await supabase.auth.getSession();
  const accessToken = session.data.session?.access_token;
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch vocab list');
  }
  return await response.json();
};
