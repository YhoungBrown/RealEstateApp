import icons from '@/constants/icons';
import images from '@/constants/images';
import { logIn } from '@/Lib/Appwrite';
import { useGlobalContext } from '@/Lib/globalProvider';
import { Redirect } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { s } from "react-native-wind";



const signIn = () => {

  const {refetch, loading, isLoggedIn} = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />

  const handleLogIn = async () => {
    const result = await logIn();

    if(result) {
      refetch();
    } else {
      Alert.alert("Error", "Failed to login")
    }
  }


  return (
    <SafeAreaView style={s`bg-white h-full`}>
      <ScrollView >
          <View style={{marginTop: -260}}>
              <Image 
                source={images.onboarding} 
                style={s`w-full flex-1`} 
                resizeMode="contain"  
              />

              <View style={[s`px-10`, {marginTop: -300}]}>
                  <Text style={[s`text-xs text-center uppercase text-black-200`, { fontFamily:    "Rubik-Regular" }]}>
                    Welcome to your home of Real Estate 
                  </Text>

                  <Text style={s`text-2xl text-center text-black-300 font-bold mt-1`}>
                    Let's Get You Closer To {"\n"}
                    <Text style={s`text-primary-400`}>Your Ideal Home</Text>
                  </Text>

                  <Text style={[s`text-md text-black-200 text-center mt-6`, {fontFamily: "Rubik-Regular"}]}>Sign In WIth Google</Text>

                  <TouchableOpacity style={s`bg-primary-400 shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 flex-row justify-center align-center space-around-3`} onPress={handleLogIn}>
                      <Image 
                        source={icons.google}  
                        style={s`w-6 h-6 ml-4`} 
                        resizeMode='contain'
                      />
                      <Text style={s`text-white text-center text-md font-bold pl-3`}>
                        Continue with Google
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default signIn