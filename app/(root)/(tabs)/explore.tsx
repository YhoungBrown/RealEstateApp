import { Cards, FeaturedCards } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/Lib/Appwrite";
import { useGlobalContext } from "@/Lib/globalProvider";
import seed from "@/Lib/seed";
import { useAppwrite } from "@/Lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-wind";



export default function Explore() {

  const params = useLocalSearchParams<{query? : string, filter?: string}>();

 
  const {data: Properties, refetch, loading} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6
    }, 
    skip: true
  });

  const handleCardPress = (id: string) => 
    router.push({ pathname: "/properties/[id]", params: { id } });
  

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!,
      limit: 20
    })
  }, [params.filter, params.query])

  return (
    <SafeAreaView style={s`bg-white h-full mb-5`}>
      <FlatList 
        data={Properties}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerStyle={s`pb-32`}
        columnWrapperStyle={s`flex px-2 gap-5`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" style={s`text-primary-300 mt-5`}/> 
          ) : (<NoResults/>)
        }
        renderItem={({item}) => (
          <Cards item={item} onPress={() => handleCardPress(item.$id)}/>
        )}
        ListHeaderComponent={
          <View style={s`px-5`}>

            <View style={s`flex flex-row items-center justify-between mt-5`}>
              <TouchableOpacity onPress={() => router.back()} style={s`flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center`}>
                  <Image source={icons.backArrow} style={s`w-6 h-6 p-3`}/>
              </TouchableOpacity>

              <Text style={s`text-base mr-2 text-center font-medium text-black-300`}>
                Search For Your Ideal Home
              </Text>

              <Image source={icons.bell} style={s`w-6 h-6`}/>
            </View>

            <Search />

            <View style={s`mt-5`}>
              <Text style={s`text-xl font-bold text-black-300`}>Found {Properties?.length} Properties</Text>

            </View>
          <View/>
          
          <Filters />
      </View>}
      />
    </SafeAreaView> 
  );
}
