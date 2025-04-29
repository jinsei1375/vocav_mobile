import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { supabase } from '@/src/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';

export const AuthButton = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 現在のセッションを取得
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setUser(data.session?.user ?? null);
    };

    fetchSession();

    // セッション変更を監視
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Login error:', error.message);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Logout error:', error.message);
  };

  return (
    <View>
      {session ? (
        <>
          <Text>ようこそ, {user?.user_metadata.name}さん</Text>
          <Button title="ログアウト" onPress={handleLogout} />
        </>
      ) : (
        <Button title="Googleでログイン" onPress={handleLogin} />
      )}
    </View>
  );
};
