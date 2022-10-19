import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';
// import AppStack from './navigation/AppStack';

function App() {
    return (
        <NavigationContainer>
            <AuthStack />
            {/* <AppStack /> */}
        </NavigationContainer>
    );
}

export default App;
