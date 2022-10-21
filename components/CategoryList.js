import React, { useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Animated,
} from 'react-native';

import { COLORS, FONTS, SIZES, icons, images } from '../constants';

// data
import categoriesData from "../data/DummyData";

export default function CategoryList() {
    const styles = StyleSheet.create({
        shadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 2,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
        }
    })

    const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

    const [categories, setCategories] = React.useState(categoriesData)
    const [showMoreToggle, setShowMoreToggle] = React.useState(false)

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => setSelectedCategory(item)}
            style={{
                flex: 1,
                flexDirection: 'row',
                margin: 5,
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                borderRadius: 5,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}
        >
            <Image
                source={item.icon}
                style={{
                    width: 20,
                    height: 20,
                    tintColor: item.color
                }}
            />
            <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
            <Animated.View style={{ height: categoryListHeightAnimationValue }}>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    numColumns={2}
                />
            </Animated.View>

            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    marginVertical: SIZES.base,
                    justifyContent: 'center'
                }}
                onPress={() => {
                    if (showMoreToggle) {
                        Animated.timing(categoryListHeightAnimationValue, {
                            toValue: 115,
                            duration: 500,
                            useNativeDriver: false
                        }).start()
                    } else {
                        Animated.timing(categoryListHeightAnimationValue, {
                            toValue: 172.5,
                            duration: 500,
                            useNativeDriver: false
                        }).start()
                    }

                    setShowMoreToggle(!showMoreToggle)
                }}
            >
                <Text style={{ ...FONTS.body4 }}>{showMoreToggle ? "LESS" : "MORE"}</Text>
                <Image
                    source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                    style={{ marginLeft: 5, width: 15, height: 15, alignSelf: 'center' }}
                />
            </TouchableOpacity>
        </View>
    )
}
