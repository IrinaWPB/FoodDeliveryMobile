import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { selectRestaurant } from '../slices/restaurantSlice'
import { useSelector } from 'react-redux'
import * as Progress from 'react-native-progress'
import MapView, { Marker } from 'react-native-maps'

const DeliveryScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)

  return (
    <View className='bg-[#00ccbb88] flex-1'>
      <SafeAreaView className='z-50'>
        <View className='flex-row justify-between items-center p-5'>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XCircleIcon color="white" size={40}/>
          </TouchableOpacity>
          <Text className='text-lg text-gray-100'>Order Help</Text>
        </View>
        <View className='bg-white rounded-lg mx-5 my-2 p-6 z-50 shadow-lg'>
          <View className='flex-row justify-between'>
            <View>
              <Text className='text-lg text-gray-400'>Estimated Time</Text>
              <Text className='text-3xl font-bold text-gray-800'>45-50 Minutes</Text>
            </View>
            <Image source={require('../../assets/delivery.gif')} className='w-20 h-20' />
          </View>
          <Progress.Bar size={35} color='gray' indeterminate={true}/>
          <Text className='mt-3  text-gray-400'>Your order at {restaurant.name} is being prepared</Text>
        </View>
      </SafeAreaView>

      <MapView initialRegion={{
                  latitude: restaurant.lat,
                  longitude: restaurant.long,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005}}
                className='flex-1 -mt-20 z-0'
                mapType='mutedStandard'>
        <Marker coordinate={{
                  latitude: restaurant.lat,
                  longitude: restaurant.long,
                }}
                title={restaurant.name}
                description={restaurant.short_description}
                identifier='origin'
                pinColor='gray'/>
      </MapView>

      <SafeAreaView className='flex-row items-center space-x-5 h-28 bg-white'>
        <Image source={require('../../assets/logo.png')} 
               className='h-12 w-12 rounded-full ml-5 bg-gray-200'/> 
        <View className='flex-1'>
          <Text className='text-lg'>John Doe</Text>
          <Text className='text-gray-400'>Your Delivery Driver</Text>
        </View>
        <Text className='font-bold mr-5 text-xl text-gray-500'>Call</Text>
      </SafeAreaView>

    </View>
  )
}


export default DeliveryScreen