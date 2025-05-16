import { ActivityIndicator, Alert, Button, ScrollView, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AuthButton } from '@/src/components/AuthButton';
import { VocabList } from '@/src/components/VocabList';
import { VocabForm } from '@/src/components/VocabForm';
import { useEffect, useState } from 'react';
import { Vocab } from '@/src/interfaces/vocab';
import { createVocab, deleteVocab, fetchVocabList, updateVocab } from '@/src/api/api';
import Toast from 'react-native-root-toast';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  const [vocabs, setVocabs] = useState<Vocab[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editTarget, setEditTarget] = useState<Vocab | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVocabList()
      .then(setVocabs)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    setEditTarget(null);
    setModalVisible(true);
  };

  const handleEdit = (vocab: Vocab) => {
    setEditTarget(vocab);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    const doDelete = async () => {
      try {
        await deleteVocab(id);
        setVocabs((prev) => prev.filter((vocab) => vocab.id !== id));
        Toast.show('削除しました', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      } catch (err: any) {
        setError(err.message);
      }
    };

    Alert.alert('確認', '本当に削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: () => {
          doDelete();
        },
      },
    ]);
  };

  const handleSubmit = async (word: string, meaning: string) => {
    if (editTarget) {
      const updated = await updateVocab(editTarget.id, word, meaning);
      setVocabs((prev) =>
        prev.map((vocab) => (vocab.id === updated.id ? { ...vocab, ...updated } : vocab))
      );
      Toast.show('更新しました', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    } else {
      const created = await createVocab(word, meaning);
      setVocabs((prev) => [created, ...prev]);
      Toast.show('追加しました', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
    setModalVisible(false);
  };

  if (loading) return <ActivityIndicator />;
  // if (error) return <Text>{error}</Text>;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="単語を追加" onPress={handleAdd} />
      <VocabForm
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialWord={editTarget?.word}
        initialMeaning={editTarget?.meaning}
        isEdit={!!editTarget}
      />
      <VocabList vocabs={vocabs} onEdit={handleEdit} onDelete={handleDelete} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
