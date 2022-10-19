import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TransactionScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Add Transaction</Text>
        </View>
    );
}