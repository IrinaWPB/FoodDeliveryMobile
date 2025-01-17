import {SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress'
import {useNavigation} from '@react-navigation/native'

const PreparingOrderScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery")
    }, 5000)
  }, [])
  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Image 
        source={require('../../assets/order.gif')}
        animation="slideInUp"
        iterationCount={1}
        className='h-96 w-96'/>
      <Animatable.Text 
        animation='slideInUp'
        iterationCount={1}
        className='text-lg mb-10 text-gray-400 font-bold text-center'>
          Sending your order
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='pink'/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen