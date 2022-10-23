import React, {useEffect} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import { COLORS, FONTS, SIZES } from '../constants';
import LoginSVG from '../assets/images/misc/projections.svg';


const OnboardingScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Register");
        }, 5000);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.lightGray,
            }}>
            <LoginSVG height={250} width={250} />
            <View style={{marginTop: 80, marginBottom: 50, justifyContent: 'center'}}>
            <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 50,
                        color: COLORS.primary,
                    }}>
                    xTracker
                </Text>
                <Text
                    style={{
                        fontSize: 20,
                        color: COLORS.primary,
                    }}>
                    All your transactions at your finger tips.
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default OnboardingScreen;