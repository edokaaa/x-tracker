import React from 'react';
import { COLORS, SIZES, icons } from '../constants';
import {
    View,
    Image,
    TouchableOpacity,
} from 'react-native';


export default function RenderNavBar({back = () => {}, more = () => {}}) {
    return (
        <View
            style={{
                flexDirection: 'row',
                height: 80,
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white,
            }}
        >
            <TouchableOpacity
                style={{ justifyContent: 'center', width: 50, }}
                onPress={back}
            >
                <Image
                    source={icons.back_arrow}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50 }}
                onPress={more}
            >
                <Image
                    source={icons.more}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: COLORS.primary
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

