import React, {useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {ListItem, Text, Divider} from 'react-native-elements'
import {MaterialIcons} from '@expo/vector-icons'
import ModalActions from './ModalActions'

import moment from 'moment'

const CustomListItem = ({transaction, navigation, id, category}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View>
        <ListItem onPress={() => setModalVisible(true)}>
          {transaction?.type_id === 2 ? (
            <View style={styles.left}>
              <MaterialIcons name='money-off' size={24} color='white' />
            </View>
          ) : (
            <View style={styles.income}>
              <MaterialIcons name='attach-money' size={24} color='white' />
            </View>
          )}
          <ListItem.Content>
            <ListItem.Title
              style={{fontWeight: 'bold', textTransform: 'capitalize'}}
            >
              {transaction?.description}
            </ListItem.Title>
            <ListItem.Subtitle>
              {moment(transaction?.addedtime).format("DD MMM YYYY")}
            </ListItem.Subtitle>
            <ListItem.Subtitle>
              {category?.name}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            {transaction?.type_id === 2 ? (
              <Text style={styles.right}>
                - ${Number(transaction?.price)?.toFixed(2)}
              </Text>
            ) : (
              <Text style={styles.rightIncome}>
                ${Number(transaction?.price)?.toFixed(2)}
              </Text>
            )}
          </View>
        </ListItem>
        <Divider style={{backgroundColor: 'lightgrey'}} />
      </View>
      <ModalActions
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
      />
    </>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#533461',
    borderRadius: 8,
    padding: 10,
  },

  income: {
    backgroundColor: '#61ACB8',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: 'red',
  },
  rightIncome: {
    fontWeight: 'bold',
    color: 'green',
  },
})
