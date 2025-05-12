import { View, Text, StyleSheet } from 'react-native';
import { Vocab } from '../interfaces/vocab';
import { Button } from 'react-native';

type VocabListProps = {
  vocabs: Vocab[];
  onEdit: (vocab: Vocab) => void;
  onDelete: (id: number) => void;
};

export const VocabList = ({ vocabs, onEdit, onDelete }: VocabListProps) => {
  return (
    <View style={styles.container}>
      {vocabs.map((vocab) => (
        <View
          key={vocab.id}
          style={{ flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}
        >
          <Text style={{ flex: 1 }}>
            {vocab.word} - {vocab.meaning}
          </Text>
          <Text style={{ marginRight: 8 }}>{vocab.created_at}</Text>
          <Text style={{ marginRight: 8 }}>{vocab.updated_at}</Text>
          <Button title="編集" onPress={() => onEdit(vocab)} />
          <Button title="削除" onPress={() => onDelete(vocab.id)} />
        </View>
      ))}
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
