import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Alert,
    TouchableOpacity,
    Image,
} from 'react-native';
import {
    TextInput,
    Button,
    Card,
    Title,
    Text,
    Avatar,
    ActivityIndicator,
    Divider,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/slices/employeeSlice';
import { validateEmail, validatePhone, validateName, validateRequired } from '../utils/validation';

const EmployeeFormScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        avatar: null,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};

        if (!validateName(formData.name)) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!validateRequired(formData.department)) {
            newErrors.department = 'Department is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    };

    const selectImage = () => {
        Alert.alert(
            'Select Profile Photo',
            'Choose how you want to add a photo',
            [
                { text: 'Camera', onPress: openCamera },
                { text: 'Photo Library', onPress: openGallery },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        );
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo',
        }).then(image => {
            setFormData(prev => ({
                ...prev,
                avatar: image.path,
            }));
        }).catch(err => {
            console.log('Camera error:', err);
        });
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo',
        }).then(image => {
            setFormData(prev => ({
                ...prev,
                avatar: image.path,
            }));
        }).catch(err => {
            console.log('Gallery error:', err);
        });
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const newEmployee = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                department: formData.department,
                company: 'Demo Company',
                status: 'Active',
                avatar: formData.avatar,
            };

            dispatch(addEmployee(newEmployee));
            setLoading(false);

            Alert.alert(
                'Success',
                'Employee added successfully!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack(),
                    },
                ]
            );
        }, 1500);
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Card style={styles.card}>
                <Card.Content style={styles.cardContent}>
                    <Title style={styles.title}>Add New Employee</Title>
                    <Text style={styles.subtitle}>Fill in the employee details below</Text>

                    <Divider style={styles.divider} />

                    <View style={styles.avatarSection}>
                        <TouchableOpacity onPress={selectImage} style={styles.avatarButton}>
                            {formData.avatar ? (
                                <Image source={{ uri: formData.avatar }} style={styles.avatarImage} />
                            ) : (
                                <Avatar.Icon
                                    size={100}
                                    icon="camera-plus"
                                    style={styles.avatarPlaceholder}
                                />
                            )}
                        </TouchableOpacity>
                        <Text style={styles.avatarText}>Tap to add profile photo</Text>
                    </View>

                    <View style={styles.formSection}>
                        <TextInput
                            label="Full Name"
                            value={formData.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                            style={styles.input}
                            mode="outlined"
                            error={!!errors.name}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

                        <TextInput
                            label="Email Address"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            error={!!errors.email}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                        <TextInput
                            label="Phone Number"
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="phone-pad"
                            error={!!errors.phone}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

                        <TextInput
                            label="Department"
                            value={formData.department}
                            onChangeText={(text) => handleInputChange('department', text)}
                            style={styles.input}
                            mode="outlined"
                            error={!!errors.department}
                            disabled={loading}
                            outlineColor="#E1E8ED"
                            activeOutlineColor="#4A90E2"
                        />
                        {errors.department && <Text style={styles.errorText}>{errors.department}</Text>}

                        <Button
                            mode="contained"
                            onPress={handleSubmit}
                            style={styles.submitButton}
                            disabled={loading}
                            contentStyle={styles.buttonContent}
                            buttonColor="#4A90E2">
                            {loading ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                'Add Employee'
                            )}
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFC',
    },
    card: {
        margin: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
    },
    cardContent: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#2C3E50',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#7F8C8D',
        textAlign: 'center',
        marginBottom: 16,
    },
    divider: {
        marginBottom: 24,
        backgroundColor: '#E1E8ED',
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarButton: {
        borderRadius: 50,
        overflow: 'hidden',
        marginBottom: 12,
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    avatarPlaceholder: {
        backgroundColor: '#F8F9FA',
    },
    avatarText: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    formSection: {
        gap: 8,
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
    submitButton: {
        marginTop: 24,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 12,
    },
});

export default EmployeeFormScreen;