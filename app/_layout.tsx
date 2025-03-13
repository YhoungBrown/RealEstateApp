import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import "../wind.config"
import GlobalProvider from "@/Lib/globalProvider";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"), 
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"), 
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"), 
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"), 
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"), 
    "Rubik-SemiBBold": require("../assets/fonts/Rubik-SemiBold.ttf"), 
  });

  useEffect(() => {
    if (fontsLoaded){
      console.log("Fonts Loaded:", fontsLoaded);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null; // Prevent rendering until fonts load

  return (
    <GlobalProvider>
      <Stack screenOptions={{headerShown: false}}/>
    </GlobalProvider>
  )
}
