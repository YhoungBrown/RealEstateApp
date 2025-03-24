import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import { s } from 'react-native-wind';
import icons from '@/constants/icons';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {
    const path = usePathname();
    const param = useLocalSearchParams <{query ?: string}>();
    const [search, setSearch] = useState(param.query || '');



    const debouncedSearch = useDebouncedCallback(
      (text: string) => router.setParams({ query: text }), 
      500
    );


    const handleSearch = (text: string) => {
        setSearch(text);
        debouncedSearch(text);
    }
  return (
    <View style={s`flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border border-primary-100 mt-4 py-1`}>
      <View style={s`flex flex-1 flex-row items-center justify-start z-50`}>
        <Image source={icons.search} style={s`h-5 w-5`}/>
        <TextInput 
            value={search}
            onChangeText={handleSearch}
            placeholder='Search for anything'
            style={s`flex-1 ml-2 text-sm text-black-300`}
        />
      </View>

      <TouchableOpacity >
        <Image source={icons.filter} style={s`h-6 w-6`}/>
      </TouchableOpacity>
    </View>
  )
}

export default Search