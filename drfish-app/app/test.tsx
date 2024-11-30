import { Text, View } from "@/components/themed";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View className="flex-1 flex justify-center items-center">
      <Text className="text-xl">React Native Test Page</Text>
      <Link href="/" className="text-blue-400">
        Back To Home
      </Link>
      <StatusBar style="dark" />
    </View>
  );
}
