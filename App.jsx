import React from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import store from './src/store/store';

const theme = {
  colors: {
    primary: '#4A90E2',
    accent: '#50E3C2',
    background: '#FAFBFC',
    surface: '#FFFFFF',
    text: '#2C3E50',
    disabled: '#BDC3C7',
    placeholder: '#7F8C8D',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    onSurface: '#2C3E50',
    notification: '#E74C3C',
    success: '#27AE60',
    warning: '#F39C12',
  },
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <StatusBar 
          barStyle="light-content" 
          backgroundColor="#4A90E2" 
          translucent={false}
        />
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
};

export default App;