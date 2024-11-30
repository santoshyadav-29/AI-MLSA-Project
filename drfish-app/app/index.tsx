import { View } from "@/components/themed";
import { ScrollView } from "react-native-gesture-handler";
import Welcome from "@/components/welcome";
import AlarmsView from "@/components/alarms-view";
import ParametersView from "@/components/parameters-view";

export default function Page() {
  return (
    <ScrollView>
      <View className="flex-1 flex justify-center items-center h-full">
        <Welcome />
        <AlarmsView />
        <ParametersView />
      </View>
    </ScrollView>
  );
}
