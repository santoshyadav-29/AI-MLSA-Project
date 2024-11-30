import { View, useColorScheme } from "react-native";
import { Text } from "./themed";
import { Link } from "expo-router";
import colors from "@/constants/colors";
import { ScrollView } from "react-native-gesture-handler";

function ListItem({
  parameter,
  value,
  changeRate,
  status,
}: {
  parameter: string;
  value: string;
  changeRate: string;
  status: string;
}) {
  return (
    <View>
      <View className="flex flex-row justify-between items-center w-full px-5 py-2">
        <View>
          <Text className="text-xl font-semibold">{parameter}</Text>
          <Text>{status}</Text>
        </View>
        <View className="flex items-end">
          <Text className="text-lg font-semibold">{value}</Text>
          <Text className="text-red-400">{changeRate}</Text>
        </View>
        {/* divider */}
      </View>
      <View className="w-full h-0.5 bg-gray-300 opacity-10 my-2"></View>
    </View>
  );
}

export default function ParametersView() {
  const colorscheme = useColorScheme();

  return (
    <>
      <ScrollView className="p-4 w-full">
        <View
          className={
            "flex justify-center items-center gap-2 h-fit w-full rounded-lg shadow py-2"
          }
          style={{
            backgroundColor: colors[colorscheme ?? "dark"].backgroundSecondary,
          }}
        >
          <View className="flex flex-row justify-between items-center w-full flex-2 px-5">
            <Text
              className="text-2xl font-semibold pb-4"
              style={{ color: colors[colorscheme ?? "dark"].blue }}
            >
              Parameters (5)
            </Text>
            <Link href={"/detail"} className="text-blue-300 underline pb-4">
              All {">"}
            </Link>
          </View>
          <View className="flex">
            <ListItem
              parameter="Oxygen"
              value="2.072 ppm"
              changeRate="+68.3%"
              status="Normal"
            />
            <ListItem
              parameter="Temperature"
              value="15°C"
              changeRate="-16.8%"
              status="Alarming"
            />
            <ListItem
              parameter="Nitrogen"
              value="0.012 ppm"
              changeRate="+11.5%"
              status="Normal"
            />
            <ListItem
              parameter="Phosphorus"
              value="0.053 ppm"
              changeRate="-9.0%"
              status="Normal"
            />
            <ListItem
              parameter="pH"
              value="5"
              changeRate="-9.0%"
              status="Alarming"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
