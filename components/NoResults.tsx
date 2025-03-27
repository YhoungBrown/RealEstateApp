import { View, Text, Image } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View style={s`flex-1 items-center justify-center my-5`}>
      <Image source={images.noResult} style={s`w-40 h-40`} resizeMode='contain'/>
      <Text style={s`text-2xl font-bold text-black-300 mt-5`}>No Result</Text>
      <Text style={s`text-base text-black-100 mt-2`}>We could not find any results</Text>
    </View>
  )
}

export default NoResults