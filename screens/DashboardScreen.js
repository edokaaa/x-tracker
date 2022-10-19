import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
    View,
    Text,
} from 'react-native';
import CustomButton from '../components/CustomButton';

export default function DashboardScreen({navigation}) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>DashboardScreen</Text>
            <CustomButton
                label={'Go to Login'}
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}