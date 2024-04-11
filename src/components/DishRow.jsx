import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { urlFor } from '../../sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../slices/basketSlice'

const DishRow = ({dish, id}) => {
  const [isPressed, setIsPressed] = useState(false)
	const items = useSelector((state) => selectBasketItemsWithId(state, id))
	const dispatch = useDispatch()
	const addItem = () => {
		dispatch(addToBasket(dish))
	}
	const removeItem = () => {
		if (!items.length > 0) return
		dispatch(removeFromBasket(id))
	}

  return (
    <>
			<TouchableOpacity className={`bg-white border border-gray-200 flex-row p-4 ${isPressed && 'border-b-0'}`}
											  onPress={()=> setIsPressed(!isPressed)}>
				<View className="flex-1 or-2">
						<Text className="text-lg mb-1">{dish.name}</Text>
						<Text className="text-gray-500">{dish.short_description}</Text>
						<Text className="text-gray-500 mt-2">${dish.price.toFixed(2)}</Text>
				</View>
				<Image source={{uri: dish.image ? urlFor(dish.image).url() : 'https://media.assettype.com/tnm%2Fimport%2Fsites%2Fdefault%2Ffiles%2FTheBigFatBao_Instagram_16062021_1200_0.jpeg?w=480&auto=format%2Ccompress&fit=max'}} className="h-20 w-20 p-4" 
								style={{borderWidth: 1, borderColor: 'lightgray'}}/>
			</TouchableOpacity>
			{isPressed && (
				<View className="bg-white px-4">
					<View className="flex-row items-center space-x-2 pb-3">
						<TouchableOpacity onPress={removeItem} disabled={items.length === 0}>
							<MinusCircleIcon color={items.length > 0 ? 'gray' : 'lightgray'} size={40}/>
						</TouchableOpacity>	
						<Text>{items.length}</Text>
						<TouchableOpacity onPress={addItem}>
							<PlusCircleIcon color='gray' size={40}/>
						</TouchableOpacity>
					</View>
				</View>
			)}
    </>
    
  )
}

export default DishRow