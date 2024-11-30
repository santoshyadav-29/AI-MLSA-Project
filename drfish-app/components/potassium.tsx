import { Text, View } from "@/components/themed";
import Card from "@/components/card";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { potassiumAtom } from "@/atoms/water-parameters";

export default function Potassium({ className }: { className?: string }) {
  const colorscheme = useColorScheme();
  const [potassiums, setPotassiums] = useAtom(potassiumAtom);
  const [potassiumReview, setPotassiumReview] = useState<Review>({
    color: "green",
    message: "Potassium level is normal",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updatePotassiums();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newPotassiums = potassiums[potassiums.length - 1];
    if (newPotassiums > 5) {
      setPotassiumReview({
        color: "red",
        message: "Potassium level is too high",
      });
    } else if (newPotassiums < 1) {
      setPotassiumReview({
        color: "blue",
        message: "Potassium level is too low",
      });
    } else {
      setPotassiumReview({
        color: "green",
        message: "Potassium level is normal",
      });
    }
  }, [potassiums]);

  function updatePotassiums() {
    // range
    const range = { min: 1, max: 8 };

    const newPotassiums = potassiums.map((potassium) => {
      const fluctuation = Math.random() * 0.2 - 0.1; // Generate random fluctuation within [-0.1, 0.1]
      return Math.min(range.max, Math.max(range.min, potassium + fluctuation));
    });
    setPotassiums(newPotassiums);
  }
  return (
    <Card className={className} title="Dissolved Potassium Levels">
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: potassiums,
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
          {potassiums[potassiums.length - 1].toFixed(3)} mg/L
        </Text>
        <Text
          className="text-base"
          style={{
            color: colors[colorscheme ?? "dark"][potassiumReview.color],
            textShadowColor:
              colors[colorscheme ?? "dark"][potassiumReview.color],
            textShadowRadius: 16,
          }}
        >
          {potassiumReview.message}
        </Text>
      </View>
    </Card>
  );
}
