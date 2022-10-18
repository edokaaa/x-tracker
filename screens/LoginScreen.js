import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../constants';
import LoginSVG from '../assets/images/misc/login.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';

const LoginScreen = ({navigation}) => {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: COLORS.white,
                paddingLeft: 20
            }}>
            <LoginSVG height={175} width={175} />
            <View style={{ alignItems: 'center', marginBottom: 10}}>
                <Text style={{ ...FONTS.h2, color: COLORS.primary, marginBottom: 5 }}>Welcome back</Text>
                <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>@edoka</Text>
            </View>
            <UserInput 
                placeholder={'Enter you password'}
                iconName={'lock-outline'}
                isPassword={true}
            />
            <CustomButton
                label={'Login'}
                onPress={() => navigation.navigate('Register')}
                />
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    marginBottom: 60,
                }}
                onPress={() => navigation.navigate('Onboarding')}>
                <Text
                    style={{
                        color: COLORS.secondary,
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}>
                    Forgot password?
                </Text>
            </TouchableOpacity>
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
                    Not edoka?
                </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}>
                    <MaterialIcons style={{
                        color: COLORS.secondary,
                        fontWeight: 'bold'
                        }}
                        name='logout' size={22}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;