import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { createVocab } from '../api/api';

export const VocabForm = () => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const handleAddVocab = async () => {
    createVocab(word, meaning).then(() => {
      alert('単語が追加されました');
      setWord('');
      setMeaning('');
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
