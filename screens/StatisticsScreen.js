import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Platform,
    Modal
} from 'react-native';

import {AntDesign, Feather, FontAwesome5} from '@expo/vector-icons';

import { VictoryPie } from 'victory-native';

import {Svg} from 'react-native-svg';

import { COLORS, FONTS, SIZES } from '../constants';

// components

import RenderHeader from "../components/ScreenHeader";

// data
import { db, getTypeTotal } from '../data/Database';

const StatisticsScreen = () => {
    const [categories, setCategories] = useState([])
    const [transactions, setTransactions] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const [majorEx, setMajorExCat] = useState(undefined);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        // get all transactions
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM transactions', null,
                (txObj, resultSet) => {
                    setTransactions(resultSet.rows._array);
                },
                (txObj, error) => console.log(error)
            );
        });
        
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM categories', null,
                (txObj, resultSet) => {
                    setCategories(resultSet.rows._array);
                },
                (txObj, error) => console.log(error)
            );
        });
        setTotalIncome(getTypeTotal(1, transactions));
        setTotalExpense(getTypeTotal(2, transactions));
        setTotalBalance(totalIncome - totalExpense);

    }, [transactions]);

    function getMax() {
        let items = processCategoryDataToDisplay();
        let max = 0;
        let maxCat = undefined;
        for (let i = 0; i < items.length; i++) {
            if (items[i].y > max) {
                max = items[i].y;
                maxCat = items[i]
            }
            
        }
        return maxCat;

    }

    function processCategoryDataToDisplay() {
        // Filter expenses with "Confirmed" status
        let chartData = categories.map((item) => {
            let confirmExpenses = transactions.filter(tx => tx.type_id == 2 && tx.category_id == item.id);
            var total = confirmExpenses.reduce((a, b) => a + (b.price || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        // filter out categories with no data/expenses
        let filterChartData = chartData.filter(a => a.y > 0)

        // Calculate the total expenses
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        // Calculate percentage and repopulate chart data
        let finalChartData = filterChartData.map((item) => {
            // if (majorEx) {
            //     if (item.y > majorEx.y) {
            //         setMajorExCat(item);
            //     }
            // } else {
            //     setMajorExCat(item);
            // }
            // setMajorExCat(item);
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })

        return finalChartData
    }

    function setSelectCategoryByName(name) {
        let category = categories.filter(a => a.name == name)
        setSelectedCategory(category[0])
    }

    function renderChart() {

        let chartData = processCategoryDataToDisplay()
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        console.log("Check Chart")
        console.log(chartData)

        if(Platform.OS == 'ios')
        {
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <VictoryPie
                        
                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white",  },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}
    
                    />
    
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                    </View>
                </View>
    
            )
        }
        else
        {
            // Android workaround by wrapping VictoryPie with SVG
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                        <VictoryPie
                            standalone={false} // Android workaround
                            data={chartData}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedCategory && selectedCategory.name == datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                            innerRadius={70}
                            labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                            style={{
                                labels: { fill: "white" },
                                parent: {
                                    ...styles.shadow
                                },
                            }}
                            width={SIZES.width}
                            height={SIZES.width}
                            colorScale={colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let categoryName = chartData[props.index].name
                                                setSelectCategoryByName(categoryName)
                                            }
                                        }]
                                    }
                                }
                            }]}
        
                        />
                    </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Expenses</Text>
                    </View>
                </View>
            )
        }
        
    }

    function renderExpenseSummary() {
        let data = processCategoryDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? item.color : COLORS.white
                }}
                onPress={() => {
                    let categoryName = item.name
                    setSelectCategoryByName(categoryName)
                }}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                {/* Expenses */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedCategory && selectedCategory.name == item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>N{item.y} - {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: SIZES.padding}}>
                <FlatList
                    // ListHeaderComponent={renderChart()}
                    // ListHeaderComponent={
                    //     <>
                    //     </>
                    // }
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
            <RenderHeader header={'Statistics'} sub={'Summary'}/>
            <Modal
                    // animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // margin: 0,

                    }}
                    
                >
                    <View style={{
                        backgroundColor: 'white',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'flex-center',
                        padding: 10,
                    }}>
                        {renderChart()}
                        <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={{...FONTS.h4}}>
                            Close
                        </Text>

                    </TouchableOpacity>

                    </View>
                        

                </Modal>

            <View style={{ marginBottom: 200}}>
            <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{textAlign: 'center', color: COLORS.white, ...FONTS.body2}}>
              Total Balance
            </Text>
            <Text h3 style={{textAlign: 'center', color: COLORS.white, ...FONTS.h1}}>
              N {totalBalance?.toFixed(2)}
            </Text>
          </View>
          <View style={styles.cardBottom}>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name='arrow-down' size={24} color={COLORS.green} />
                <Text
                  style={{
                    textAlign: 'center',
                    marginLeft: 5,
                    ...FONTS.body2
                  }}
                >
                  Income
                </Text>
              </View>
              <Text style={{textAlign: 'center', ...FONTS.h2}}>
                {`N ${totalIncome?.toFixed(2)}`}
              </Text>
            </View>
            <View>
              <View style={styles.cardBottomSame}>
                <Feather name='arrow-up' size={24} color='red' />
                <Text style={{textAlign: 'center', marginLeft: 5}}>
                  Expense
                </Text>
              </View>
              <Text style={{textAlign: 'center', ...FONTS.h2}}>
                {`N ${totalExpense?.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>
                {renderExpenseSummary()}
                <View style={{...styles.result, marginBottom: 200}}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={{...FONTS.h1}}>
                            View Chart
                        </Text>

                    </TouchableOpacity>
                    {/* <Text style={{...FONTS.h3}}>
                        Your major expense category is
                    </Text>
                    <Text style={{...FONTS.h1}}>
                        at
                        {majorEx.name} at {majorEx.label}
                    </Text> */}
                </View>
            </View>
        </View>

    )
}

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
    },
    result: {
        alignItems: "center"
    },
    container: {
      backgroundColor: 'white',
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 10,
    },
    fullName: {
      flexDirection: 'row',
    },
    card: {
      backgroundColor: COLORS.primary,
      alignItems: 'center',
      width: '100%',
      padding: 20,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
      marginVertical: 20,
    },
    cardTop: {
      // backgroundColor: 'blue',
      marginBottom: 20,
    },
    cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
      margin: 'auto',
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 10,
    },
    cardBottomSame: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    recentTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    containerNull: {
      alignItems: 'center',
      marginTop: 50,
      flex: 1,
      width: '100%',
    },
})

export default StatisticsScreen;

