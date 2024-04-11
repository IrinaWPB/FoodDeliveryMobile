import { View, Text, SafeAreaView, Touchable, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { selectRestaurant } from '../slices/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../../sanity'

const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)
  const dispatch = useDispatch()
  const [groupedItems, setGroupedItems] = useState([])

  useMemo(() => {
    const groups = items.reduce((results, item) => {
      (results[item._id] = results[item._id] || []).push(item)
      return results
    }, {})
    setGroupedItems(groups)
  }, [items])

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-gray-300 shadow-xl bg-white'>
          <View>
            <Text className="text-lg text-center font-bold mt-1">Basket</Text>
            <Text className="text-lg text-center text-gray-600">{restaurant.name}</Text>
          </View>

          <TouchableOpacity onPress={navigation.goBack}
                            className="absolute top-5 right-5">
            <XCircleIcon color='gray' size={50} />
          </TouchableOpacity>
        </View>

        <View className='flex-row items-center space-x-3 bg-white my-5 p-4'>
          <Image source={require('../../assets/logo.png')} className='h-10 w-10 rounded-full'/>
          <Text className="flex-1">Deliver in 45 mins</Text>
          <TouchableOpacity>
            <Text className='text-gray-400'>Change</Text>
          </TouchableOpacity>
        </View>
        
        {items.length > 0 ? (
        <ScrollView className='divide-y divide-gray-100'>
          {Object.entries(groupedItems).map(([key, items]) => (
            <View key={key} className='flex-row py-2 px-5 space-x-2 bg-white items-center'>
              <Text className='font-bold'>
                {items.length} x
              </Text>
              <Image source={{uri: urlFor(items[0]?.image).url()}} 
                     className='h-14 w-14 rounded-full'/>
              <Text className='flex-1 font-bold'>{items[0]?.name}</Text>
              <Text className='text-gray-700'>${items[0]?.price.toFixed(2)}</Text>
              <TouchableOpacity>
                <Text className='text-gray-400' onPress={() => dispatch(removeFromBasket(key))}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView> ) : (
          <View>
            <Text className='text-center'>Your basket is empty</Text>
          </View>
        )}
        
        <View className='p-5 bg-white mt-5 space-y-4'>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Subtotal</Text>
            <Text className='text-gray-400'>${basketTotal.toFixed(2)}</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-400'>Delivery Fee</Text>
            <Text className='text-gray-400'>$5.00</Text>
          </View>
          <View className='flex-row justify-between'>
            <Text className='text-gray-800 font-bold'>Total</Text>
            <Text className='text-gray-800 font-extrabold'>${(basketTotal + 5).toFixed(2)}</Text>
          </View>

          <TouchableOpacity className='rounded-lg bg-gray-400 p-4'
                            onPress={() => navigation.navigate('Preparing Order')}>
            <Text className='text-lg font-bold text-center text-white'>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>


      </View>  
    </SafeAreaView>
  )
}

export default BasketScreen