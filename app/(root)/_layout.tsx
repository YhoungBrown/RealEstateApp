import { useGlobalContext } from "@/Lib/globalProvider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-wind";



export default function AppLayout() {
    
 const {loading, isLoggedIn} = useGlobalContext();

 if (loading) return(
    <SafeAreaView style={s`bg-white h-full flex justify-center items-center`}>
        <ActivityIndicator color="#3b82f6" size="large" />
        <Text style={s`text-md text-center uppercase text-black-200 mt-3`}>
          Loading.....
        </Text>
    </SafeAreaView>
 );


if(!isLoggedIn) return <Redirect href={"/signIn"} />

return <Slot />
}