import React from 'react';
import { View } from 'react-native';

import RenderHeader from '../components/ScreenHeader';
import { COLORS } from '../constants';

import RenderNavBar from '../components/NavBar';

export default function AddTransactionScreen({navigation}) {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
            <RenderNavBar back={navigation.goBack()}/>
        </View>
    );
}