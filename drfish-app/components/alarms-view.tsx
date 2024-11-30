import { View } from "react-native";
import { Text } from "./themed";
import Card from "./card";
import { Link } from "expo-router";

export default function AlarmsView() {
  return (
    <Card title="Alarms (4)">
      <View className="px-5">
        <Text className="text-xl text-amber-300 font-bold">Oxygen</Text>
        <Text className="text-lg font-thin">
          The oxygen level for trout shouldn't be below 20%.
        </Text>
        <View className="flex flex-row justify-around items-center">
          <View className="flex flex-1 items-center">
            <Text>Required</Text>
            <Text>0.223</Text>
          </View>
          <View className="flex flex-1 items-center">
            <Text>Current</Text>
            <Text>4.75%</Text>
          </View>
        </View>
      </View>

      <Link href={"/test"} className="text-blue-300 text-lg underline">
        View More {">>"}
      </Link>
    </Card>
  );
}
