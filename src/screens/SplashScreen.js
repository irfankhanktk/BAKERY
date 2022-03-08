import React from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { REGISTER_USER_SUCCESS } from '../redux/actions/authAction';
const SplashScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if(token){
                const decode = jwtDecode(token);
                console.log('decode::',decode);
             
                    dispatch({
                        type: REGISTER_USER_SUCCESS,
                        payload: decode,
                      });
                await AsyncStorage.setItem("user", JSON.stringify(decode));
                const role = decode.role;
                if (role === 0) {
                    navigation.replace("ClientNavigation");
                } else navigation.replace("AdminNavigation");
            }else{
                
            }
        } catch (error) {

        }
    }
    React.useEffect(() => {
        getData()
    }, [])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Our Bakery</Text>
        </View>
    );
};
export default SplashScreen;