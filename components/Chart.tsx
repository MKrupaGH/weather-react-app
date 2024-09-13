import { View, Text, Dimensions, StyleSheet } from "react-native"
import React from "react"
import { ScrollView } from "react-native-gesture-handler"
import { BarChart } from "react-native-gifted-charts"
import TableStats from "./TableStats"

const Chart = ({
  title,
  data = [],
  type,
  handleBarPress,
  fontColor = "#000",
  customWidth = 330,
  tableStats = false,
}: any) => {
  return (
    <View className="mb-5">
      <Text
        className="text-center font-bold text-grey-500 text-2xl"
        style={{ color: fontColor }}
      >
        {title}
      </Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        <View>
          <BarChart
            data={data}
            barWidth={20}
            spacing={8}
            initialSpacing={10}
            frontColor={"#177AD5"}
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={0}
            height={320}
            width={Dimensions.get("window").width + customWidth}
            disablePress={false}
            disableScroll={false}
            isAnimated
            yAxisTextStyle={{
              color: fontColor,
              fontSize: 12,
              transform: [{ rotate: "45deg" }],
            }}
            xAxisLabelTextStyle={{
              color: fontColor,
              fontSize: 12,
              transform: [{ rotate: "45deg" }],
            }}
            renderTooltip={(item: any, index: any) => {
              return (
                <View
                  style={{
                    marginBottom: 20,
                    marginLeft: -6,
                    backgroundColor: "#177AD5",
                    paddingHorizontal: 6,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text>{item.value}</Text>
                </View>
              )
            }}
            onPress={(bar: any) => handleBarPress(bar, type)}
          />
          {tableStats && (
            <View style={styles.table}>
              <View style={styles.row}>
                <View style={styles.titleContainer}>
                  <View style={styles.titleCell}>
                    <Text style={styles.titleText}>Time</Text>
                  </View>
                </View>
                {data.map((time: any, index: any) => (
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
                {data.map((difference: any, index: any) => (
                  <View key={index} style={styles.cell}>
                    <Text style={styles.text}>{difference.value}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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

export default Chart
