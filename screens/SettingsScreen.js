import React from 'react';
import { View } from 'react-native';

import RenderHeader from '../components/ScreenHeader';
import { COLORS } from '../constants';

export default function CategoryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
            <RenderHeader header={'Settings'} sub={'6 Total'} />
        </View>
    );
}