import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../constants';
import FlagSVG from '../assets/images/misc/flagged.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';


const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [initialAmount, setInitialAmount] = useState('');

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
                onChangeText={value => setUserName(value)}
            />
            <UserInput 
                placeholder={'Enter you password'}
                iconName={'lock-outline'}
                isPassword={true}
                onChangeText={value => setPassword(value)}
            />
            <UserInput 
                placeholder={'Initial Balance'}
                iconName={'money'}
                onChangeText={value => setInitialAmount(value)}
            />
            <CustomButton
                label={'Register'}
                onPress={() => navigation.navigate('Dashboard')}
                />
        </SafeAreaView>
    );
};

export default RegisterScreen;

