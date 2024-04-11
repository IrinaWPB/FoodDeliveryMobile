import { useNavigation } from '@react-navigation/native'
import { useEffect, useLayoutEffect, useState } from 'react'
import {Image, SafeAreaView, Text, View, Platform, TextInput, ScrollView } from 'react-native'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../../sanity'

const HomeScreen = () => {
  const [featuredCats, setFeaturedCats] = useState([])
  const navigation = useNavigation()
  useLayoutEffect(()=> {
    navigation.setOptions({
      headerShown: false
    })
  }, [])
  useEffect(() => {
    sanityClient.fetch(`*[_type == "featured"] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }`).then((data) => {
      setFeaturedCats(data)
    })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}
        <View className={`${Platform.OS === 'android' && 'mt-10'} flex-row pb-3 items-center mx-4 space-x-2`}>
          <Image source={require('../../assets/logo.png')} className="w-11 h-11 bg-gray-300 p-4 rounded-full" />
          <View className="flex-1">
            <Text className="font-bold text-gray-600 text-small">Deliver Now</Text>
            <Text className="font-bold text-lg">
              Current Delivery
              <ChevronDownIcon size={20} color='gray'/>
            </Text>
          </View>
          <UserIcon size={35} color='gray' />
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 mx-4">
          <View className="flex-row space-x-2 items-center flex-1 bg-gray-200 p-2 rounded"  >
            <MagnifyingGlassIcon color='gray'/>
            <TextInput placeholder='Restaurants and cuisines'/>
          </View>
          <AdjustmentsVerticalIcon color='gray'/>
        </View>

        {/* Body */}
        <ScrollView className="bg-gray-100">
          <Categories />

          {featuredCats?.map(cat => (
            <FeaturedRow key={cat._id} title={cat.name} description={cat.short_description} id={cat._id} />
          ))}

        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
