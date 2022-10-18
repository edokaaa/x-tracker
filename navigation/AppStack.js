import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import DashboardScreen from '../screens/DashboardScreen';
import CategoryScreen from '../screens/CategoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

// Theme
import { COLORS } from '../constants';

// Screen Names 
const dashboardName = 'Dashboard';
const statsName = 'Statistics';
const categoryName = 'Category';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

const AppStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={dashboardName}
                screenOptions={({route}) => ({
                    headerShown: false,
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === dashboardName) {
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
                    tabBarStyle: [
                        {
                            paddingTop: 10,
                            paddingBottom: 10,
                            fontSize: 10, height: 70
                        },
                        // null
                    ]

                })}
                >
                <Tab.Screen name={dashboardName} component={DashboardScreen} />
                <Tab.Screen name={statsName} component={StatisticsScreen} />
                <Tab.Screen name={categoryName} component={CategoryScreen} />
                <Tab.Screen name={settingsName} component={SettingsScreen} />
            </Tab.Navigator>

        </NavigationContainer>
    );
};

export default AppStack;

