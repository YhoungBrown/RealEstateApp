// import { View, Text, TouchableOpacity, Image } from 'react-native'
// import React from 'react'
// import images from '@/constants/images';
// import { s } from 'react-native-wind';
// import icons from '@/constants/icons';

// interface Props {
//     onPress?: () => void;
// }

// export const FeaturedCards = ({onPress}: Props) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={s`flex flex-col item-start w-60 h-80 relative`}>
//         <Image source={images.japan} style={s`w-40 h-60 rounded-2xl`}/>
//         <Image source={images.cardGradient} style={s`w-40 h-60 absolute bottom-15 rounded-2xl`}/>

//         <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5`, {position: 'absolute', top: 5, right: 5}]}>
//             <Image source={icons.star} style={s`w-3 h-3`}/>
//             <Text style={s`text-xs font-bold font-primary-300 ml-1`}>4.4</Text>
//         </View>

//         <View style={[s`flex flex-col items-start absolute bottom-20 px-2`, {}]}>
//             <Text style={s`text-md text-white font-bold`} numberOfLines={1}>Mordern Apartment</Text>
//             <Text style={s`text-base text-white text-xs`}>22 W 15th street New York</Text>

//             <View style={[s`flex flex-row items-center mt-2 justify-between w-full`, {marginLeft: -15}]}>
//                 <Text style={s`text-white text-base font-bold text-xl`}>
//                     $2500
//                 </Text>
//                 <Image source={icons.heart} style={s`w-5 h-5`}/>
//             </View>
//         </View>
//     </TouchableOpacity>
//   )
// }

// export const Cards = ({onPress}: Props) => {
//     return (
//         <TouchableOpacity onPress={onPress} style={s`flex-1 w-full mt-4 px-3 py-3 rounded-lg bg-white shadow-md shadow-black-400 relative`}>

//         <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5 m-4`, {position: 'absolute', top: 5, right: 5, zIndex: 1}]}>
//             <Image source={icons.star} style={s`w-2 h-2`}/>
//             <Text style={s`text-xs font-bold font-primary-300 ml-0.5`}>4.4</Text>
//         </View>

//         <Image source={images.newYork} style={s`w-full h-40 rounded-lg`}/>

//             <View style={s`flex flex-col mt-2`}>
//                 <Text style={s`text-base text-black-100 font-bold`}>Cozy Studio</Text>
//                 <Text style={s`text-base text-black-200 text-xs`}>22 W 15th street New York, NY 10011</Text>

//                 <View style={[s`flex flex-row items-center mt-2 justify-between px-50`, {zIndex: 1}]}>
//                     <Text style={[ {marginLeft: 10, paddingLeft: 10}]}>
//                     $2500
//                     </Text>
//                     <Image source={icons.heart} style={s`w-5 h-5`} tintColor={"#191d31"}/>
//                     <Text style={s`text-black-200`}>Hellow</Text>
//                 </View>
//             </View>

//             <View style={{marginBottom: 8}}/>
//         </TouchableOpacity >
//     )
// }


import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import images from '@/constants/images';
import { s } from 'react-native-wind';
import icons from '@/constants/icons';

interface Props {
    onPress?: () => void;
}

export const FeaturedCards = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={s`flex flex-col items-start w-60 h-80 relative`}>
            {/* Property Image */}
            <Image source={images.japan} style={[s`h-60 rounded-2xl`, {width: "85%"}]} />
            <Image source={images.cardGradient} style={[s`h-60 absolute bottom-30 rounded-2xl`, {width: "85%"}]} />

            {/* Star Rating */}
            <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5`, { position: 'absolute', top: 15, right: 45, zIndex: 2 }]}>
                <Image source={icons.star} style={s`w-3 h-3`} />
                <Text style={s`text-xs font-bold font-primary-300 ml-1`}>4.4</Text>
            </View>

            {/* Property Details */}
            <View style={s`absolute bottom-20 left-4 w-full pr-2 mb-2`}>
                <Text style={s`text-xl text-white font-bold`} numberOfLines={1}>Modern Apartment</Text>
                <Text style={s`text-xs text-white opacity-80`}>22 W 15th street New York</Text>

                {/* Price and Heart */}
                <View style={s`flex flex-row items-center justify-between w-full mt-2`}>
                    <Text style={s`text-white text-xl font-bold pl-0.5`}>$2500</Text>
                    <Image source={icons.heart} style={[s`w-5 h-5`, {position: 'absolute', top: 5, right: 65}]} tintColor={"white"} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export const Cards = ({ onPress }: Props) => {
    return (
        <ScrollView style={[s`bg-white shadow-md shadow-black-400`,{marginTop: -50}]}>
        <TouchableOpacity onPress={onPress} style={[s`flex-1 rounded-lg bg-white shadow-md shadow-black-400 border-r/2 border-l/2 border-b/2 border-black relative `, {width: "50%"}]}>

            {/* Star Rating */}
            <View style={[s`flex flex-row items-center bg-white rounded-full px-3 py-1.5`, { position: 'absolute', top: 10, right: 9, zIndex: 2 }]}>
                <Image source={icons.star} style={s`w-3 h-3`} />
                <Text style={s`text-xs font-bold font-primary-300 ml-1`}>4.4</Text>
            </View>

            {/* Property Image */}
            <Image source={images.newYork} style={s`w-full h-40 rounded-lg`} />

            {/* Property Details */}
            <View style={s`flex flex-col mt-2 border-b border-r border-black p-1.5`}>
                <Text style={s`text-base text-black-100 font-bold`}>Cozy Studio</Text>
                <Text style={s`text-xs text-black-200`}>22 W 15th street New York, NY 10011</Text>

                {/* Price and Heart */}
                <View style={s`flex flex-row justify-between mt-2 items-center`}>
                    <Text style={s`text-xl font-bold text-primary-400`}>$25000</Text>
                    <Image source={icons.heart} style={s`w-5 h-5`} tintColor={"#191d31"} />
                </View>
            </View>
        </TouchableOpacity>       
        </ScrollView>
    )
}
