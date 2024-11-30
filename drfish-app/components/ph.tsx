import { Text, View } from "@/components/themed";
import Card from "@/components/card";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { phAtom } from "@/atoms/water-parameters";

export default function Ph({ className }: { className?: string }) {
  const colorscheme = useColorScheme();
  const [pHs, setPHs] = useAtom(phAtom);
  const [pHReview, setPHReview] = useState<Review>({
    color: "green",
    message: "pH is normal",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updatePHs();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newPH = pHs[pHs.length - 1];
    if (newPH > 8) {
      setPHReview({ color: "red", message: "pH is too high" });
    } else if (newPH < 6) {
      setPHReview({ color: "blue", message: "pH is too low" });
    } else {
      setPHReview({ color: "green", message: "pH is normal" });
    }
  }, [pHs]);

  function updatePHs() {
    // range
    const range = { min: 5.5, max: 8.5 };
    const newPHs = pHs.map((pH) => {
      const fluctuation = Math.random() * 0.2 - 0.1; // Generate random fluctuation within [-0.1, 0.1]
      return Math.min(range.max, Math.max(range.min, pH + fluctuation));
    });
    setPHs(newPHs);
  }
  return (
    <Card className={className} title="pH Levels">
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: pHs,
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
        <Text className="text-lg">{pHs[pHs.length - 1].toFixed(2)}</Text>
        <Text
          className="text-base"
          style={{
            color: colors[colorscheme ?? "dark"][pHReview.color],
            textShadowColor: colors[colorscheme ?? "dark"][pHReview.color],
            textShadowRadius: 16,
          }}
        >
          {pHReview.message}
        </Text>
      </View>
    </Card>
  );
}
