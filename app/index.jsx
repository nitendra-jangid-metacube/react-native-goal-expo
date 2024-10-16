import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons, images } from "../constants";
import { CustomButton, CustomButtonIcon } from "../components";
import { readData } from "../lib/API";
import { useState } from "react";

const Welcome = () => {
  const [userInfo, setUserInfo] = useState(null);
  readData('userInfo').then(data => { setUserInfo(JSON.parse(data)); if (userInfo) return <Redirect href="/home" />; });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[200px] h-[40px]"
            style={{backgroundColor: '#fff', borderRadius: 6, marginBottom:20}}
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Craving Something{"\n"}
              Let's get you started !
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
