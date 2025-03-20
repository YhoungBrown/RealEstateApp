import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { s } from 'react-native-wind'
import icons from '@/constants/icons'
import images from '@/constants/images'
import SettingItem from '@/components/SettingItem'
import { settings } from '@/constants/data'
import { useGlobalContext } from '@/Lib/globalProvider'
import { logout } from '@/Lib/Appwrite'


const profile = () => {
  const {user, refetch} = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if(result) {
      Alert.alert('Success', 'You have been logged out successfully');
      refetch();
    } else {
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  return (
    <View style={s`bg-white h-full`}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={s`pb-32, px-7`}
      >
        <View style={s`flex-row justify-between items-center`}>
          <Text style={s`text-xl font-bold`}>Profile</Text>
          <Image source={icons.bell} style={{width: 25, height: 25}}/>
        </View>

        <View style={s`flex-row justify-center flex mt-5`}>
          <View style={s`flex-col items-center relative mt-5`}>
              <Image source={{uri : user?.avatar}} style={s`w-44 h-44 rounded-full`} />
              <TouchableOpacity style={{position: 'absolute', top: 140, right: 10}}>
                <Image source={icons.edit} style={s`w-8 h-8 `} />
              </TouchableOpacity>

              <Text style={s`text-lg font-bold mt-3`}>{user?.name}</Text>
          </View>
        </View>

        <View style={s`flex flex-col mt-5`}>
            <SettingItem title="My Bookings" icon={icons.calendar}/>
            <SettingItem title="Payment" icon={icons.wallet}/>
        </View>

        <View style={s`flex flex-col mt-1 border-primary-200 border-t pt-1`}> 
            {settings.slice(2).map((item, index) => (
              <SettingItem key={index} {...item}/>
            ))}
        </View>

        <View style={s`flex flex-col border-primary-200 border-t mt-1 pt-1`}> 
        <SettingItem icon={icons.logout} title='Logout' textStyle='text-danger' showArrow={false} onPress={handleLogout}/>
        </View>

        <View style={{marginBottom: 60}}/>
      </ScrollView>
    </View>
  )
}

export default profile