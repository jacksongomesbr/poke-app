import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { IconButton, PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <PaperProvider>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                title: "Explorador de Pokémons",
                headerRight: () => (
                  <Link href="/modal" asChild>
                    <IconButton
                      mode="contained-tonal"
                      icon="help"
                      size={20}
                    />
                  </Link>
                ),
              }}
            />
            <Stack.Screen
              name="detalhes/[slug]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{
                title:'Sobre',
                presentation: "modal",
              }}
            />
          </Stack>
        </PaperProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
