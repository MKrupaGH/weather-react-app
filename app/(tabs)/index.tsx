import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import SafeArea from "../../components/SafeArea"
import { FontAwesome6 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import Predictions from "../../components/Predictions"
import moment from "moment"
import { WeatherInfo } from "../../models/Weather"
import FontAwesome from "@expo/vector-icons/FontAwesome"
const index = () => {
  const [newestData, setNewestData] = useState<WeatherInfo>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://express-weatherstation.onrender.com/catalog/values/newest"
      )
      const result = await response.json()
      formatData(result.data[0])
    } catch (error) {
      console.log("Error fetching", error)
    } finally {
      setLoading(false)
    }
  }
  const formatData = (weatherInfo: WeatherInfo) => {
    const time = moment(weatherInfo.createdAt).format("DD-MM-YYYY HH:mm:ss")
    setNewestData({ ...weatherInfo, createdAt: time })
  }

  return (
    <SafeArea>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA001" />
      ) : (
        <>
          <View className="flex-row justify-between">
            <Text className=" text-teal-50 opacity-60">
              {"Last update: " + newestData?.createdAt}
            </Text>
            <TouchableOpacity onPress={fetchData}>
              <FontAwesome name="refresh" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View className="mt-10">
            <Text className=" text-6xl" style={{ color: "#FFA001" }}>
              Kraków
            </Text>
          </View>
          <View className="my-10 flex-col flex-1">
            <View className="flex flex-row justify-between mb-10">
              <View className=" flex-row items-center gap-2">
                <FontAwesome6
                  name="temperature-empty"
                  size={40}
                  color="white"
                />
                <Text className=" text-teal-100 text-3xl">
                  <Text>{newestData?.temp} &deg;C</Text>
                </Text>
              </View>
              <View className=" flex-row items-center gap-2">
                <View className=" flex-row items-end">
                  <MaterialIcons name="bubble-chart" size={40} color="white" />
                  <Text className=" text-teal-50 text-sm ml-[-12]">pm10</Text>
                </View>
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.pm10 + " µg/m³"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between mb-10">
              <View className=" flex-row items-center gap-2">
                <Entypo name="water" size={30} color="white" />
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.hum + " %"}
                </Text>
              </View>
              <View className=" flex-row items-center gap-2">
                <View className=" flex-row items-end">
                  <MaterialIcons name="bubble-chart" size={40} color="white" />
                  <Text className=" text-teal-50 text-sm ml-[-12]">pm2.5</Text>
                </View>
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.pm25 + " µg/m³"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between mb-10">
              <View className=" flex-row items-center gap-2">
                <Ionicons name="speedometer-outline" size={30} color="white" />
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.pres + " hPa"}
                </Text>
              </View>
              <View className=" flex-row items-center gap-2">
                <View className=" flex-row items-end">
                  <MaterialIcons name="bubble-chart" size={40} color="white" />
                  <Text className=" text-teal-50 text-sm ml-[-12]">pm1</Text>
                </View>
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.pm1 + " µg/m³"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-between mb-10">
              <View className=" flex-row items-center gap-2">
                <AntDesign name="cloudo" size={30} color="white" />
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.cloud + " %"}
                </Text>
              </View>
              <View className=" flex-row items-center gap-2">
                <View className=" flex-row items-end">
                  <MaterialIcons name="bubble-chart" size={40} color="white" />
                  <Text className=" text-teal-50 text-sm ml-[-12]">ozone</Text>
                </View>
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.o3 + " µg/m³"}
                </Text>
              </View>
            </View>
            <View className="flex flex-row justify-end mb-10">
              <View className=" flex-row items-center gap-2">
                <View className=" flex-row items-end">
                  <MaterialIcons name="bubble-chart" size={40} color="white" />
                  <Text className=" text-teal-50 text-sm ml-[-12]">voc</Text>
                </View>
                <Text className=" text-teal-100 text-3xl">
                  {newestData?.co2 + " µg/m³"}
                </Text>
              </View>
            </View>
          </View>
          <Predictions />
        </>
      )}
    </SafeArea>
  )
}

export default index
