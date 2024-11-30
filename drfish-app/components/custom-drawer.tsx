import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "@/components/themed";
import { Image, Pressable, useColorScheme } from "react-native";
import colors from "@/constants/colors";
import { useAtom } from "jotai";
import authAtom from "@/atoms/auth";
import { MaterialIcons } from "@expo/vector-icons";

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const [auth, setAuth] = useAtom(authAtom);
  const colorscheme = useColorScheme();
  const name = auth.user?.name || "";
  const maxNameLength = 10;

  return (
    <View className="flex-1">
      <View
        className="pt-12 h-56"
        darkColor={colors.dark.tint}
        lightColor={colors.light.tint}
      >
        <Text className="text-center text-3xl font-semibold text-black">
          Dr. Fish
        </Text>

        <View className="flex flex-1 flex-row box-border w-full bg-transparent gap-4 p-2 items-center">
          <Image
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            className="h-20 aspect-square rounded-full"
          />

          <View className="bg-[#0003] p-2 rounded-lg w-[60%]">
            <Text className="text-2xl font-semibold text-black">
              {name.length > maxNameLength
                ? name.substring(0, maxNameLength) + "..."
                : name}
            </Text>
            <Text className="text-lg text-black">{auth.user?.role}</Text>
          </View>
        </View>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable
        className="p-4 flex flex-row items-center justify-center gap-2 active:bg-[#0003]"
        onPress={() => setAuth({ loggedIn: false, user: null })}
      >
        <MaterialIcons
          name="logout"
          size={24}
          color={colors[colorscheme ?? "dark"].red}
        />
        <Text
          className="text-center text-lg"
          darkColor={colors[colorscheme ?? "dark"].red}
          lightColor={colors[colorscheme ?? "light"].red}
        >
          Log Out
        </Text>
      </Pressable>
    </View>
  );
}
