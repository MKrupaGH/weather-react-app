import { View, Text } from "react-native"
import React, { useState } from "react"

const useBarChart = () => {
  const [selectedBar, setSelectedBar] = useState({
    valueAirly: "",
    valueStation: "",
  })

  const handleBarPress = (bar: any, type: string) => {
    setSelectedBar({ ...selectedBar, [type]: bar.value })
  }

  return { selectedBar, handleBarPress }
}

export default useBarChart
