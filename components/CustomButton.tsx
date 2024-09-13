import { View, Text, TouchableOpacity } from "react-native"
import React from "react"

type ICustomButton = {
  active: any
  type?: string
  name: string
  handleSetter: any
}

const CustomButton = ({ active, type, name, handleSetter }: ICustomButton) => {
  return (
    <TouchableOpacity
      className="  p-3 flex-1 rounded-xl"
      onPress={() => handleSetter(name)}
      style={
        active.gas === name || active.prediction === name
          ? { backgroundColor: "#177AD5" }
          : { backgroundColor: "#FFA001" }
      }
    >
      <Text className=" text-center text-white text-lg">{name}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
