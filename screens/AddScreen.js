import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, FlatList, TextInput, Modal, Alert, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import {Picker} from '@react-native-picker/picker'

import RenderHeader from '../components/ScreenHeader';
import { COLORS, FONTS, SIZES } from '../constants';

import CustomButton from '../components/CustomButton'

import { db } from '../data/Database'

import DropDownPicker from 'react-native-dropdown-picker'

const AddScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Expense',
    })
  }, [navigation]);

  const [types, setTypes] = useState([])

  useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM tx_types', null,
        (txObj, resultSet) => {
            setTypes(resultSet.rows._array);
        },
        (txObj, error) => console.log(error))
    });

  }, [types]);

  const [input, setInput] = useState('')
  const [amount, setAmount] = useState('')

  const createTX = () => {
    if (input && amount && selDate && selectedTypeId) {
    //   setSubmitLoading(true);
        db.transaction(tx => {
            tx.executeSql('INSERT INTO transactions (description, type_id, price, addedtime, category_id) values (?, ?, ?, ?, ?)',
            [input, selectedTypeId, amount, selDate.toISOString(), categoryId],
            (txObj, resultSet) => {
                clearInputFields();
                navigation.navigate('Home');
            },
            (txObj, error) => console.log(error));
        });
    } else {
      alert('All fields are mandatory')
    //   setSubmitLoading(false)
    }
  }

  const createCat = () => {
    if (modalInput && catColor) {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO categories (name, icon, color) values (?, ?, ?)',
            [modalInput, '', catColor],
            (txObj, resultSet) => {
                Alert.alert('added successfully');
                setModalInput('');
                setModalVisible(!modalVisible);
            },
            (txObj, error) => console.log(error));
        });
    } else {
      alert('All fields are mandatory')
    //   setSubmitLoading(false)
    }
  }

  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setAmount('')
    setSelDate(new Date())
    setSelectedTypeId(1)
    navigation.navigate('Home')
    // setSubmitLoading(false)
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

  // Select Tx Type
  const [selectedTypeId, setSelectedTypeId] = useState(1)

//   Select category
const [open, setOpen] = useState(false);
const [value, setValue] = useState(null);
const [categories, setCategories] = useState([]);
const [items, setItems] = useState([]);
const [categoryId, setCategoryId] = useState(undefined)

useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('SELECT * FROM categories', null,
        (txObj, resultSet) => {
            setCategories(resultSet.rows._array);
        },
        (txObj, error) => console.log(error))
    });
    let cat_items = []
    categories.map((category) => (
        cat_items.push({label: category.name, value: category.id})
    ));
    setItems(cat_items);
}, [categories]);

const [modalVisible, setModalVisible] = useState(false);
const [modalInput, setModalInput] = useState('');
const [catColor, setCatColor] = useState('');

const renderColors = () => {
        let data = Object.values(COLORS);
        console.log(data);
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    // flexDirection: 'row',
                    height: (catColor && catColor == item) ? 60 : 40,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.white
                    
                }}
                onPress={() => {setCatColor(item)}}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: item,
                            borderRadius: 5
                        }}
                    />
                </View>
            </TouchableOpacity>
        )
        return (
            <View style={{...styles.container, height:500, width: SIZES.width}}>

                <FlatList
                    ListHeaderComponent={
                        <>
                        <Text style={{...FONTS.h2}}>
                            Add New Category
                        </Text>
                        <TextInput
                            style={{...FONTS.h2, ...styles.input}}
                            placeholder='Category Name'
                            value={modalInput}
                            onChangeText={(text) => setModalInput(text)}
                        />
                        <TouchableOpacity
                            onPress={() => {}}
                        >
                            <Text style={{...FONTS.body2}}>Select Color</Text>
                        </TouchableOpacity>

                        </>
                    }
                    contentContainerStyle={{...styles.container}}
                    // ListFooterComponentStyle={{...styles.container}}
                    // ListHeaderComponentStyle={{...styles.container}}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item}`}
                    showsVerticalScrollIndicator={false}
                    // horizontal={true}
                    numColumns={4}
                    ListFooterComponent={
                        <>
                            <CustomButton
                                label={'Add'}
                                onPress={createCat}
                                justifyContent={'center'}
                                width='100%'
                            />

                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{...FONTS.body2}}>Close</Text>
                        </TouchableOpacity>
                        </>

                    }
                    
                />
                </View>
        )
    }


  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightGray2, paddingTop: 20 }}>
        <RenderHeader header={'Add Transactions'} sub={'Enter Transaction Details'} />
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Modal
                    // animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('modal has been closed');
                        setModalVisible(!modalVisible);
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        // margin: 0,

                    }}
                >
                    {/* <View style={{...styles.container, height:500, width: SIZES.width * 0.8}}> */}
                        {/* <Text style={{...FONTS.h2}}>
                            Add New Category
                        </Text>
                        <TextInput
                            style={{...FONTS.h2, ...styles.input}}
                            placeholder='Category Name'
                            value={modalInput}
                            onChangeText={(text) => setModalInput(text)}
                        /> */}
                        {/* <ColorPicker
                            onColorSelected={color => alert(`Color selected: ${color}`)}
                            style={{flex: 1}}
                            sliderComponent={Slider}
                            /> */}
                            {/* {renderColors()} */}

                            {/* <TouchableOpacity
                            onPress={() => {}}
                        >

                            <Text style={{...FONTS.body2}}>Select Color</Text>
                        </TouchableOpacity> */}

                        {renderColors()}

                        {/* <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{...FONTS.body2}}>Close</Text>
                        </TouchableOpacity> */}

                    {/* </View> */}
                </Modal>
                <Picker
                    style={{height: 100, marginBottom: 30}} itemStyle={{height: 150}}
                    selectedValue={selectedTypeId}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedTypeId(itemValue)
                    }
                >
                    {types.map((type) => (
                        <Picker.Item key={type.id} label={type.name} value={type.id} />
                    ))}
                </Picker>

                <TextInput
                style={{...FONTS.h2, ...styles.input}}
                keyboardType='numeric'
                placeholder='Amount'
                value={amount}
                onChangeText={(text) => setAmount(text)}
                />

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
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 20,
                }}>
                    <Text
                        style={{...FONTS.body2, marginBottom: 5}}
                        // editable={false}
                    >
                        Select Category
                    </Text> 
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={{...FONTS.body2}}>Add New</Text>
                    </TouchableOpacity>

                </View>

                <DropDownPicker
                    style={{marginBottom:10}}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    onChangeValue={(value) => setCategoryId(value)}
                />

                <Text
                    style={{...FONTS.h3, ...styles.input}}
                    placeholder='Select Date'
                    value={result}
                    onPress={showDatepicker}
                    // editable={false}
                >
                    Date: {result ? result : new Date()}
                </Text> 

                <CustomButton
                    label={'Add'}
                    onPress={createTX}
                    justifyContent={'center'}
                    width='100%'
                />
            </View>
        </View>
        <View style={{ marginTop: 100}}>

        </View>
</View>
  );
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
    height: 45,
    color: COLORS.primary,
    borderColor: COLORS.primary,
    borderBottomWidth: 2,
    marginBottom: 10,
  }
})
