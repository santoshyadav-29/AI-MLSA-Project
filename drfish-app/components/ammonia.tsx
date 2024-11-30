import { Text, View } from "@/components/themed";
import Card from "@/components/card";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { ammoniaAtom } from "@/atoms/water-parameters";

export default function Ammonia({ className }: { className?: string }) {
  const colorscheme = useColorScheme();
  const [ammonias, setAmmonias] = useAtom(ammoniaAtom);
  const [ammoniaReview, setAmmoniaReview] = useState<Review>({
    color: "green",
    message: "Ammonia level is normal",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateAmmonias();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const newAmmonias = ammonias[ammonias.length - 1];
    if (newAmmonias > 0.1) {
      setAmmoniaReview({
        color: "red",
        message: (
          <>
            Ammonia level is{" "}
            <Text
              className="font-bold"
              style={{
                color: colors[colorscheme ?? "dark"].red,
              }}
            >
              extremely
            </Text>{" "}
            high
          </>
        ),
      });
    } else if (newAmmonias > 0.02) {
      setAmmoniaReview({
        color: "red",
        message: "Ammonia level is high",
      });
    } else {
      setAmmoniaReview({
        color: "green",
        message: "Ammonia level is normal",
      });
    }
  }, [ammonias]);

  function updateAmmonias() {
    // range
    const range = { min: 0, max: 0.13 };
    const newAmmonias = ammonias.map((ammonia) => {
      let fluctuation;

      // Generate random fluctuation with higher probability near 0
      const random = Math.random();
      if (random < 0.85) {
        fluctuation = random * 0.03 * (Math.random() < 0.5 ? 1 : -1); // Generate random fluctuation within [0, 0.03]
      } else {
        fluctuation = random * (range.max - 0.03) + 0.03; // Generate random fluctuation within [0.03, 0.13]
      }

      return Math.min(range.max, Math.max(range.min, ammonia + fluctuation));
    });
    setAmmonias(newAmmonias);
  }
  return (
    <Card className={className} title="Dissolved Ammonia Levels">
      <LineChart
        data={{
          labels: [],
          datasets: [
            {
              data: ammonias,
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
          {ammonias[ammonias.length - 1].toFixed(4)} mg/L
        </Text>
        <Text
          className="text-base"
          style={{
            color: colors[colorscheme ?? "dark"][ammoniaReview.color],
            textShadowColor: colors[colorscheme ?? "dark"][ammoniaReview.color],
            textShadowRadius: 16,
          }}
        >
          {ammoniaReview.message}
        </Text>
      </View>
    </Card>
  );
}
