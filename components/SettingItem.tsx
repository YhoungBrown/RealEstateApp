import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { s } from 'react-native-wind'



interface settingsItemProps {
  title: string
  icon: ImageSourcePropType
  onPress?: () => void
  textStyle?: string
  showArrow?: boolean
}


const SettingItem = ({title, icon, onPress, textStyle, showArrow = true }: settingsItemProps) => {
  return (
    <TouchableOpacity style={s`flex flex-row justify-between items-center py-3`} onPress={onPress}>
      <View style={s`flex flex-row items-center gap-3`}>
        <Image source={icon} style={s`w-5 h-5 mr-3`}/>
        <Text style={[s`text-lg text-black-300`, {textStyle}]}>{title}</Text>
      </View>

      {showArrow && <Image source={icons.rightArrow} style={s`w-4 h-4`}/>}
    </TouchableOpacity>
  )
}

export default SettingItem