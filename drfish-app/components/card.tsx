import { useColorScheme } from "react-native";
import { View } from "./themed";
import colors from "@/constants/colors";
import { twMerge } from "tailwind-merge";
import { Text } from "./themed";

export default function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title?: string;
  children: React.ReactNode;
}) {
  const colorscheme = useColorScheme();

  return (
    <View className="p-4 w-full">
      <View
        className={twMerge(
          "flex justify-center items-center gap-2 h-fit w-full rounded-lg shadow py-2",
          className,
        )}
        style={{
          backgroundColor: colors[colorscheme ?? "dark"].backgroundSecondary,
        }}
      >
        {title && (
          <Text
            className="text-2xl font-semibold pb-4"
            style={{ color: colors[colorscheme ?? "dark"].blue }}
          >
            {title}
          </Text>
        )}
        {children}
      </View>
    </View>
  );
}
