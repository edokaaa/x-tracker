import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

// theme
import { COLORS, FONTS, SIZES, icons } from '../constants';


export default function RenderHeader({header, sub}) {
    
    return (
        <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
            <View>
                <Text style={{ color: COLORS.primary, ...FONTS.h2 }}>{header}</Text>
                <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>{sub}</Text>
            </View>
        </View>
    )
}
