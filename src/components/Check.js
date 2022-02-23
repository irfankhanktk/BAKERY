import AsyncStorage from "@react-native-async-storage/async-storage";

const Check = () => {
  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log("token :" + token);
    if (!token) {
      navigation.navigate("Login");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);
  return;
};

export default Check;
