import { ScrollView, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { AuthButton } from '@/src/components/AuthButton';
import { VocabList } from '@/src/components/VocabList';
import { VocabForm } from '@/src/components/VocabForm';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AuthButton />
      <VocabForm />
      <VocabList />
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
