import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import icons from '@/constants/icons'
import { resizeMode } from 'react-native-wind/dist/styles/layout/resize-mode'
import { s } from 'react-native-wind'



const TabIcon = ({focused, icon, title} : {focused: boolean, icon: any, title: string}) => {
    
    return (
        <View style={[s`flex-col items-center justify-center`, {marginBottom: -25}]}>
            <Image 
                source={icon} 
                resizeMode="contain"  
                style={[
                    { width: 24, height: 24, tintColor: focused ? "#0061FF" : "#666876" } 
                ]}
            />
            <Text style={[
                focused ? s`text-primary-400` : s`text-black-200`, 
                s`font-bold text-xs text-center w-16` 
                ]}
            >
                {title}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#fff',
                position: 'absolute',
                borderTopColor: "#0061FF1A",
                borderTopWidth: 1,
                minHeight: 60,
                
            },
        }}
    >
        <Tabs.Screen 
            name="index" 
            options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} title="Home" focused={focused} />
                )
            }}  
            
        />
        <Tabs.Screen 
            name="explore" 
            options={{
                title: "Explore",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.search} title="Explore" focused={focused} />
                )
            }}  
        />
        <Tabs.Screen 
            name="profile" 
            options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.person} title="Profile" focused={focused} />
                )
            }}  
        />
        
    </Tabs>
  )
}

export default TabsLayout