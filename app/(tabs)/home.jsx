import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButtonIcon, Loader } from "../../components";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { readData, removeData, BASIC_URL } from "../../lib/API";
import { useEffect, useState } from "react";
import loginService from "../../lib/loginService";
import { Redirect, router } from "expo-router";
import { icons } from "../../constants";

const Home = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState(null);
  readData('userInfo').then(data => { setUserInfo(JSON.parse(data)); if (!userInfo) return <Redirect href="/sign-in" />; });

  const logout = async () => {
    try {
      setLoading(true)
      loginService.userLogoutAPI().then(data => {
        if (data.data.success) {
          setLoading(false)
          removeData('access_token');
          removeData('userInfo');
          Alert.alert("Success", "User log out successfully");
          router.replace("sign-in");
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
    }
  }

  useEffect(() => {
    setLoading(true);
    loginService
      .getVendor()
      .then(data => {
        setVendors(data?.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="bg-primary">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 py-3 my-6"
        >
          <Text className="text-3xl font-semibold text-white mt-10 font-psemibold">
            Welcome {userInfo?.first_name} 
          </Text>
          <CustomButtonIcon
            image={icons.logout}
            handlePress={() => logout()}
          />

        </View>

        {vendors.length > 0 ? <View>
          {vendors?.map((vendor, index) => (
            <TouchableOpacity
              key={index}
              > 
              {/* <Image
                source={{
                  uri: BASIC_URL + '-api.metacube.com/media/user/' + vendor.id,
                }}></Image>
              <View style={{ borderWidth: 0.4, width: '100%', marginBottom: 8 }} /> */}
              <View>
                <View>
                  <Text>{vendor.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View> : <Text>No found</Text> }
      </ScrollView>
      <Loader isLoading={loading} />
    </SafeAreaView>
  );
};

export default Home;


export const styles = StyleSheet.create({
  text: {
    color: 'red'
  }
})