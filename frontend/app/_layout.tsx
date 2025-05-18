import { Button, TouchableOpacity, View, Modal, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { AuthProvider, useAuth } from '@/src/contexts/AuthContext';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}

function RootLayout() {
  const { user, loading, signIn, signOut } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);

  if (loading) return null;

  return (
    <Stack>
      <Stack.Screen
        name={user ? '(tabs)' : 'login'}
        options={{
          headerShown: true,
          title: 'Vocab',
          headerRight: () =>
            user ? (
              <>
                <TouchableOpacity
                  onPress={() => setDrawerVisible(true)}
                  style={{ marginRight: 16 }}
                >
                  <FontAwesome name="google" size={24} color="#4285F4" />
                </TouchableOpacity>
                <Modal
                  visible={drawerVisible}
                  animationType="slide"
                  transparent
                  onRequestClose={() => setDrawerVisible(false)}
                >
                  <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPressOut={() => setDrawerVisible(false)}
                  >
                    <View style={styles.drawer}>
                      <Button
                        title="ログアウト"
                        onPress={async () => {
                          setDrawerVisible(false);
                          await signOut();
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </Modal>
              </>
            ) : (
              <Button title="ログイン" onPress={signIn} />
            ),
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  drawer: {
    width: 200,
    height: '100%',
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
