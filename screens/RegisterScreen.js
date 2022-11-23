import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../constants';
import FlagSVG from '../assets/images/misc/flagged.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';

import * as SQLite from 'expo-sqlite';
import { getUser, createDataBase, createUser } from '../data/Database';
// import { openDatabase } from 'react-native-sqlite-storage';

// const db = openDatabase({
//     name: "xtracker",
// });
const db = SQLite.openDatabase(
    {
        name: 'MainDB',
        location: 'default',
    },
    () => { },
    error => { console.log(error) }
);

const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [initialAmount, setInitialAmount] = useState('');

    createDataBase();
    const user = getUser();
    console.log(user);

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
                // onPress={() => navigation.navigate('Dashboard')}
                onPress={(userName, password) => {
                    createUser(userName, password);
                    navigation.navigate("Login");
                }}
                />
        </SafeAreaView>
    );
};

export default RegisterScreen;

