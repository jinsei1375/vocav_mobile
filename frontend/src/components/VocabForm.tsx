import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabaseClient';

export const VocabForm = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddVocab = async () => {
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;
    const refreshToken = session.data.session?.refresh_token;
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

    fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then(() => {
        setWord('');
        setMeaning('');
        alert('単語が追加されました');
      })
      .catch((error) => {
        console.error(error);
        alert('エラーが発生しました');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={{ padding: 16 }}>
      <Text>単語を追加</Text>
      <TextInput
        placeholder="単語"
        style={{ borderWidth: 1, marginBottom: 8 }}
        onChangeText={(text) => setWord(text)}
      />
      <TextInput
        placeholder="意味"
        style={{ borderWidth: 1, marginBottom: 8 }}
        onChangeText={(text) => setMeaning(text)}
      />
      <Button title="追加" onPress={() => handleAddVocab()} />
    </View>
  );
};
