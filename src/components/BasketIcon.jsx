import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectBasketItems, selectBasketTotal } from '../slices/basketSlice'

const BasketIcon = () => {	

	const items = useSelector(selectBasketItems)
	const basketTotal = useSelector(selectBasketTotal)
	const navigation = useNavigation()

	if (items.length == 0) return null 

  return (
    <View className="absolute bottom-10 w-full z-30 ">
			<TouchableOpacity className='flex-row items-center p-4 bg-gray-400 rounded-lg space-x-1 mx-5'
			                  onPress={() => navigation.navigate('Basket')}>
				<Text className='font-bold text-white text-xl bg-gray-600 py-1 px-3'>{items.length}</Text>
				<Text className='flex-1 text-white font-bold text-lg text-center'>View Basket</Text>
				<Text className='text-white text-xl'>${basketTotal.toFixed(2)}</Text>
			</TouchableOpacity>
      
    </View>
  )
}

export default BasketIcon