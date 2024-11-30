import { Text } from "@/components/themed";
import Card from "./card";
import { useAtom } from "jotai";
import authAtom from "@/atoms/auth";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View } from "react-native";

export default function Welcome() {
  const time = new Date().getHours();
  const greeting =
    time < 12 ? "Good Morning" : time < 18 ? "Good Afternoon" : "Good Evening";

  const [auth, _setAuth] = useAtom(authAtom);

  return (
    <Card>
      <View className="w-full">
        <View className="px-4">
          <Text className="text-lg text-left">{greeting}</Text>
          <Text className="text-3xl text-left text-red-300 font-bold">
            {auth.user?.name ?? "Guest"}
          </Text>
        </View>
        <View className="flex flex-3 flex-row items-start py-8">
          <View className="flex items-center flex-1">
            <View className="flex items-center flex-1 justify-center flex-row">
              <Ionicons
                name="notifications-circle-outline"
                size={52}
                color="#a87644"
              />
              <Text className="text-4xl font-semibold">4</Text>
            </View>
            <Text className="text-sm text-left font-thin">Alarms</Text>
          </View>
          <View className="flex items-center flex-1 pr-2">
            <View className="flex items-center flex-1 justify-center flex-row">
              <AntDesign name="warning" size={52} color="red" />
              <Text className="text-4xl font-semibold">1</Text>
            </View>
            <Text className="text-sm text-left font-thin">Warnings</Text>
          </View>
          <View className="flex items-center flex-1 pr-8">
            <View className="flex items-center flex-1 justify-center flex-row gap-1">
              <AntDesign name="checkcircle" size={52} color="#084" />
              <Text className="text-4xl font-semibold">3</Text>
            </View>
            <Text className="text-sm text-left font-thin">Checks</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
