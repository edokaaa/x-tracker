import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTransactionScreen from '../screens/AddTransactionScreen';
import TransactionScreen from '../screens/TransactionScreen';

const Stack = createNativeStackNavigator();

const TransactionStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
            <Stack.Screen name="TransactionType" component={TransactionScreen} />
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        </Stack.Navigator>
    );
};

export default TransactionStack;