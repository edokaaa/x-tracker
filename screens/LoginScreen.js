import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLORS, FONTS } from '../constants';
import LoginSVG from '../assets/images/misc/login.svg';

import CustomButton from '../components/CustomButton';
import UserInput from '../components/UserInput';

import { db } from '../data/Database';

const LoginScreen = ({navigation}) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [password, setPassword] = useState(undefined);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * From users', null,
                (txObj, resultSet) => {
                    if (resultSet.rows._array.length < 1) {
                        navigation.navigate("Register");
                    } else {
                        setCurrentUser(resultSet.rows._array[0]);
                        setIsLoading(false);
                    }
                },
                (txObj, error) => console.log(error)
            );
        });
    }, [db]);

    const loginUser = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM users WHERE username=? AND password=?', [currentUser.username, password],
                (txObj, resultSet) => {
                    if (resultSet.rows._array.length !== 1) {
                        // password incorrect
                        Alert.alert('Incorrect Password');
                    } else {
                        navigation.navigate('Dashboard')
                    }
                },
                (txObj, error) => console.log(error)
            );
        });
    }

    const resetPassword = () => {
        // password would be sent to user's email
    }

    if (isLoading) {
        return (
          <View style={styles.container}>
            <Text>Please wait...</Text>
          </View>
        );
      }


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
                <Text style={{ ...FONTS.largeTitle, color: COLORS.primary }}>@{currentUser.username}</Text>
            </View>
            <UserInput 
                placeholder={'Enter you password'}
                iconName={'lock-outline'}
                isPassword={true}
                onChangeText={value => setPassword(value)}
            />
            <CustomButton
                label={'Login'}
                onPress={() => loginUser()}
                justifyContent={'center'}
                iconName={'login'}
                />
            <TouchableOpacity
                style={{
                    justifyContent: 'center',
                    marginBottom: 60,
                }}
                onPress={() => resetPassword()}>
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
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'stretch',
      justifyContent: 'space-between',
      margin: 8
    }
  });
  

export default LoginScreen;