import React, {useEffect, useState} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { COLORS} from '../constants';
import LoginSVG from '../assets/images/misc/projections.svg';

import * as SQLite from 'expo-sqlite';
import { dropDbTables, populateCategory, createDbTables } from '../data/Database';



const OnboardingScreen = ({navigation}) => {
    const [db, setDb] = useState(SQLite.openDatabase('xtracker.db'));

    useEffect(() => {
        // dropDbTables();
        createDbTables();
        // populateCategory();

        setTimeout(() => {
            navigation.navigate("Login");
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