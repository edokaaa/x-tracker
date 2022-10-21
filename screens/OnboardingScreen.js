import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


import { COLORS, FONTS, SIZES } from '../constants';
import LoginSVG from '../assets/images/misc/projections.svg';


const OnboardingScreen = ({navigation}) => {
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
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.secondary,
                    padding: 20,
                    width: '90%',
                    borderRadius: 10,
                    marginBottom: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
                onPress={() => navigation.navigate('Login')}>
                <Text
                    style={{
                        color: COLORS.white,
                        fontSize: 18,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                    Login
                </Text>
                <MaterialIcons name='arrow-forward-ios' size={22} color={COLORS.white} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default OnboardingScreen;