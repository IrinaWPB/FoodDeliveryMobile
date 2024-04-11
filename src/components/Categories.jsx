import { ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import sanityClient from '../../sanity'
import { urlFor } from '../../sanity'

const Categories = () => {
  const [cats, setCats] = useState([])
  useEffect(() => {
    sanityClient.fetch(`
     *[_type == "category"]
    `).then(data => setCats(data))
  }, [])

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} 
                contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}>
    {cats?.map(cat => (
      <CategoryCard key={cat._id} imgUrl={urlFor(cat.image).width(200).url()} title={cat.name}/>
    ))}
    
    </ScrollView>
  )
}

export default Categories