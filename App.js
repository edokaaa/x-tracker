import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './navigation/AuthStack';

// fonts
import { useFonts } from 'expo-font';

function App() {
    // fonts config
    const [fontsLoaded] = useFonts({
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    });

    if (!fontsLoaded) {
        return undefined;
    }

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}

export default App;
