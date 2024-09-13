import { View, Text } from "react-native"
import React from "react"
import SafeArea from "../../components/SafeArea"
import Menu from "../../components/Menu"
import { ScrollView } from "react-native-gesture-handler"
import useBarChart from "../../hooks/useBarChart"
import Chart from "../../components/Chart"
import useData from "../../hooks/useData"

const stats = () => {
  const { handleGasSet, activeBtn, difference } = useData()
  const { handleBarPress } = useBarChart()

  const data1 = [{ value: -4, label: "12:00" }]

  const data2 = [
    { value: 13, label: "13:00", frontColor: "#FFA001" },
    { value: 14, label: "", frontColor: "#FFA001" },
    { value: 15, label: "", frontColor: "#FFA001" },
    { value: -2, label: "", frontColor: "#FFA001" },
    { value: 17, label: "", frontColor: "#FFA001" },
    { value: 18, label: "", frontColor: "#FFA001" },
    { value: 19, label: "", frontColor: "#FFA001" },
    { value: 20, label: "", frontColor: "#FFA001" },
    { value: 21, label: "", frontColor: "#FFA001" },
    { value: 22, label: "", frontColor: "#FFA001" },
    { value: 23, label: "", frontColor: "#FFA001" },
    { value: 24, label: "24:00", frontColor: "#FFA001" },
  ]

  return (
    <SafeArea>
      <View className="my-5">
        <Text className=" text-center text-3xl text-teal-100">
          Predictions Statistics
        </Text>
        <Text className=" text-center text-white text-xl">
          The difference between own station and Airly predictions for each hour
        </Text>
      </View>
      <Menu handleDataSet={handleGasSet} activeBtn={activeBtn} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 h-full flex-col mt-5 mb-[55]"
      >
        <Chart
          title=""
          data={difference || []}
          handleBarPress={handleBarPress}
          type="valueStation"
          fontColor={"#fff"}
          customWidth={30}
          tableStats={true}
        />
      </ScrollView>
    </SafeArea>
  )
}

export default stats
