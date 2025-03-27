import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import { facilities } from "@/constants/data";

import { useAppwrite} from "@/Lib/useAppwrite";
import { gettingPropertyById} from "@/Lib/Appwrite";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";



import { s } from "react-native-wind";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  
  const { id } = useLocalSearchParams<{ id?: string }>();

  const windowHeight = Dimensions.get("window").height;

  const { data: property } = useAppwrite({
    fn: gettingPropertyById,
    params: {
      id: id!,
    },
  });

  console.log(property);

  return (
    <View style={{ flex: 1 , paddingTop: 0}}  >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={s`pb-32 bg-white`}
        
      >
        <View style={[s`relative w-full`,{ height: windowHeight / 2 }]}>
          <Image
            source={{ uri: property?.image }}
            style={s`h-full w-full`}
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            style={s`absolute top-0 w-full z-40`}
          />

          <View
            style={[s`z-50 absolute px-5`,{
              top: Platform.OS === "ios" ? 70 : 20,
            }]}
          >
            <View style={s`flex flex-row items-center w-full justify-between`}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={s`flex flex-row bg-white-200 rounded-full size-11 items-center justify-center`}
              >
                <Image source={icons.backArrow} style={s`h-7 w-7 `} />
              </TouchableOpacity>

              <View style={s`flex flex-row items-center`}>
                <Image
                  source={icons.heart}
                  style={s`h-7 w-7 mr-4`}
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} style={s`h-7 w-7`} />
              </View>
            </View>
          </View>
        </View>

        <View style={s`px-5 mt-7 flex gap-2`}>
          <Text style={s`text-2xl font-rubik-extrabold`}>
            {property?.name}
          </Text>

          <View style={s`flex flex-row items-center`}>
            <View style={s`flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full mr-1`}>
              <Text style={s`text-xs font-rubik-bold text-primary-400`}>
                {property?.type}
              </Text>
            </View>

            <View style={s`flex flex-row items-center`}>
              <Image source={icons.star} style={s`w-5 h-5 mr-1`} />
              <Text style={s`text-black-200 text-sm mt-1 font-rubik-medium`}>
                {property?.rating} ({property?.reviews.length} reviews)
              </Text>
            </View>
          </View>

          <View style={s`flex flex-row items-center mt-5`}>
            <View style={s`flex flex-row items-center justify-center bg-primary-100 rounded-full size-10`}>
              <Image source={icons.bed} style={s`w-4 h-4`} />
            </View>
            <Text style={s`text-black-300 text-sm font-rubik-medium ml-2`}>
              {property?.bedrooms} Beds
            </Text>
            <View style={s`flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7`}>
              <Image source={icons.bath} style={s`w-4 h-4`} />
            </View>
            <Text style={s`text-black-300 text-sm font-rubik-medium ml-2`}>
              {property?.bathrooms} Baths
            </Text>
            <View style={s`flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7`}>
              <Image source={icons.area} style={s`w-4 h-4`} />
            </View>
            <Text style={s`text-black-300 text-sm font-rubik-medium ml-2`}>
              {property?.area} sqft
            </Text>
          </View>

          <View style={s`w-full border-t border-primary-200 pt-7 mt-5`}>
            <Text style={s`text-black-300 text-xl font-rubik-bold`}>
              Agent
            </Text>

            <View style={s`flex flex-row items-center justify-between mt-4`}>
              <View style={s`flex flex-row items-center`}>
                <Image
                  source={{ uri: property?.agent.avatar }}
                  style={s`w-14 h-14 rounded-full`}/>

                <View style={s`flex flex-col items-start justify-center ml-3`}>
                  <Text style={s`text-lg text-black-300 text-start font-rubik-bold`}>
                    {property?.agent.name}
                  </Text>
                  <Text style={s`text-sm text-black-200 text-start font-rubik-medium`}>
                    {property?.agent.email}
                  </Text>
                </View>
              </View>

              <View style={s`flex flex-row items-center gap-3`}>
                <Image source={icons.chat} style={s`w-7 h-7`} />
                <Image source={icons.phone} style={s`w-7 h-7`} />
              </View>
            </View>
          </View>

          <View style={s`mt-7`}>
            <Text style={s`text-black-300 text-xl font-rubik-bold`}>
              Overview
            </Text>
            <Text style={s`text-black-200 text-base font-rubik mt-2`}>
              {property?.description}
            </Text>
          </View>

          <View style={s`mt-7`}>
            <Text style={s`text-black-300 text-xl font-rubik-bold`}>
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View style={s`flex flex-row flex-wrap items-start justify-start mt-2 p-5 border border-primary-400`}>
                {property?.facilities.map((item: string, index: number) => {
                  const facility = facilities.find(
                    (facility) => facility.title === item
                  );

                  return (
                    <View
                      key={index}
                      style={s`flex flex-1 flex-col items-center min-w-16 max-w-20`}
                    >
                      <View style={s`size-14 bg-primary-100 rounded-full flex items-center justify-center`}>
                        <Image
                          source={facility ? facility.icon : icons.info}
                          style={s`w-6 h-6`}
                        />
                      </View>

                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={s`text-black-300 text-sm text-center font-rubik mt-1.5`}
                      >
                        {item}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          {property?.gallery.length > 0 && (
            <View style={s`mt-7`}>
              <Text style={s`text-black-300 text-xl font-rubik-bold`}>
                Gallery
              </Text>
              <FlatList
                contentContainerStyle={[s`flex mt-3`,{ paddingRight: 20 }]}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item.image }}
                    style={s`h-40 w-40 rounded-xl`}
                  />
                )}
              />
            </View>
          )}

          <View style={s`mt-7`}>
            <Text style={s`text-black-300 text-xl font-rubik-bold`}>
              Location
            </Text>
            <View style={s`flex flex-row items-center justify-start mt-4 gap-2`}>
              <Image source={icons.location} style={s`w-7 h-7`} />
              <Text style={s`text-black-200 text-sm font-rubik-medium`}>
                {property?.address}
              </Text>
            </View>

            <Image
              source={images.map}
              style={s`h-52 w-full mt-5 rounded-xl`}
            />
          </View>

          {property?.reviews.length > 0 && (
            <View style={s`mt-7`}>
              <View style={s`flex flex-row items-center justify-between`}>
                <View style={s`flex flex-row items-center`}>
                  <Image source={icons.star} style={s`w-6 h-6`} />
                  <Text style={s`text-black-300 text-xl font-rubik-bold ml-2`}>
                    {property?.rating} ({property?.reviews.length} reviews)
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text style={s`text-primary-300 text-base font-rubik-bold`}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={s`mt-5`}>
                <Comment item={property?.reviews[0]} />
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={s`absolute bg-white bottom-0 w-full rounded-2xl border-t border-r border-l border-primary-400 p-7`}>
        <View style={s`flex flex-row items-center justify-between `}>
          <View style={s`flex flex-col items-start`}>
            <Text style={s`text-black-200 text-xs font-medium`}>
              Price
            </Text>
            <Text
              numberOfLines={1}
              style={s`text-primary-400 text-start text-2xl font-bold`}
            >
              ${property?.price}
            </Text>
          </View>

          <TouchableOpacity style={s`flex-1 flex flex-row items-center justify-center bg-primary-400 py-3 rounded-full ml-6`}>
            <Text style={s`text-white text-lg text-center font-bold`}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Property;
