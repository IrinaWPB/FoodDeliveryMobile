import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setRestaurant, selectRestaurant } from '../slices/restaurantSlice'
import { emptyBasket } from '../slices/basketSlice'

const ReastaurantCard = ({restaurant}) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const currentRestaurant = useSelector(selectRestaurant)

  const handleOnPressCard = () => {
    if (currentRestaurant !== restaurant) {
      dispatch(emptyBasket())
      dispatch(setRestaurant(restaurant))
    }
    navigation.navigate("Restaurant")
  }
  return (
    <TouchableOpacity className="m-1 bg-white" onPress={handleOnPressCard}>
      <Image source={{uri : urlFor(restaurant.image).url()}} className="h-36 w-66 rounded"/>
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{restaurant.name} </Text>
        <View className="flex-row space-x-1 items-center">
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
    </TouchableOpacity>
  )
}

export default ReastaurantCard