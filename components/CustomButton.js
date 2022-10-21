import React from 'react';

import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function CustomButton({
    label='None',
    onPress=() => {},
    justifyContent='center',
    textColor=COLORS.white,
    backgroundColor=COLORS.secondary,
    padding=20,
    width='90%',
    iconName=null,
    iconColor=COLORS.white,
    }) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: backgroundColor,
                padding: padding,
                width: width,
                borderRadius: 10,
                marginBottom: 30,
                flexDirection: 'row',
                justifyContent: justifyContent,
            }}
            onPress={onPress}>
            <Text
                style={{
                    color: textColor,
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>
                {label}
            </Text>
            {
                iconName != null &&
                <MaterialIcons style={{
                    color: iconColor,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    }}
                    name={iconName} size={22}/>
            } 
        </TouchableOpacity>
    );
}