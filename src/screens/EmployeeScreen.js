import React, { useEffect } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
} from 'react-native';
import {
    Card,
    Title,
    Paragraph,
    ActivityIndicator,
    FAB,
    Avatar,
    Text,
    Chip,
    Searchbar,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
} from '../store/slices/employeeSlice';
import { apiService } from '../services/api';

const EmployeeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector(state => state.employee);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        dispatch(fetchEmployeesStart());
        try {
            const users = await apiService.fetchUsers();
            const formattedEmployees = users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                company: user.company.name,
                department: getDepartment(user.id),
                status: getStatus(user.id),
            }));
            dispatch(fetchEmployeesSuccess(formattedEmployees));
        } catch (err) {
            dispatch(fetchEmployeesFailure(err.message));
        }
    };

    const getDepartment = (id) => {
        const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
        return departments[id % departments.length];
    };

    const getStatus = (id) => {
        return id % 3 === 0 ? 'Inactive' : 'Active';
    };

    const renderEmployee = ({ item }) => (
        <Card style={styles.employeeCard}>
            <Card.Content style={styles.cardContent}>
                <View style={styles.employeeHeader}>
                    <Avatar.Text
                        size={56}
                        label={item.name.charAt(0)}
                        style={styles.avatar}
                        labelStyle={styles.avatarLabel}
                    />
                    <View style={styles.employeeInfo}>
                        <Title style={styles.employeeName}>{item.name}</Title>
                        <Paragraph style={styles.employeeEmail}>{item.email}</Paragraph>

                        <View style={styles.chipContainer}>
                            <Chip
                                mode="flat"
                                compact
                                style={styles.departmentChip}
                                textStyle={styles.chipText}>
                                {item.department}
                            </Chip>
                            <Chip
                                mode="flat"
                                compact
                                style={[
                                    styles.statusChip,
                                    item.status === 'Active' ? styles.activeChip : styles.inactiveChip
                                ]}
                                textStyle={styles.chipText}>
                                {item.status}
                            </Chip>
                        </View>
                    </View>
                </View>

                <View style={styles.contactInfo}>
                    <Text style={styles.contactText}>📞 {item.phone}</Text>
                    <Text style={styles.contactText}>🏢 {item.company}</Text>
                </View>
            </Card.Content>
        </Card>
    );

    if (loading && employees.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Loading employees...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={employees}
                renderItem={renderEmployee}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={loadEmployees}
                        colors={['#4A90E2']}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('EmployeeForm')}
                color="#FFFFFF"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFC',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFBFC',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#7F8C8D',
    },
    listContainer: {
        padding: 16,
    },
    employeeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
    },
    cardContent: {
        padding: 20,
    },
    employeeHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    avatar: {
        backgroundColor: '#4A90E2',
        marginRight: 16,
    },
    avatarLabel: {
        fontSize: 20,
        fontWeight: '600',
    },
    employeeInfo: {
        flex: 1,
    },
    employeeName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C3E50',
        marginBottom: 4,
    },
    employeeEmail: {
        fontSize: 14,
        color: '#7F8C8D',
        marginBottom: 12,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    departmentChip: {
        backgroundColor: '#F8F9FA',
        marginRight: 8,
        marginBottom: 4,
    },
    statusChip: {
        marginBottom: 4,
    },
    activeChip: {
        backgroundColor: '#D4EDDA',
    },
    inactiveChip: {
        backgroundColor: '#FFF3CD',
    },
    chipText: {
        fontSize: 12,
        fontWeight: '500',
    },
    contactInfo: {
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#E1E8ED',
    },
    contactText: {
        fontSize: 14,
        color: '#6C757D',
        marginBottom: 4,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#4A90E2',
    },
});

export default EmployeeScreen;