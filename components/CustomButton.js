import React from 'react';

import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';

export default function CustomButton({label, onPress,}) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: COLORS.secondary,
                padding: 20,
                width: '90%',
                borderRadius: 10,
                marginBottom: 8,
                flexDirection: 'row',
                justifyContent: 'center',
            }}
            onPress={onPress}>
            <Text
                style={{
                    color: COLORS.white,
                    fontSize: 18,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}