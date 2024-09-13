import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import useDataChart from "./useDataChart"
import moment from "moment"

const useData = () => {
  const { gasIndex, predictionType, handleGasSet, activeBtn } = useDataChart()

  const [newestData, setNewestData] = useState<any>(null)
  const [newestAirly, setNewestAirly] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [fetchedData, setFetchedData] = useState(null)
  const [fetchedAirly, setFetchedAirly] = useState<any>()
  const [predictionOzone, setPredictionOzone] = useState<any>()
  const [difference, setDifference] = useState<any>(null)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        // Fetch both data sets in parallel
        const [dataResult, airlyResult] = await Promise.all([
          fetchData(),
          fetchDataAirly(),
        ])

        await formatData(dataResult, airlyResult)
      } catch (error) {
        console.error("Error in fetchDataAsync:", error)
      }
    }

    if (!fetchedData && !fetchedAirly) {
      fetchDataAsync()
    }
  }, [])

  useEffect(() => {
    if (fetchedData && gasIndex && predictionType) {
      formatData(fetchedData, fetchedAirly)
    }
  }, [fetchedData, gasIndex, predictionType])

  function processData(newestData: any, newestAirly: any) {
    let actualIndex = -1
    // Find the index of the actual data (green label)
    for (let i = 0; i < newestData.length; i++) {
      if (newestData[i].frontColor === "green") {
        actualIndex = i
        break
      }
    }

    const differences = []

    for (let i = actualIndex; i < newestData.length; i++) {
      const dataValue = newestData[i].value
      const airlyValue = newestAirly[i].value
      const difference = dataValue - airlyValue

      differences.push({
        label: newestData[i].label,
        value: difference,
        frontColor: newestData[i].frontColor,
      })
    }

    setDifference(differences)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://express-weatherstation.onrender.com/catalog/values/analyze-full"
      )
      const result = await response.json()
      setFetchedData(result.data)
      return result.data
    } catch (error) {
      console.log("Error fetching", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDataAirly = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        "https://airapi.airly.eu/v2/measurements/nearest?lat=50.06666&lng=19.887966&maxDistanceKM=1",
        {
          headers: {
            apikey: "R9dg5ELQB5OxDjHhWGhdOXom7UFcwbKb",
            Accept: "application/json",
          },
        }
      )
      const result = await response.json()
      setFetchedAirly(result)
      return result
    } catch (error) {
      console.log("Error fetching", error)
    } finally {
      setLoading(false)
    }
  }

  const formatData = (data: any, dataAirly: any) => {
    let data1 = data.data1[gasIndex]
    let data2 = data[predictionType][gasIndex]
    let data3 = data.neuron.ozone

    let data1Clear = data.data1[gasIndex]
    let data2Clear = data[predictionType][gasIndex]

    let hourLabel: number = 10
    let predictHour: number = 22

    data1 = data1.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        hourLabel = label
        return { value, label: label + ":00", frontColor: "#177AD5" }
      }
      if (index === data1.length - 1) {
        predictHour = label
        return { value, label: label + ":00", frontColor: "green" }
      }
      return { value, label: "", frontColor: "#177AD5" }
    })

    data1Clear = data1Clear.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label, frontColor: "#177AD5" }
      }
      if (index === data1.length - 1) {
        return { value, label: label, frontColor: "green" }
      }
      return { value, label: label, frontColor: "#177AD5" }
    })

    data2 = data2.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label + ":00", frontColor: "#FFA001" }
      }
      if (index === data1.length - 1) {
        return { value, label: label + ":00", frontColor: "#FFA001" }
      }
      return { value, label: "", frontColor: "#FFA001" }
    })

    data2Clear = data2Clear.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label, frontColor: "#FFA001" }
      }
      if (index === data1.length - 1) {
        return { value, label: label, frontColor: "#FFA001" }
      }
      return { value, label: label, frontColor: "#FFA001" }
    })

    data3 = data3.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return {
          value: Math.round(value + (Math.random() - 0.5) * 10),
          label: label + ":00",
          frontColor: "#FFA001",
        }
      }
      if (index === data1.length - 1) {
        return {
          value: Math.round(value + (Math.random() - 0.5) * 10),
          label: label + ":00",
          frontColor: "#FFA001",
        }
      }
      return {
        value: Math.round(value + (Math.random() - 0.5) * 10),
        label: "",
        frontColor: "#FFA001",
      }
    })
    setPredictionOzone(data3)
    setNewestData(data1.concat(data2))
    formatAirly(
      dataAirly,
      hourLabel,
      predictHour,
      data1Clear.concat(data2Clear)
    )
  }

  const formatAirly = (
    data: any,
    hour: number,
    predictHour: number,
    newestData: any
  ) => {
    if (hour === 24) hour = 0

    let historicData = getHistoricAirQualityData(hour - 1, data.history)
    let data1 = historicData[gasIndex]

    let data1Clear = historicData[gasIndex]

    data1 = data1.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label + ":00", frontColor: "#177AD5" }
      }
      if (index === data1.length - 1) {
        return { value, label: label + ":00", frontColor: "green" }
      }
      return { value, label: "", frontColor: "#177AD5" }
    })

    data1Clear = data1Clear.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label, frontColor: "#177AD5" }
      }
      if (index === data1.length - 1) {
        return { value, label: label, frontColor: "green" }
      }
      return { value, label: label, frontColor: "#177AD5" }
    })

    let predictionData = getForecastAirQualityData(predictHour, data.forecast)
    let data2 = predictionData[gasIndex]

    let data2Clear = predictionData[gasIndex]

    data2 = data2.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label + ":00", frontColor: "#FFA001" }
      }
      if (index === data1.length - 1) {
        return { value, label: label + ":00", frontColor: "#FFA001" }
      }
      return { value, label: "", frontColor: "#FFA001" }
    })

    data2Clear = data2Clear.map((measure: any, index: number) => {
      const { value, label } = measure
      if (index === 0) {
        return { value, label: label, frontColor: "#FFA001" }
      }
      if (index === data1.length - 1) {
        return { value, label: label, frontColor: "#FFA001" }
      }
      return { value, label: label, frontColor: "#FFA001" }
    })

    setNewestAirly(data1.concat(data2))
    processData(newestData, data1Clear.concat(data2Clear))
  }

  function getForecastAirQualityData(
    startHour: any,
    history: any,
    numberOfHours = 12
  ) {
    const results: any = {
      pm10: [],
      pm25: [],
      ozone: predictionOzone,
    }

    // Find the index for the starting hour
    for (let i = 0; i < history.length; i++) {
      const measure = history[i]
      const fromHour = moment(measure.fromDateTime)

      // Compare hours
      if (fromHour.hour() === startHour) {
        // Loop through the next `numberOfHours` entries
        for (let j = 0; j < numberOfHours && i + j < history.length; j++) {
          const currentMeasure = history[i + j]
          const pm10Value = currentMeasure.values.find(
            (v: any) => v.name === "PM10"
          ).value
          const pm25Value = currentMeasure.values.find(
            (v: any) => v.name === "PM25"
          ).value

          let label = moment(currentMeasure.fromDateTime)
            .add(1, "hours")
            .format("H")

          if (label === "0:00") label = "24:00"

          // Push values into results
          results.pm10.push({ value: Math.round(pm10Value), label: label })
          results.pm25.push({ value: Math.round(pm25Value), label: label })
        }
        break
      }
    }

    return results
  }

  function getHistoricAirQualityData(
    startHour: any,
    history: any,
    numberOfHours = 12
  ) {
    const results: any = {
      pm10: [],
      pm25: [],
      ozone: [],
    }

    // Find the index for the starting hour
    for (let i = 0; i < history.length; i++) {
      const measure = history[i]
      const fromHour = moment(measure.fromDateTime)

      // Compare hours
      if (fromHour.hour() === startHour) {
        // Loop through the next `numberOfHours` entries
        for (let j = 0; j < numberOfHours && i + j < history.length; j++) {
          const currentMeasure = history[i + j]
          const pm10Value = currentMeasure.values.find(
            (v: any) => v.name === "PM10"
          ).value
          const pm25Value = currentMeasure.values.find(
            (v: any) => v.name === "PM25"
          ).value
          const o3Value = currentMeasure.values.find(
            (v: any) => v.name === "O3"
          ).value

          let label = moment(currentMeasure.fromDateTime)
            .add(1, "hours")
            .format("H")

          if (label === "0") label = "24"

          // Push values into results
          results.pm10.push({ value: Math.round(pm10Value), label: label })
          results.pm25.push({ value: Math.round(pm25Value), label: label })

          results.ozone.push({ value: Math.round(o3Value), label: label })
        }
        break
      }
    }

    return results
  }

  return {
    newestData,
    newestAirly,
    handleGasSet,
    activeBtn,
    loading,
    difference,
  }
}

export default useData
