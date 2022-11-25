import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, TouchableOpacity} from 'react-native'
import {Text, Avatar, ListItem} from 'react-native-elements'
// import {auth, db} from '../firebase'
import {StatusBar} from 'expo-status-bar'

import {AntDesign, Feather, FontAwesome5} from '@expo/vector-icons'
import CustomListItem from '../components/CustomListItem'

import tx from '../data/Transactions'
import { SafeAreaView } from 'react-native-safe-area-context'

import { COLORS, FONTS } from '../constants';
import { ScrollView } from 'react-native-gesture-handler'



const HomeScreen = ({navigation}) => {

  // transactions
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    // setTransactions(tx.transactions);
    setTransactions([]);
    setTotalIncome(tx.transactions.map((item) => {
        item?.type == 'income'
        ? 1000
        : 0
    }));
    setTotalExpense(tx.transactions.map((item) => {
        item?.type == 'expense'
        ? 500
        : 0
    }));
    
    // const unsubscribe = db
    //   .collection('expense')
    //   .orderBy('timestamp', 'desc')
    //   .onSnapshot(
    //     (snapshot) =>
    //       setTransactions(
    //         snapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           data: doc.data(),
    //         }))
    //       ) &
    //       setTotalIncome(
    //         snapshot.docs.map((doc) =>
    //           doc.data()?.email === auth.currentUser.email &&
    //           doc.data()?.type == 'income'
    //             ? doc.data().price
    //             : 0
    //         )
    //       ) &
    //       setTotalExpense(
    //         snapshot.docs.map((doc) =>
    //           doc.data()?.email === auth.currentUser.email &&
    //           doc.data()?.type == 'expense'
    //             ? doc.data().price
    //             : 0
    //         )
    //       )
    //   )

    // return unsubscribe
  }, [])

  // stufff
  const [totalIncome, setTotalIncome] = useState([])
  const [income, setIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState([])
  const [expense, setExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)
  useEffect(() => {
    if (totalIncome) {
      if (totalIncome?.length == 0) {
        setIncome(0)
      } else {
        setIncome(totalIncome?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0)
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
  }, [totalIncome, totalExpense, income, expense])

  useEffect(() => {
    if (income || expense) {
      setTotalBalance(income - expense)
    } else {
      setTotalBalance(0)
    }
  }, [totalIncome, totalExpense, income, expense])

//   const [filter, setFilter] = useState([])
//   useEffect(() => {
//     if (transactions) {
//       setFilter(
//         transactions.filter(
//           (transaction) => transaction.data.email === auth.currentUser.email
//         )
//       )
//     }
//   }, [transactions])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.fullName}>
          {/* <Avatar
            size='medium'
            rounded
            source={{
            //   uri: auth?.currentUser?.photoURL,
            }}
          /> */}
          <View style={{marginLeft: 10}}>
            <Text style={{...FONTS.body1}}>Welcome,</Text>
            <Text style={{...FONTS.largeTitle}}>
              {/* {auth.currentUser.displayName} */}
              {"edoka"}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={{textAlign: 'center', color: COLORS.white, ...FONTS.body2}}>
              Total Balance
            </Text>
            <Text h3 style={{textAlign: 'center', color: COLORS.white, ...FONTS.h1}}>
              $ {totalBalance.toFixed(2)}
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
                {`$ ${income?.toFixed(2)}`}
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
                {`$ ${expense?.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.recentTitle}>
          <Text h4 style={{color: '#4A2D5D'}}>
            Recent Transactions
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Transactions')}
          >
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {transactions?.length > 0 ? (
          <View style={styles.recentTransactions}>
            {transactions?.slice(0, 3).map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.containerNull}>
            <FontAwesome5 name='list-alt' size={24} color={COLORS.secondary} />
            <Text style={{color: COLORS.primary, ...FONTS.body2}}>
              No Transactions
            </Text>
          </View>
        )}
      {/* </View> */}
      </SafeAreaView>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
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
  recentTransactions: {
    backgroundColor: 'white',
    width: '100%',
  },
  seeAll: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  containerNull: {
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
    width: '100%',
  },
})
