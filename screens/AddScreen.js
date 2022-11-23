import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, TextInput} from 'react-native'
import {Text, Button} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'

import RenderHeader from '../components/ScreenHeader';
import { COLORS, FONTS } from '../constants';
import { ScrollView } from 'react-native-gesture-handler'

import CustomButton from '../components/CustomButton'


// import {db, auth} from '../firebase'
// import firebase from 'firebase'

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Expense',
    })
  }, [navigation])
  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')
  const createTX = () => {
    if (input && amount && selDate && selectedLanguage) {
      setSubmitLoading(true)
      alert("Transaction added!!!")
//       db.collection('expense')
//         .add({
//           email: auth.currentUser.email,
//           text: input,
//           price: amount,
//           date: selDate,
//           type: selectedLanguage,
//           timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//           userDate: result,
//         })
//         .then(() => clearInputFields())
//         .catch((error) => alert(error.message))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }

  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedLanguage('expense')
    navigation.navigate('Home')
    setSubmitLoading(false)
  }
  // Date Picker
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }
  const result = format(selDate, 'dd/MM/yyyy')

  // Select Dropdown
  const [selectedLanguage, setSelectedLanguage] = useState('expense')

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
        <RenderHeader header={'Add Transactions'} sub={'Enter Transaction Details'} />
    <ScrollView>
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.inputContainer}>
      <Picker
        style={{height: 100, marginBottom: 30}} itemStyle={{height: 150}}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Picker.Item label='Expense' value='expense' />
          <Picker.Item label='Income' value='income' />
        </Picker>

        <TextInput
          style={{...FONTS.h2, ...styles.input}}
          placeholder='Description'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={selDate}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <TextInput
          style={{...FONTS.h2, ...styles.input}}
          keyboardType='numeric'
          placeholder='Amount'
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />

        <Text
          style={{...FONTS.h2, ...styles.input}}
          placeholder='Select Date'
          value={result}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>
      <CustomButton
        label={'Add'}
        onPress={createTX}
        justifyContent={'center'}
        width='100%'
        />
      </View>

    </KeyboardAvoidingView>
    </ScrollView>
    </View>

  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 30,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderBottomWidth: 2,
    marginBottom: 10,
  }
})
