import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Modal from 'react-native-modal'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';



export default function TransactionModel() {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        // <>
        //     {/* <Button onPress={() => {setModalVisible(true)}}
        //         icon={
        //             <Ionicons 
        //                 ame={'add-circle'}
        //                 size={23}
        //                 color={COLORS.secondary}
        //             />
        //         }
        //     /> */}
            <View>
                <Modal
                    backdropOpacity={0.3}
                    isVisible={modalVisible}
                    onBackdropPress={() => setModalVisible(false)}
                    style={styles.contentView}
                >
                    <View>
                        {/* Transaction */}
                        <Text style={styles.contentTitle}>Hi 👋!</Text>
                        <Text>Hello from Overlay!</Text>
                    </View>
                </Modal>
            </View>
        // </>
    );
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  contentView: {
    justifyContent: 'flex-end',
    margin: 0,
  },
	buttonStyle: {
    height: 90,
    width: 90,
    backgroundColor: COLORS.primary,
    borderRadius: 100
  }
});

// const getHeaderTitle = (route) => {
//     const routeName =
//       route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;
//     switch (routeName) {
//       case 'Transaction':
//         return 'Transaction';
//       case 'Pay':
//         return 'Payment';
//       case 'Setting':
//         return 'Setting Payment';
//       case 'SetDefault':
//         return 'Set Payment Default';
//     }
//   };