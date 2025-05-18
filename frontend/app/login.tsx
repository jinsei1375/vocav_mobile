import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '@/src/contexts/AuthContext';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function LoginScreen() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  // ログイン済みなら自動でトップへ遷移
  useEffect(() => {
    if (user) {
      router.replace('/'); // (tabs)へ
    }
  }, [user]);

  if (loading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Googleアカウントでログインしてください</Text>
      <Button title="Googleでログイン" onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 24 },
});
