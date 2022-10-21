import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

// Theme
import { COLORS } from '../constants';
import TransactionStack from './TransactionStack';
// import TransactionModel from '../components/TransactionModal';

// Screen Names 
const homeName = 'Home';
const statsName = 'Statistics';
const categoryName = 'Category';
const settingsName = 'Settings';
const addTx = 'Add';

const Tab = createBottomTabNavigator();

const MiddleBotton = ({children, onPress}) => {
    return (
        <TouchableOpacity
            style={{
                top: -20,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <View style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                backgroundColor: COLORS.secondary,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Ionicons name={'add'} color={COLORS.white} size={40} />
            </View>
        </TouchableOpacity>
    );
}

const AppStack = () => {
    return (
        <Tab.Navigator
            screenOptions = {({route}) => ({
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    paddingBottom: 10,
                    paddingTop: 10,
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: COLORS.white,
                    borderRadius: 15,
                    height: 60,
                    ... styles.shadow
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName) {
                        iconName = focused ? 'home' : 'home-outline'
                    } else if (rn === statsName) {
                        iconName = focused ? 'trending-up' : 'trending-up'
                    } else if (rn === categoryName) {
                        iconName = focused ? 'list' : 'list-outline'
                    } else if (rn === settingsName) {
                        iconName = focused ? 'settings' : 'settings-outline'
                    }
                    return <Ionicons name={iconName} size={size} color= {color} />
                },
                tabBarActiveTintColor: COLORS.secondary,
                tabBarInactiveTintColor: COLORS.darkgray,
            })}
        >
            <Tab.Screen name={homeName} component={DashboardScreen} />
            <Tab.Screen name={statsName} component={StatisticsScreen} />
            <Tab.Screen
                name={addTx}
                component={TransactionStack}
                options={{
                    tabBarButton: (props) => <MiddleBotton {...props} />
                }} 
            />
            <Tab.Screen name={categoryName} component={CategoryScreen} />
            <Tab.Screen name={settingsName} component={SettingsScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    }
});

export default AppStack;

