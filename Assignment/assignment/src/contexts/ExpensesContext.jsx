import { createContext, useCallback, useEffect, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";
import { addExpense, deleteExpense, getExpensesByUserId, updateExpense } from "../services/api";

const ExpensesContext = createContext();

const initialState = {
    expenses: [],
    loading: false,
    error: null,
};

function expensesReducer(state, action) {
    switch (action.type) {
        case 'START_OPERATION':
            return { ...state, loading: true, error: null};

        case 'FAILURE_OPERATION':
            return { ...state, loading: false, error: action.payload};

        case 'FETCH_SUCCESS':
            return { ...state, loading: false, expenses: action.payload, error: null};
        
        case 'ADD_SUCCESS':
            return{ ...state, loading: false,
                expenses: [ ...state.expenses, action.payload]
            };

        case 'UPDATE_SUCCESS':
            return{ ...state, loading: false,
                expenses: state.expenses.map(expense =>
                    expense.id === action.payload.id ? action.payload : expense
                )
            };

        case 'DELETE_SUCCESS':
            return { ...state, loading: false,
                expenses: state.expenses.filter(expense =>
                    expense.id !== action.payload.id
                )
            };

        default:
            return state;
    }
}

export const ExpensesProvider = ({children}) => {
    const [state, dispatch] = useReducer(expensesReducer, initialState);

    const {user} = useAuth();
    const userId = user?.id;

    const fetchExpenses = useCallback(async (targetUserId) => {
        const resolvedUserId = targetUserId ?? userId;

        if (!resolvedUserId) {
            dispatch({ type: 'FETCH_SUCCESS', payload: [] });
            return { success: true, expenses: [] };
        }

        dispatch ({ type: 'START_OPERATION'}); 
        try {
            const data = await getExpensesByUserId(resolvedUserId);
            dispatch ({ type: 'FETCH_SUCCESS', payload: data});
            return { success: true, expenses: data };
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi tải danh sách.';
            dispatch ({ 
                type: 'FAILURE_OPERATION',
                payload: errorMessage});
            return { success: false, error: errorMessage };
        }
    }, [userId]);

    useEffect(() => {
        fetchExpenses(userId);
    }, [userId, fetchExpenses]);

    const addExpenseAction = async (newExpenseData) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            const newExpense = await addExpense(newExpenseData);
            dispatch ({ type: 'ADD_SUCCESS', payload: newExpense});
            return {success: true, expenses: newExpense};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi thêm thanh toán.';
            dispatch ({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage }
        }
    }

    const updateAction = async (expensesId, updateData) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            const updatedExpense = await updateExpense(expensesId, updateData);
            dispatch ({ type: 'UPDATE_SUCCESS', payload: updatedExpense});
            return {success: true, expenses: updatedExpense};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi cập nhật.';
            dispatch ({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage }
        }
    }

    const deleteAction = async (expensesId) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            await deleteExpense(expensesId);
            dispatch ({ type: 'DELETE_SUCCESS', payload: {id: expensesId }});
            return { success: true};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi xóa.';
            dispatch({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage}
        }
    }

    const contextValue = {
        expenses: state.expenses,
        loading: state.loading,
        error: state.error,
        fetchExpenses,
        addExpense: addExpenseAction, 
        updateExpense: updateAction,
        deleteExpense: deleteAction,
    };

    return (
        <ExpensesContext.Provider value={contextValue}>
            {children}
        </ExpensesContext.Provider>
    );

}

export default ExpensesContext;