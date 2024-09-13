import { View, Text, ImageBackground, ImageSourcePropType } from "react-native"
import React, { Children, ReactNode, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import * as NavigationBar from "expo-navigation-bar"
import { StatusBar } from "react-native"
import Predictions from "./Predictions"

type ISafeArea = {
  children: ReactNode
}

const SafeArea = ({ children }: ISafeArea) => {
  useEffect(() => {
    NavigationBar.setPositionAsync("absolute")
    NavigationBar.setBackgroundColorAsync("#ffffff00")
    StatusBar.setBarStyle("light-content")
    StatusBar.setBackgroundColor("transparent")
  }, [])
  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        imageStyle={{ resizeMode: "cover" }}
        source={require("../assets/images/night.jpg")}
      >
        <SafeAreaView className="flex-1 px-7">{children}</SafeAreaView>
      </ImageBackground>

      <StatusBar barStyle="light-content" backgroundColor={"transparent"} />
    </View>
  )
}

export default SafeArea
