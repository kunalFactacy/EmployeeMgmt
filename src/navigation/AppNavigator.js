import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EmployeeScreen from '../screens/EmployeeScreen';
import EmployeeFormScreen from '../screens/EmployeeFormScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#4A90E2',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontSize: 18,
                    },
                    headerBackTitleVisible: false,
                }}>
                {!isLoggedIn ? (
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                ) : (
                    <>
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="Employee"
                            component={EmployeeScreen}
                            options={{
                                title: 'Employees',
                                headerStyle: {
                                    backgroundColor: '#4A90E2',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                            }}
                        />
                        <Stack.Screen
                            name="EmployeeForm"
                            component={EmployeeFormScreen}
                            options={{
                                title: 'Add Employee',
                                headerStyle: {
                                    backgroundColor: '#4A90E2',
                                    elevation: 0,
                                    shadowOpacity: 0,
                                },
                            }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;