import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../constants';
import FlagSVG from '../assets/images/misc/flagged.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';

let Currencies = [
    {value: 'NGN'},
    {value: 'USD'},
    {value: 'EUR'},
];

const RegisterScreen = ({navigation}) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
            }}>
            <FlagSVG height={150} width={150} />
            <View style={{ alignItems: 'center', margin: 20}}>
                <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>Register</Text>
            </View>
            <UserInput 
                placeholder={'Username'}
                iconName={'account-circle'}
                isPassword={true}
            />
            <UserInput 
                placeholder={'Enter you password'}
                iconName={'lock-outline'}
            />
            <UserInput 
                placeholder={'Select Currency'}
                iconName={'attach-money'}
            />
            <UserInput 
                placeholder={'Initial Balance'}
                iconName={'money'}
            />
            <CustomButton
                label={'Sign up'}
                onPress={() => navigation.navigate('Dashboard')}
                />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text style={{
                    color: COLORS.primary,
                    fontWeight: 'bold', 
                    marginRight: 5
                }}>
                    Have an account?
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons style={{
                        color: COLORS.secondary,
                        fontWeight: 'bold'
                        }}
                        name='login' size={22}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;

