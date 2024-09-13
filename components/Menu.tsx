import { View, Text } from "react-native"
import React from "react"
import CustomButton from "./CustomButton"
import useDataChart from "../hooks/useDataChart"

const Menu = ({ activeBtn, handleDataSet }: any) => {
  return (
    <View>
      <View className=" flex-row px-3 mb-2" style={{ gap: 20 }}>
        <CustomButton
          active={activeBtn}
          name="Linear"
          handleSetter={handleDataSet}
        />
        <CustomButton
          active={activeBtn}
          name="Neuron"
          handleSetter={handleDataSet}
        />
      </View>
      <View className=" flex-row px-3 " style={{ gap: 20 }}>
        <CustomButton
          active={activeBtn}
          name="PM10"
          handleSetter={handleDataSet}
        />
        <CustomButton
          active={activeBtn}
          name="PM2.5"
          handleSetter={handleDataSet}
        />
        <CustomButton
          active={activeBtn}
          name="Ozone"
          handleSetter={handleDataSet}
        />
      </View>
    </View>
  )
}

export default Menu
