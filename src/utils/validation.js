export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const trimmedEmail = email.trim().toLowerCase();
  
  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }
  
  if (trimmedEmail.length > 254) {
    return false;
  }
  
  if (trimmedEmail.includes('..')) {
    return false;
  }
  
  return true;
};

export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  
  const cleanPhone = phone.replace(/\D/g, '');
  

  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(cleanPhone);
};

export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return false;
  }
  
  const trimmedName = name.trim();
  
  if (trimmedName.length < 2) {
    return false;
  }
  
  if (trimmedName.length > 50) {
    return false;
  }
  
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  return nameRegex.test(trimmedName);
};


export const validateRequired = (value) => {
  if (value === null || value === undefined) {
    return false;
  }
  
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  
  return true;
};

export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return false;
  }
  
  if (password.length < 6) {
    return false;
  }
  
  if (password.length > 128) {
    return false;
  }
  
  if (password !== password.trim()) {
    return false;
  }
  
  return true;
};

export const validateUsername = (username) => {
  if (!username || typeof username !== 'string') {
    return false;
  }
  
  const trimmedUsername = username.trim();
  
  if (trimmedUsername.length < 3 || trimmedUsername.length > 20) {
    return false;
  }
  
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  return usernameRegex.test(trimmedUsername);
};


export const validateDepartment = (department) => {
  if (!department || typeof department !== 'string') {
    return false;
  }
  
  const validDepartments = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Finance',
    'Operations',
    'Design',
    'Product',
    'Support',
    'Legal',
    'Administration'
  ];
  
  const trimmedDepartment = department.trim();
  return trimmedDepartment.length > 0 && trimmedDepartment.length <= 30;
};

export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateAge = (age) => {
  const numAge = typeof age === 'string' ? parseInt(age, 10) : age;
  
  if (isNaN(numAge)) {
    return false;
  }
  
  return numAge >= 18 && numAge <= 100;
};

export const validateDate = (dateString) => {
  if (!dateString || typeof dateString !== 'string') {
    return false;
  }
  
  const date = new Date(dateString);
  const today = new Date();
  
  if (isNaN(date.getTime())) {
    return false;
  }
  
  if (date > today) {
    return false;
  }
  
  return true;
};

export const validateSalary = (salary) => {
  const numSalary = typeof salary === 'string' ? parseFloat(salary) : salary;
  
  if (isNaN(numSalary)) {
    return false;
  }
  
  return numSalary >= 1000 && numSalary <= 1000000;
};


export const validateEmployeeId = (employeeId) => {
  if (!employeeId || typeof employeeId !== 'string') {
    return false;
  }
  
  const trimmedId = employeeId.trim();
  
  if (trimmedId.length < 3 || trimmedId.length > 15) {
    return false;
  }
  
  const idRegex = /^[a-zA-Z0-9]+$/;
  return idRegex.test(trimmedId);
};


export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  validationRules.forEach(rule => {
    const { field, validator, message } = rule;
    const value = formData[field];
    
    if (!validator(value)) {
      errors[field] = message;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};


export const validateEmployeeForm = (employeeData) => {
  const validationRules = [
    {
      field: 'name',
      validator: validateName,
      message: 'Name must be at least 2 characters and contain only letters'
    },
    {
      field: 'email',
      validator: validateEmail,
      message: 'Please enter a valid email address'
    },
    {
      field: 'phone',
      validator: validatePhone,
      message: 'Please enter a valid 10-digit phone number'
    },
    {
      field: 'department',
      validator: validateRequired,
      message: 'Department is required'
    }
  ];
  
  return validateForm(employeeData, validationRules);
};


export const validateLoginForm = (loginData) => {
  const validationRules = [
    {
      field: 'username',
      validator: validateUsername,
      message: 'Username must be at least 3 characters'
    },
    {
      field: 'password',
      validator: validatePassword,
      message: 'Password must be at least 6 characters'
    }
  ];
  
  return validateForm(loginData, validationRules);
};


export const sanitizeInput = (input) => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>\"']/g, '')
    .replace(/\s+/g, ' ');
};


export const formatPhone = (phone) => {
  if (!phone) return '';
  
  const cleanPhone = phone.replace(/\D/g, '');
  
  if (cleanPhone.length === 10) {
    return `(${cleanPhone.slice(0, 3)}) ${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6)}`;
  }
  
  return phone;
};


export const capitalizeWords = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }
  
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};