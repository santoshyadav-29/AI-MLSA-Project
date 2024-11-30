import authAtom from "@/atoms/auth";
import Login from "@/components/login";
import { useAtom } from "jotai";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import colors from "@/constants/colors";
import { useColorScheme } from "react-native";
import CustomDrawer from "@/components/custom-drawer";
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  const [auth, _setAuth] = useAtom(authAtom);

  const colorScheme = useColorScheme();

  if (!auth.loggedIn) {
    return <Login />;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawer {...props} />}
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors[colorScheme ?? "dark"].tint,
            },
            drawerStyle: {
              backgroundColor: colors[colorScheme ?? "dark"].background,
            },
            drawerActiveBackgroundColor:
              colors[colorScheme ?? "dark"].backgroundSecondary,
            drawerInactiveTintColor: colors[colorScheme ?? "dark"].text,
            drawerActiveTintColor: colors[colorScheme ?? "dark"].text,
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="detail"
            options={{
              drawerLabel: "Details",
              title: "Details",
            }}
          />
          <Drawer.Screen
            name="test"
            options={{
              drawerLabel: "Test",
              title: "Test",
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <StatusBar style="auto" />
    </>
  );
}
