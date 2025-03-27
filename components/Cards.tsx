import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import { s } from 'react-native-wind';
import icons from '@/constants/icons';
import { Models } from 'react-native-appwrite';

interface Props {
    item: Models.Document;
    onPress?: () => void;
}

export const FeaturedCards = ({ item: {image, rating, name, address, price} , onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={[s`flex flex-col items-start w-60 h-80 relative mt-2`, {marginBottom: -75, marginRight: -20,}]}>
            {/* Property Image */}
            <Image source={{uri: image}} style={[s`h-60 rounded-2xl`, {width: "85%"}]} />
            <Image source={images.cardGradient} style={[s`h-60 absolute bottom-30 rounded-2xl`, {width: "85%"}]} />

            {/* Star Rating */}
            <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5`, { position: 'absolute', top: 15, right: 45, zIndex: 2 }]}>
                <Image source={icons.star} style={s`w-3 h-3`} />
                <Text style={s`text-xs font-bold font-primary-300 ml-1`}>{rating}</Text>
            </View>

            {/* Property Details */}
            <View style={s`absolute bottom-20 left-4 w-full pr-2 mb-2`}>
                <Text style={s`text-xl text-white font-bold`} numberOfLines={1}>{name}</Text>
                <Text style={s`text-xs text-white opacity-80`}>{address}</Text>

                {/* Price and Heart */}
                <View style={s`flex flex-row items-center justify-between w-full mt-2`}>
                    <Text style={s`text-white text-xl font-bold pl-0.5`}>${price}</Text>
                    <Image source={icons.heart} style={[s`w-5 h-5`, {position: 'absolute', top: 5, right: 65}]} tintColor={"white"} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Cards =  ({ item: {image, rating, name, address, price} , onPress }: Props) => {
    return (
        <ScrollView style={[s`bg-white shadow-md shadow-black-400 mx-1.5`,{marginTop: -50, marginBottom: 65}]}>
        <TouchableOpacity onPress={onPress} style={s`sflex-1 rounded-lg bg-white shadow-md shadow-black-400 border-r/2 border-l/2 border-b/2 border-black relative w-full `}>

            {/* Star Rating */}
            <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5`, { position: 'absolute', top: 10, right: 9, zIndex: 2 }]}>
                <Image source={icons.star} style={s`w-3 h-3`} />
                <Text style={s`text-xs font-bold font-primary-300 ml-1`}>4.4</Text>
            </View>

            {/* Property Image */}
            <Image source={{uri: image}} style={s`w-full h-40 rounded-lg`} />

            {/* Property Details */}
            <View style={s`flex flex-col mt-2 border-b border-r border-black p-1.5`}>
                <Text style={s`text-base text-black-100 font-bold`}>{name}</Text>
                <Text style={s`text-xs text-black-200`}>{address}</Text>

                {/* Price and Heart */}
                <View style={s`flex flex-row justify-between mt-2 items-center`}>
                    <Text style={s`text-xl font-bold text-primary-400`}>${price}</Text>
                    <Image source={icons.heart} style={s`w-5 h-5`} tintColor={"#191d31"} />
                </View>
            </View>
        </TouchableOpacity>       
        </ScrollView>
    )
}
