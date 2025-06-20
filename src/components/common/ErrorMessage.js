import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content style={styles.content}>
                    <Text style={styles.title}>Something went wrong</Text>
                    <Text style={styles.message}>{message}</Text>
                    {onRetry && (
                        <Button
                            mode="contained"
                            onPress={onRetry}
                            style={styles.button}
                            buttonColor="#4A90E2">
                            Try Again
                        </Button>
                    )}
                </Card.Content>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FAFBFC',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    content: {
        alignItems: 'center',
        padding: 24,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#E74C3C',
    },
    message: {
        textAlign: 'center',
        marginBottom: 20,
        color: '#7F8C8D',
        fontSize: 14,
    },
    button: {
        marginTop: 8,
        borderRadius: 8,
    },
});

export default ErrorMessage;