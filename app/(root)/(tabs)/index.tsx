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



export default function Index() {

  const {user} = useGlobalContext();
  const params = useLocalSearchParams<{query? : string, filter?: string}>();

  const {data : LatestProperties, loading: LatestPropertiesLoading} = useAppwrite({
    fn: getLatestProperties
  });

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
      limit: 6
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
            <View style={s`flex flex-row items-center`}>
              <Image source={{uri: user?.avatar}} style={s`h-12 w-12 rounded-full`}/>
              <View style={s`flex flex-col items-start ml-2 justify-center`}>
                <Text style={s`text-xs text-black-100`}>Good Moring</Text>
                <Text style={s`text-base text-black-300`}>{user?.name}</Text>
              </View>
            </View>

            <Image source={icons.bell} style={s`h-6 w-6`}/>
        </View>
        <Search />

        <View style={s`my-3`}>
          <View style={s`flex flex-row items-center justify-between`}>
              <Text style={s`text-xl text-black-300 font-bold`}>Featured</Text>
              <TouchableOpacity>
                <Text style={s`text-base font-bold text-primary-400`}>See All</Text>
              </TouchableOpacity>
          </View>

          {LatestPropertiesLoading ? (
            <ActivityIndicator size="large" style={s`text-primary-300`}/>
          ) : !LatestProperties || LatestProperties.length === 0 ? (<NoResults />) : (

          <FlatList 
            data={LatestProperties}
            keyExtractor={(item) => item.$id}
            renderItem={({item}) => (
              <FeaturedCards item={item} onPress={() => handleCardPress(item.$id)}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s`mt-1.5`}
          />
          )}
          
        </View>
        
          <View style={s`flex flex-row items-center justify-between`}>
              <Text style={s`text-xl text-black 300 font-bold`}>Our Recomendations</Text>
              <TouchableOpacity>
                <Text style={s`text-base font-bold text-primary-400`}>See All</Text>
              </TouchableOpacity>
          </View>

          <Filters />
          
      </View>}
      />
    </SafeAreaView> 
  );
}
