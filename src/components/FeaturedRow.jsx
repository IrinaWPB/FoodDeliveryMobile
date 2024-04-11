import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ReastaurantCard from './ReastaurantCard'
import sanityClient from '../../sanity'

const FeaturedRow = ({title, description, id}) => {
  const [restaurants, setRestaurants] = useState([])
  //get restaurants for this row
  useEffect(() => {
    sanityClient.fetch(`*[_type == "featured" && _id == $id] {
      ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      },
    }[0]`, {id}).then(data=> {
      setRestaurants(data?.restaurants)
    })
  }, [id])

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color='gray'/>
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView horizontal 
                  contentContainerStyle={{
                    paddingHorizontal: 15
                  }}
                  showsHorizontalScrollIndicator={false}
                  className="pt-4"
                  >
        {/* RestauirantCards */}
      {restaurants?.map(rest => (
        <ReastaurantCard key={rest._id} restaurant={rest} />
      ))}

      </ScrollView>
    </View>
  )
}

export default FeaturedRow