import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { supabase } from '../lib/supabaseClient';

export const VocabForm = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddVocab = async () => {
    const { data: session } = await supabase.auth.getSession();
    const token = session?.session?.access_token;
    setLoading(true);

    fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}/vocab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ word, meaning }),
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
