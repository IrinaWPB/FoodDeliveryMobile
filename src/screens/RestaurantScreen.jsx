import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../../sanity'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { StarIcon, MapPinIcon, QuestionMarkCircleIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { selectRestaurant, setRestaurant } from '../slices/restaurantSlice'
import { useSelector } from 'react-redux'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
 
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View>
          <Image source={{ uri: urlFor(restaurant.image).url() }} className='w-full h-64 bg-grey-300 p-4'/>
          <TouchableOpacity className='absolute top-10 left-5 p-2 bg-gray-100 rounded-full'
                            onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color='gray' />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{restaurant.name}</Text>
            <View className="flex-row items-center space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" opacity={0.5} size={20}/>
                <Text className="text-gray-400">
                  <Text className="text-green-600 text-xs">{restaurant.Rating}</Text> - {restaurant.type?.name} 
                </Text>
              </View>
              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="gray" size={20} opacity={0.5}/>
                <Text className="text-xs text-gray-400">Nearby - {restaurant.address}</Text>
              </View>
            </View>

            <Text className="text-gray-500 mt-2 pb-4">{restaurant.short_description}</Text>
          </View>
          
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
            <QuestionMarkCircleIcon color='gray'  opacity={0.6} size={20} />
            <Text className="pl-2 flex-1 text-md font-bold">Have a food allergy?</Text>
            <ChevronRightIcon color='gray'/>
          </TouchableOpacity>
        </View>
        
        <View className='pb-36'>
          <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>
          {restaurant.dishes.map((dish => (
            <DishRow key={dish._id+dish.name} dish={dish} id={dish._id}/>
          )))}
        </View>

      </ScrollView>
    </>
    
  )
}

export default RestaurantScreen