import React, {useEffect, useLayoutEffect, useState} from 'react'
import {ScrollView, StyleSheet, View} from 'react-native'
import CustomListItem from '../components/CustomListItem'
import {Text} from 'react-native-elements'
import {FontAwesome5} from '@expo/vector-icons'

import RenderHeader from '../components/ScreenHeader';
import { COLORS } from '../constants';
import { db } from '../data/Database'


const AllTransactions = ({navigation}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
    })
  }, [])

  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {

    // get all transactions
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM transactions', null,
            (txObj, resultSet) => {
                setTransactions(resultSet.rows._array);
                // console.log(transactions);
            },
            (txObj, error) => console.log(error)
        );
    })
  }, [transactions]);

  return (
    <>
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
        <RenderHeader header={'Transactions'} sub={transactions?.length + ' total'} />
      {transactions?.length > 0 ? (
          <ScrollView style={styles.container}>
            {transactions?.sort((a, b)=> b.id - a.id).map((transaction) => (
              <View key={transaction.id}>
                <CustomListItem
                  transaction={transaction}
                  navigation={navigation}
                  id={transaction.id}
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
