import { Cards, FeaturedCards } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-wind";

export default function Index() {
  return (
    <SafeAreaView style={s`bg-white h-full mb-5`}>
      <ScrollView>
      <View style={s`px-5`}>
        <View style={s`flex flex-row items-center justify-between mt-5`}>
            <View style={s`flex flex-row items-center`}>
              <Image source={images.avatar} style={s`h-12 w-12 rounded-full`}/>
              <View style={s`flex flex-col items-start ml-2 justify-center`}>
                <Text style={s`text-xs text-black-100`}>Good Moring</Text>
                <Text style={s`text-base text-black-300`}>Adrian</Text>
              </View>
            </View>

            <Image source={icons.bell} style={s`h-6 w-6`}/>
        </View>
        <Search />

        <View style={s`my-3`}>
          <View style={s`flex flex-row items-center justify-between`}>
              <Text style={s`text-xl text-black 300`}>Featured</Text>
              <TouchableOpacity>
                <Text style={s`text-base font-bold text-primary-400`}>See All</Text>
              </TouchableOpacity>
          </View>
        </View>
        
          <FeaturedCards />
          <Cards />

          <View style={{marginBottom: 100}}/>
      </View>
      </ScrollView>
    </SafeAreaView> 
  );
}
