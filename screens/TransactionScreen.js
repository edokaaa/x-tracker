import React, {useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import CustomListItem from '../components/CustomListItem'
import {Text} from 'react-native-elements'
import {FontAwesome5} from '@expo/vector-icons'

import tx from '../data/Transactions'

import RenderHeader from '../components/ScreenHeader';
import { COLORS } from '../constants';


const AllTransactions = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])

  const [transactions, setTransactions] = useState([])
  useEffect(() => {

//     const unsubscribe = db
//       .collection('expense')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot((snapshot) =>
        setTransactions(tx.transactions);
//           snapshot.docs.map((doc) => ({
//             id: doc.id,
//             data: doc.data(),
//           }))
//         )
//       )

//     return unsubscribe
  }, [])
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
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
        <RenderHeader header={'Transactions'} sub={transactions?.length + ' total'} />
      {transactions?.length > 0 ? (
          <ScrollView style={styles.container}>
            {transactions?.map((info) => (
              <View key={info.id}>
                <CustomListItem
                  info={info}
                  navigation={navigation}
                  id={info.id}
                />
              </View>
            ))}
          </ScrollView>
      ) : (
        <View style={styles.containerNull}>
          <FontAwesome5 name='list-alt' size={24} color='#EF8A76' />
          <Text h4 style={{color: '#4A2D5D'}}>
            No Transactions
          </Text>
        </View>
      )}
    </View>
    </>
  )
}

export default AllTransactions

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
    marginTop: -23,
  },
  containerNull: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
