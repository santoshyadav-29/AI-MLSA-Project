import { View } from "@/components/themed";
import Temperature from "@/components/temperature";
import Ph from "@/components/ph";
import Oxygen from "@/components/oxygen";
import { ScrollView } from "react-native-gesture-handler";
import Ammonia from "@/components/ammonia";
import Potassium from "@/components/potassium";

export default function Page() {
  return (
    <ScrollView>
      <View className="flex-1 flex justify-center items-center">
        <Temperature />
        <Ph />
        <Oxygen />
        <Ammonia />
        <Potassium />
      </View>
    </ScrollView>
  );
}
