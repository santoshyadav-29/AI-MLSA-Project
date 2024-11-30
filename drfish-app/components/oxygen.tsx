import { Text, View } from "@/components/themed";
import Card from "@/components/card";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { oxygenAtom } from "@/atoms/water-parameters";

export default function Oxygen({ className }: { className?: string }) {
  const colorscheme = useColorScheme();
  const [oxygens, setOxygens] = useAtom(oxygenAtom);
  const [oxygenReview, setOxygenReview] = useState<Review>({
    color: "green",
    message: "Oxygen level is normal",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateOxygens();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newOxygens = oxygens[oxygens.length - 1];
    if (newOxygens > 10) {
      setOxygenReview({ color: "red", message: "Oxygen level is too high" });
    } else if (newOxygens < 6) {
      setOxygenReview({ color: "blue", message: "Oxygen level is too low" });
    } else {
      setOxygenReview({ color: "green", message: "Oxygen level is normal" });
    }
  }, [oxygens]);

  function updateOxygens() {
    // range
    const range = { min: 3, max: 15 };
    const newOxygens = oxygens.map((oxygen) => {
      const fluctuation = Math.random() * 0.2 - 0.1; // Generate random fluctuation within [-0.1, 0.1]
      return Math.min(range.max, Math.max(range.min, oxygen + fluctuation));
    });
    setOxygens(newOxygens);
  }
  return (
    <Card className={className} title="Dissolved Oxygen Levels">
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: oxygens,
            },
          ],
        }}
        width={Dimensions.get("window").width - 100}
        height={220}
        chartConfig={{
          backgroundColor: colors[colorscheme ?? "dark"].backgroundSecondary,
          backgroundGradientFrom:
            colors[colorscheme ?? "dark"].backgroundSecondary,
          backgroundGradientTo:
            colors[colorscheme ?? "dark"].backgroundSecondary,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View className="bg-transparent flex flex-row items-center justify-between w-full px-4">
        <Text className="text-lg">
          {oxygens[oxygens.length - 1].toFixed(2)} mg/L
        </Text>
        <Text
          className="text-base"
          style={{
            color: colors[colorscheme ?? "dark"][oxygenReview.color],
            textShadowColor: colors[colorscheme ?? "dark"][oxygenReview.color],
            textShadowRadius: 16,
          }}
        >
          {oxygenReview.message}
        </Text>
      </View>
    </Card>
  );
}
