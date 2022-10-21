import React from 'react';

import { TextInput, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { COLORS, FONTS } from '../constants';


export default function UserInput({placeholder, iconName, isPassword=false}) {
    return (
        <View style={{
            flexDirection: 'row',
            paddingBottom: 8,
        }}>
            <View style={{
                padding: 20,
                backgroundColor: COLORS.lightGray,
                width: '90%',
                borderRadius: 10,
                flexDirection: 'row'
                }}>
                <MaterialIcons
                    name={iconName}
                    size={20}
                    color={COLORS.primary}
                    style={{marginRight: 20}}
                />
                <TextInput
                    placeholder={placeholder}
                    style={{ ...FONTS.h3, flex: 1, paddingVertical: 0}}
                    secureTextEntry={isPassword ? true : false}
                />
            </View>
        </View>
    );
}