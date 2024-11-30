import colors from "@/constants/colors";
import { Text } from "./themed";
import Card from "./card";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { temperatureAtom } from "@/atoms/water-parameters";

export default function Temperature() {
  const colorscheme = useColorScheme();
  const [temperature, setTemperature] = useAtom(temperatureAtom);
  const [tempReview, setTempReview] = useState<Review>({
    color: "green",
    message: "Temperature is normal",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      updateTemperature();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Number(temperature) > 20) {
      setTempReview({ color: "red", message: "Temperature is too high" });
    } else if (Number(temperature) < 10) {
      setTempReview({ color: "blue", message: "Temperature is too low" });
    } else {
      setTempReview({ color: "green", message: "Temperature is normal" });
    }
  }, [temperature]);

  function updateTemperature() {
    // range
    const range = { min: 4, max: 25 };

    // Base temperature
    const baseTemperature = (range.max - range.min) / 2 + range.min;
    const fluctuation = Math.random() * 2 - 1; // Generate random fluctuation within [-1, 1]

    // Add fluctuation to base temperature
    const temperature = baseTemperature + fluctuation;
    setTemperature(
      Math.min(range.max, Math.max(range.min, temperature)).toFixed(2),
    );
  }

  return (
    <Card title="Temperature">
      <Text className="text-5xl font-bold">{temperature}°C</Text>
      <Text
        className="text-base"
        style={{
          color: colors[colorscheme ?? "dark"][tempReview.color],
          textShadowColor: colors[colorscheme ?? "dark"][tempReview.color],
          textShadowRadius: 16,
        }}
      >
        {tempReview.message}
      </Text>
    </Card>
  );
}
