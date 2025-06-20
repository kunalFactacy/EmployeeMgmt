import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import {
    TextInput,
    Button,
    Title,
    Card,
    ActivityIndicator,
    Text,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const validateForm = () => {
        const newErrors = {};

        if (!username.trim()) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = () => {
        if (!validateForm()) {
            return;
        }

        dispatch(loginStart());

        setTimeout(() => {
            if (username === 'admin' && password === 'password') {
                dispatch(loginSuccess({ username }));
            } else {
                dispatch(loginFailure());
                Alert.alert('Error', 'Invalid credentials. Try admin/password');
            }
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Title style={styles.title}>Welcome Back</Title>
                    <Text style={styles.subtitle}>Sign in to your account</Text>
                </View>

                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <TextInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.input}
                            mode="outlined"
                            error={!!errors.username}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.username && (
                            <Text style={styles.errorText}>{errors.username}</Text>
                        )}

                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={styles.input}
                            mode="outlined"
                            error={!!errors.password}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.password && (
                            <Text style={styles.errorText}>{errors.password}</Text>
                        )}

                        <Button
                            mode="contained"
                            onPress={handleLogin}
                            style={styles.button}
                            disabled={loading}
                            contentStyle={styles.buttonContent}
                            buttonColor="#4A90E2">
                            {loading ? <ActivityIndicator color="white" size="small" /> : 'Sign In'}
                        </Button>

                        <View style={styles.hintContainer}>
                            <Text style={styles.hint}>Demo credentials: admin / password</Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFC',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    cardContent: {
        padding: 24,
    },
    input: {
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
    },
    errorText: {
        color: '#E74C3C',
        fontSize: 12,
        marginBottom: 16,
        marginLeft: 4,
    },
    button: {
        marginTop: 24,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 12,
    },
    hintContainer: {
        marginTop: 20,
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        alignItems: 'center',
    },
    hint: {
        fontSize: 14,
        color: '#6C757D',
        fontStyle: 'italic',
    },
});

export default LoginScreen;