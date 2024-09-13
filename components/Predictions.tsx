import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native"
import React, { useEffect, useMemo, useRef, useState } from "react"
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetScrollViewMethods,
} from "@gorhom/bottom-sheet"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CustomButton from "./CustomButton"
import { BarChart } from "react-native-gifted-charts"
import { ScrollView } from "react-native-gesture-handler"
import Chart from "./Chart"
import useDataChart from "../hooks/useDataChart"
import Menu from "./Menu"
import useBarChart from "../hooks/useBarChart"
import useFetch from "../hooks/useFetch"
import moment from "moment"
import { history } from "../data/history"
import { forecast } from "../data/forecast"
import useData from "../hooks/useData"
const Predictions = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)

  const snapPoints = useMemo(() => ["13%", "82%"], [])

  const { selectedBar, handleBarPress } = useBarChart()

  const { newestData, newestAirly, handleGasSet, activeBtn, loading } =
    useData()

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={0}
      handleIndicatorStyle={{
        height: 0,
      }}
      handleStyle={{
        flex: 1,
        padding: 0,
        marginTop: 5,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons
          name="weather-cloudy-clock"
          size={28}
          color="#FFA001"
        />
      </View>
      <Menu handleDataSet={handleGasSet} activeBtn={activeBtn} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 h-full flex-col mt-5 mb-[80]"
      >
        {loading ? (
          <ActivityIndicator size="large" color="#FFA001" />
        ) : (
          <>
            <Chart
              title="Station"
              data={newestData}
              handleBarPress={handleBarPress}
              type="valueStation"
            />
            <Chart
              title="Airly"
              data={newestAirly}
              handleBarPress={handleBarPress}
              type="valueAirly"
            />
          </>
        )}
        <View className="mb-20 px-4">
          <Text className="text-center font-bold text-grey-500 text-2xl mb-2">
            Fast Stats
          </Text>
          <View className="flex-row justify-around mb-4">
            <Text className="text-xl">
              Station Value: {selectedBar.valueStation}
            </Text>
            <Text className="text-xl">
              Airly Value: {selectedBar.valueAirly}
            </Text>
          </View>
          <View className="flex-row justify-center">
            <Text className="text-xl">
              Difference:{" "}
              {Number(selectedBar.valueStation) -
                Number(selectedBar.valueAirly)}
            </Text>
          </View>
        </View>
      </ScrollView>
    </BottomSheet>
  )
}

export default Predictions
