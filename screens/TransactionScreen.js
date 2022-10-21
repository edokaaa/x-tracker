import React from 'react';
import {
    View,
    FlatList,
    SafeAreaView,
} from 'react-native';

// components
import CustomButton from '../components/CustomButton';
import RenderHeader from '../components/ScreenHeader';

// theme
import { COLORS } from '../constants';

export default function TransactionScreen() {
    const type = [
        {
            id: 1,
            label: "Income",
            color: COLORS.green,
            iconName: 'trending-up'
        },
        {
            id: 2,
            label: "Expense",
            color: COLORS.secondary,
            iconName: 'trending-down'
        },
    ]

    return (
        <SafeAreaView style={{
            padding: 30,
            flex: 1,
            height: '100%'
        }}>
        <View style={{
            flex: 1,
            backgroundColor: COLORS.lightGray2,
            }}>
            <RenderHeader header={'Add Transaction'} sub={'Select Transaction Type'} />
        </View>
            <FlatList 
                style={{padding: 50}}
                data={type}
                renderItem={({item}) => (<CustomButton
                    label={item.label}
                    backgroundColor={item.color}
                    padding={50}
                    width={'100%'}
                    iconName={item.iconName}
                    />)}
                keyExtractor={(item) => `${item.id}`}
            />
        </SafeAreaView>
    );
}