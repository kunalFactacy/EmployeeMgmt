import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    Button,
    Appbar,
    Avatar,
    Text,
    Divider,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const HomeScreen = ({ navigation }) => {
    const { username } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const navigateToEmployees = () => {
        navigation.navigate('Employee');
    };

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.Content title="Dashboard" titleStyle={styles.headerTitle} />
                <Text onPress={handleLogout} style={{ color: '#FFFFFF', marginRight: 16 }}>
                    Logout
                </Text>
            </Appbar.Header>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.welcomeSection}>
                    <Avatar.Text
                        size={80}
                        label={username.charAt(0).toUpperCase()}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                    />
                    <Title style={styles.welcomeTitle}>
                        Hello, {username}!
                    </Title>
                    <Paragraph style={styles.welcomeText}>
                        Manage your team efficiently with our employee management system
                    </Paragraph>
                </View>

                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Title style={styles.cardTitle}>Quick Actions</Title>
                        <Divider style={styles.divider} />

                        <Button
                            mode="contained"
                            onPress={navigateToEmployees}
                            style={styles.actionButton}
                            contentStyle={styles.buttonContent}
                            buttonColor="#4A90E2">
                            View All Employees
                        </Button>

                        <Button
                            mode="outlined"
                            onPress={() => navigation.navigate('EmployeeForm')}
                            style={styles.actionButton}
                            contentStyle={styles.buttonContent}
                            textColor="#4A90E2">
                            Add New Employee
                        </Button>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content style={styles.cardContent}>
                        <Title style={styles.cardTitle}>System Overview</Title>
                        <Divider style={styles.divider} />

                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>12</Text>
                                <Text style={styles.statLabel}>Total Employees</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>10</Text>
                                <Text style={styles.statLabel}>Active</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={[styles.statNumber, styles.successText]}>100%</Text>
                                <Text style={styles.statLabel}>System Health</Text>
                            </View>
                        </View>
                    </Card.Content>
                </Card>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFC',
    },
    header: {
        backgroundColor: '#4A90E2',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    welcomeSection: {
        alignItems: 'center',
        paddingVertical: 32,
        marginBottom: 16,
    },
    avatar: {
        backgroundColor: '#4A90E2',
        marginBottom: 16,
    },
    avatarLabel: {
        fontSize: 32,
        fontWeight: '600',
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    welcomeText: {
        fontSize: 16,
        color: '#7F8C8D',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 16,
    },
    cardContent: {
        padding: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 8,
    },
    divider: {
        marginBottom: 20,
        backgroundColor: '#E1E8ED',
    },
    actionButton: {
        marginBottom: 12,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#E1E8ED',
        marginHorizontal: 16,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#7F8C8D',
        textAlign: 'center',
    },
    successText: {
        color: '#27AE60',
    },
});

export default HomeScreen;