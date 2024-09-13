import { View, Text, StyleSheet } from "react-native"
import React, { useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"
import useData from "../hooks/useData"

const TableStats = () => {
  const { statsData } = useData()

  useEffect(() => {
    console.log(statsData)
  }, [])

  const data1 = [{ value: -1, label: "12" }]

  const data2 = [
    { value: -2, label: "13", frontColor: "#FFA001" },
    { value: 14, label: "13", frontColor: "#FFA001" },
    { value: 15, label: "13", frontColor: "#FFA001" },
    { value: 16, label: "13", frontColor: "#FFA001" },
    { value: 17, label: "13", frontColor: "#FFA001" },
    { value: 18, label: "13", frontColor: "#FFA001" },
    { value: 19, label: "13", frontColor: "#FFA001" },
    { value: 20, label: "13", frontColor: "#FFA001" },
    { value: 21, label: "13", frontColor: "#FFA001" },
    { value: 22, label: "13", frontColor: "#FFA001" },
    { value: 23, label: "13", frontColor: "#FFA001" },
    { value: 24, label: "24", frontColor: "#FFA001" },
  ]

  return (
    <View style={styles.table}>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <View style={styles.titleCell}>
            <Text style={styles.titleText}>Time</Text>
          </View>
        </View>
        {statsData.map((time: any, index: any) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.rotatedText}>{time.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        <View style={styles.titleContainer}>
          <View style={styles.titleCell}>
            <Text style={styles.titleText}>Diff</Text>
          </View>
        </View>
        {statsData.map((difference: any, index: any) => (
          <View key={index} style={styles.cell}>
            <Text style={styles.text}>{difference.value}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  table: {
    marginBottom: 55,
    flexDirection: "column",
    marginLeft: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  titleCell: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#FFA001",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 28,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  rotatedText: {
    transform: [{ rotate: "90deg" }],
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
})

export default TableStats
