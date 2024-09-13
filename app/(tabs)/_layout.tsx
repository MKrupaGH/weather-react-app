import { View, Text, ImageBackground } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

type ITabIcon = {
  Icon?: any
  color: string
  name: string
  focused: boolean
}

const TabIcon = ({ Icon, color, name, focused }: ITabIcon) => {
  return (
    <View className="items-center justify-center gap-1">
      {Icon}
      <Text
        className={`${focused} ? 'font-psemibold' : 'font-pregular' text-xs `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarBackground: () => {
            return (
              <ImageBackground
                source={require("../../assets/images/night.jpg")}
                style={{ flex: 1, backgroundColor: "transparent" }}
              />
            )
          },
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            borderTopWidth: 0,
            height: 80,
            width: "100%",
            elevation: 0,
            paddingTop: 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Weather",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Weather"
                focused={focused}
                Icon={
                  <MaterialCommunityIcons
                    name="weather-night-partly-cloudy"
                    size={30}
                    color={color}
                  />
                }
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                color={color}
                name="Stats"
                focused={focused}
                Icon={<Ionicons name="stats-chart" size={30} color={color} />}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout
