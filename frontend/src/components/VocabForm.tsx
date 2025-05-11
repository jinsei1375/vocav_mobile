import { useState, useEffect } from 'react';
import { Button, Text, TextInput, View, Modal } from 'react-native';

export type VocabFormProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (word: string, meaning: string) => void;
  initialWord?: string;
  initialMeaning?: string;
  isEdit?: boolean;
};

export const VocabForm = ({
  visible,
  onClose,
  onSubmit,
  initialWord = '',
  initialMeaning = '',
  isEdit = false,
}: VocabFormProps) => {
  const [word, setWord] = useState(initialWord);
  const [meaning, setMeaning] = useState(initialMeaning);

  useEffect(() => {
    setWord(initialWord);
    setMeaning(initialMeaning);
  }, [initialWord, initialMeaning, visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <View style={{ backgroundColor: 'white', padding: 24, borderRadius: 8, width: '80%' }}>
          <Text>{isEdit ? '単語を編集' : '単語を追加'}</Text>
          <TextInput
            placeholder="単語"
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={word}
            onChangeText={setWord}
          />
          <TextInput
            placeholder="意味"
            style={{ borderWidth: 1, marginBottom: 8 }}
            value={meaning}
            onChangeText={setMeaning}
          />
          <Button
            title={isEdit ? '更新' : '追加'}
            onPress={() => {
              onSubmit(word, meaning);
              setWord('');
              setMeaning('');
            }}
          />
          <Button title="キャンセル" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
