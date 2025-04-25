import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import { useEffect } from 'react';
import { supabase } from '@/src/lib/supabaseClient';

export default function TabOneScreen() {
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('vocab').select('*');
      if (error) {
        console.error('Error fetching data:', error);
      }
      if (data) {
        console.log('Fetched data:', data);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
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
