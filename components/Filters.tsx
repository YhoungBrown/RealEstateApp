import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { s } from 'react-native-wind';
import { categories } from '@/constants/data';

const Filters = () => {
    const params = useLocalSearchParams<{filter ? : string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || 'All');

    const handleCategoryChange = (category: string) => {
      if (selectedCategory === category) {
        setSelectedCategory('All');
        router.setParams({ filter: 'All' });
        return;
      }

      setSelectedCategory(category);
      router.setParams({ filter: category });
    }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[s`mt-3`, {marginBottom: 65}]}>
        {categories.map((item, index) => (
            <TouchableOpacity 
            onPress={() => handleCategoryChange(item.category)}
            key={index} 
            style={[s`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${selectedCategory === item.category ? 'bg-primary-400' : 'bg-primary-100 border border-primary-200'}`]}
            >
                <Text style={s`text-sm ${selectedCategory === item.category ? "text-white font-bold mt-0.5" : "text-black-300"}`}>{item.title}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
  )
}

export default Filters