import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { fetchVocabList, updateVocab } from '@/src/api/api';
import { Vocab } from '../interfaces/vocab';
import { Button } from 'react-native';

export const VocabList = () => {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editWord, setEditWord] = useState('');
  const [editMeaning, setEditMeaning] = useState('');

  useEffect(() => {
    fetchVocabList()
      .then(setVocabs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator />;
  if (error) return <Text>{error}</Text>;

  const startEdit = (vocab: Vocab) => {
    setEditingId(vocab.id);
    setEditWord(vocab.word);
    setEditMeaning(vocab.meaning);
  };

  const handleUpdate = async () => {
    if (editingId === null) return;
    try {
      const updated = await updateVocab(editingId, editWord, editMeaning);
      setVocabs((prev) => prev.map((v) => (v.id === editingId ? { ...v, ...updated } : v)));
      setEditingId(null);
      setEditWord('');
      setEditMeaning('');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      {vocabs.map((vocab) =>
        editingId === vocab.id ? (
          <View key={vocab.id} style={{ marginBottom: 8 }}>
            <TextInput
              value={editWord}
              onChangeText={setEditWord}
              style={styles.input}
              placeholder="単語"
            />
            <TextInput
              value={editMeaning}
              onChangeText={setEditMeaning}
              style={styles.input}
              placeholder="意味"
            />
            <Button title="保存" onPress={handleUpdate} />
            <Button title="キャンセル" onPress={() => setEditingId(null)} />
          </View>
        ) : (
          <View
            key={vocab.id}
            style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}
          >
            <Text style={{ flex: 1 }}>
              {vocab.word} - {vocab.meaning}
            </Text>
            <Text style={{ marginRight: 8 }}>{vocab.created_at}</Text>
            <Text style={{ marginRight: 8 }}>{vocab.updated_at}</Text>
            <Button title="編集" onPress={() => startEdit(vocab)} />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 4,
    marginBottom: 4,
    borderRadius: 4,
  },
});
