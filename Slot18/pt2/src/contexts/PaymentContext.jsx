import { createContext, useCallback, useEffect, useReducer } from "react";
import { useAuth } from "../hooks/useAuth";
import { addPayment, deletePayment, getPaymentsByUserId, updatePayment } from "../services/API";

const PaymentContext = createContext();

const initialState = {
    payments: [],
    loading: false,
    error: null,
};

function paymentReducer(state, action) {
    switch (action.type) {
        case 'START_OPERATION':
            return { ...state, loading: true, error: null};

        case 'FAILURE_OPERATION':
            return { ...state, loading: false, error: action.payload};

        case 'FETCH_SUCCESS':
            return { ...state, loading: false, payments: action.payload, error: null};
        
        case 'ADD_SUCCESS':
            return{ ...state, loading: false,
                payments: [ ...state.payments, action.payload]
            };

        case 'UPDATE_SUCCESS':
            return{ ...state, loading: false,
                payments: state.payments.map(payment =>
                    payment.id === action.payload.id ? action.payload : payment
                )
            };

        case 'DELETE_SUCCESS':
            return { ...state, loading: false,
                payments: state.payments.filter(payment =>
                    payment.id !== action.payload.id
                )
            };

        default:
            return state;
    }
}

export const PaymentProvider = ({children}) => {
    const [state, dispatch] = useReducer(paymentReducer, initialState);

    const {user} = useAuth();
    const userId = user?.id;

    const fetchPayments = useCallback(async (targetUserId) => {
        const resolvedUserId = targetUserId ?? userId;

        if (!resolvedUserId) {
            dispatch({ type: 'FETCH_SUCCESS', payload: [] });
            return { success: true, payments: [] };
        }

        dispatch ({ type: 'START_OPERATION'}); 
        try {
            const data = await getPaymentsByUserId(resolvedUserId);
            dispatch ({ type: 'FETCH_SUCCESS', payload: data});
            return { success: true, payments: data };
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi tải danh sách thanh toán.';
            dispatch ({ 
                type: 'FAILURE_OPERATION',
                payload: errorMessage});
            return { success: false, error: errorMessage };
        }
    }, [userId]);

    useEffect(() => {
        fetchPayments(userId);
    }, [userId, fetchPayments]);

    const addPaymentAction = async (newPaymentData) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            const newPayment = await addPayment(newPaymentData);
            dispatch ({ type: 'ADD_SUCCESS', payload: newPayment});
            return {success: true, payment: newPayment};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi thêm thanh toán.';
            dispatch ({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage }
        }
    }

    const updatePaymentAction = async (paymentId, updateData) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            const updatedPayment = await updatePayment(paymentId, updateData);
            dispatch ({ type: 'UPDATE_SUCCESS', payload: updatedPayment});
            return {success: true, payment: updatedPayment};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi cập nhật thanh toán.';
            dispatch ({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage }
        }
    }

    const deletePaymentAction = async (paymentId) => {
        dispatch ({ type: 'START_OPERATION'});
        try {
            await deletePayment(paymentId);
            dispatch ({ type: 'DELETE_SUCCESS', payload: {id: paymentId }});
            return { success: true};
        } catch (error){
            const errorMessage = error.message || 'Lỗi khi xóa thanh toán.';
            dispatch({ type: 'FAILURE_OPERATION', payload: errorMessage});
            return {success: false, error: errorMessage}
        }
    }

    const contextValue = {
        payments: state.payments,
        loading: state.loading,
        error: state.error,
        fetchPayments,
        addPayment: addPaymentAction, 
        updatePayment: updatePaymentAction,
        deletePayment: deletePaymentAction,
    };

    return (
        <PaymentContext.Provider value={contextValue}>
            {children}
        </PaymentContext.Provider>
    );

}

export default PaymentContext;