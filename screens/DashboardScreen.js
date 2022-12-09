import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Avatar, ListItem} from 'react-native-elements';
import {AntDesign, Feather, FontAwesome5} from '@expo/vector-icons';
import CustomListItem from '../components/CustomListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../data/Database';
import { COLORS, FONTS } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';



const HomeScreen = ({navigation}) => {
    const [transactions, setTransactions] = useState([]);
    const [user, setUser] = useState(undefined);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const [txTypeLenght, setTxTypeLength] = useState(0);

    // total
    const getTypeTotal = (typeId) => {
        let sum = 0;
        let filtered = [...transactions].filter(tx => tx.type_id === typeId);
    
        for (let tx = 0; tx < filtered.length; tx++) {
            sum = sum + filtered[tx].price
        }
        // console.log(sum)
        return sum;
    }
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
        setTotalIncome(getTypeTotal(1));
        setTotalExpense(getTypeTotal(2));
        setTotalBalance(totalIncome - totalExpense);
    }, [transactions]);
    
    
    
  useEffect(() => {
    // get user
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM users', null,
        (txObj, resultSet) => {
            setUser(resultSet.rows._array[0]);
        },
        (txObj, error) => console.log(error));
    });
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM tx_types', null,
            (txObj, resultSet) => {
                setTxTypeLength(resultSet.rows._array.length);
                // console.log(resultSet.rows._array);
            },
            (txObj, error) => console.log(error)
        );
    })
}, []);


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
              {user?.username}
            </Text>
          </View>
        </View>
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
          <ScrollView style={styles.recentTransactions}>
            {transactions?.slice(-5).sort((a, b)=> b.id - a.id).map((transaction) => (
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
