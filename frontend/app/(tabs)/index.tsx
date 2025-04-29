import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import * as WebBrowser from 'expo-web-browser';
import { AuthButton } from '@/src/components/AuthButton';

WebBrowser.maybeCompleteAuthSession();

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One two</Text>
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <AuthButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
