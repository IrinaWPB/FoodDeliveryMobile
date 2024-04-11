import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const CategoryCard = ({title, imgUrl}) => {
  return (
    <TouchableOpacity className="h-20 w-20 m-1">
      <Image source={{uri : imgUrl}} className="h-20 w-20 rounded"/>
      <Text className="text-white p-0.5 font-bold bg-gray-500 z-20 absolute top-1 rounded">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard