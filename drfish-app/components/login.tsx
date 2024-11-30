import { View, Text, TextInput } from "@/components/themed";
import { Pressable } from "react-native";
import users from "@/constants/users";
import { useState } from "react";
import { useAtom } from "jotai";
import authAtom from "@/atoms/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [auth, setAuth] = useAtom(authAtom);

  function handleLogin() {
    const user = users.find(
      (user) =>
        user.username === username.trimEnd() && user.password === password,
    );

    if (user) {
      // setLoggedIn(true);
      setAuth({ loggedIn: true, user });
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <View className="flex flex-1 flex-col w-full justify-center items-center p-8">
      <View className="w-full flex flex-col gap-4">
        <Text className="text-2xl font-bold text-blue-200 text-center">
          Login
        </Text>

        <View className="w-full flex flex-col gap-1">
          <Text className="pl-4">Username</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="border-2 border-blue-200 w-full rounded-full py-2 px-4"
            placeholder="username"
            placeholderTextColor="#666"
          />
        </View>

        <View className="w-full flex flex-col gap-1">
          <Text className="pl-4">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            className="border-2 border-blue-200 w-full rounded-full py-2 px-4"
            placeholder="password"
            placeholderTextColor="#666"
            keyboardType="visible-password"
            secureTextEntry={true}
            autoComplete="password"
          />
        </View>

        {error && <Text className="text-red-500 text-center">{error}</Text>}

        {auth.loggedIn && (
          <Text className="text-green-500 text-center">Logged in</Text>
        )}

        <Pressable onPress={handleLogin} className="w-full pt-4">
          <Text className="text-center text-black font-bold rounded-full bg-blue-400 py-3 w-full">
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
