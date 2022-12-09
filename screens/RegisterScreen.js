import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, TextInput, KeyboardAvoidingView, Alert } from 'react-native';

import { COLORS, FONTS } from '../constants';
import FlagSVG from '../assets/images/misc/flagged.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';
import { ScrollView } from 'react-native-gesture-handler';

import { db } from '../data/Database';

const RegisterScreen = ({navigation}) => {
    const [userName, setUserName] = useState(undefined);
    const [password, setPassword1] = useState(undefined);
    const [password2, setPassword2] = useState(undefined);

    const validatePassword = () => {
        if (password !== password2) {
            Alert.alert('Passwords mismatched!');
        }
    }

    const registerUser = () => {
        if (userName === undefined || password === undefined) {
            Alert.alert('invalid details');
        } else {
            db.transaction(tx => {
                tx.executeSql('INSERT INTO users (username, password) values (?, ?)', [userName, password],
                    (txobj, resultSet) => {
                        if (resultSet.rowsAffected > 0) {
                            Alert.alert('Registeration Successful!');
                            navigation.navigate("Dashboard");
                        }
                    },
                    (txObj, error) => console.log(error)
                );
            });
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{
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
                placeholder={'Enter a password'}
                iconName={'lock-outline'}
                isPassword={true}
                onChangeText={value => setPassword1(value)}
            />
            <UserInput 
                placeholder={'Confirm password'}
                iconName={'lock-outline'}
                isPassword={true}
                onChangeText={(value) => {
                    setPassword2(value);
                }}
                onEndEditing={() => validatePassword()}
            />
            <CustomButton
                label={'Register'}
                onPress={() => {registerUser()}}
                />
        </ScrollView>
    );
};

export default RegisterScreen;

