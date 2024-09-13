import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"

const useDataChart = () => {
  const [gasIndex, setGas] = useState("pm10")
  const [activeBtn, setActiveBtn] = useState({
    gas: "PM10",
    prediction: "Linear",
  })
  const [predictionType, setPredictionType] = useState("linear")

  const handleGasSet = (name: string) => {
    switch (name) {
      case "Linear":
        setActiveBtn({ ...activeBtn, prediction: name })
        setPredictionType("linear")
        break
      case "Neuron":
        setActiveBtn({ ...activeBtn, prediction: name })
        setPredictionType("neuron")
        break
      case "PM10":
        setActiveBtn({ ...activeBtn, gas: name })
        setGas("pm10")
        break
      case "PM2.5":
        setActiveBtn({ ...activeBtn, gas: name })
        setGas("pm25")
        break
      case "Ozone":
        setActiveBtn({ ...activeBtn, gas: name })
        setGas("ozone")
        break
      default:
        return
    }
  }

  return {
    gasIndex,
    predictionType,
    activeBtn,
    handleGasSet,
  }
}

export default useDataChart
