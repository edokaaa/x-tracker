import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

// data
import { categoriesData } from '../data/DummyData'


export default function CategoryHeaderSection() {
    const [categories, setCategories] = React.useState(categoriesData)
    const [viewMode, setViewMode] = React.useState("chart")

    return (
        <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Title */}
            <View>
                <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>CATEGORIES</Text>
                <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{categories.length} Total</Text>
            </View>

            {/* Button */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
                        height: 50,
                        width: 50,
                        borderRadius: 25
                    }}
                    onPress={() => setViewMode("chart")}
                >
                    <Image
                        source={icons.chart}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: viewMode == "list" ? COLORS.secondary : null,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        marginLeft: SIZES.base
                    }}
                    onPress={() => setViewMode("list")}
                >
                    <Image
                        source={icons.menu}
                        resizeMode="contain"
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}
