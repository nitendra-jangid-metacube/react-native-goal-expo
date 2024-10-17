import { useState } from "react";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import { CustomButton, FormField, Loader } from "../../components";
import loginService from "../../lib/loginService";
import { readData, saveData } from './../../lib/API';

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [userInfo, setUserInfo] = useState(null);
  readData('userInfo').then(data => { setUserInfo(JSON.parse(data)); if (userInfo) return <Redirect href="/home" />; });
  

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      setLoading(true)
      loginService.login({
        user_name: form.email,
        password: form.password,
      }).then(data => {
        if (data.data.success) {
          setLoading(false)
          if (data?.data?.data?.user?.roles?.is_user) {
            saveData('access_token', data?.data?.data?.user?.token);
            saveData('userInfo', JSON.stringify(data?.data?.data?.user));
            Alert.alert("Success", "User loggedin successfully");
            router.replace("/home");
          } else {
            Alert.alert("Failed", "This user role not allowed");
          }
        } else {
          setLoading(false)
          Alert.alert("", data?.data?.message);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false)
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            className="w-full h-[50px] justify-center"
            style={{backgroundColor: '#fff', borderRadius: 6, marginBottom:20}}
            resizeMode="contain"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Metacafe
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
        </View>
      </ScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default SignIn;
