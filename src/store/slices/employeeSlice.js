import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        fetchEmployeesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchEmployeesSuccess: (state, action) => {
            state.employees = action.payload;
            state.loading = false;
        },
        fetchEmployeesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
    },
});

export const {
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
    addEmployee,
} = employeeSlice.actions;
export default employeeSlice.reducer;