import { Link } from "expo-router";
import { Text, View } from "react-native";
import { s } from "react-native-wind";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Text style={s`font-bold text-lg my-10 `}>Welcome to my Real Estate App</Text>
      <Link href="/signIn"> Sign In</Link>
      <Link href="/explore"> Explore</Link>
      <Link href="/profile"> Profile</Link>
      <Link href="/property/1"> Property</Link>
    </View> 
  );
}
