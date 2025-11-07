import { useReducer, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { usePayment } from '../hooks/usePayment';
import { useAuth } from '../hooks/useAuth';
import { validateRequired } from '../utils/formatters'; 


const defaultFormData = {
  semester: '',
  courseName: '',
  amount: '',
  date: '',
};

const initialFormState = {
  formData: defaultFormData,
  errors: {},
  submitting: false,
  apiError: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: null }, 
      };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_API_ERROR':
      return { ...state, apiError: action.payload, submitting: false };
    case 'START_SUBMIT':
      return { ...state, submitting: true, apiError: null };
    case 'END_SUBMIT':
      return { ...state, submitting: false };
    case 'SET_INITIAL_DATA':
      return { ...initialFormState, formData: action.payload }; 
    default:
      return state;
  }
}


const PaymentFormModal = ({ show, onHide, type = 'add', payment }) => {
    const [state, dispatch] = useReducer(formReducer, initialFormState);
    
    const { user } = useAuth();
    const userId = user?.id; 

    const { addPayment, updatePayment } = usePayment();

    const isEdit = type === 'edit';
    const modalTitle = isEdit ? `Chỉnh Sửa Thanh Toán: ${payment?.courseName}` : 'Thêm Thanh Toán Mới';


    useEffect(() => {
        if (show) {
        if (isEdit && payment) {
            dispatch({ 
            type: 'SET_INITIAL_DATA', 
            payload: { 
                ...payment, 
                amount: String(payment.amount), 
                date: payment.date,
            } 
            });
        } else {

            dispatch({ type: 'SET_INITIAL_DATA', payload: defaultFormData });
        }
        }
    }, [show, isEdit, payment]);


    const validateForm = () => {
        const errors = {};
        const { semester, courseName, amount, date } = state.formData;

        const requiredFields = { semester: 'Kỳ học', courseName: 'Tên khóa học', amount: 'Số tiền', date: 'Ngày thanh toán' };
        
        Object.entries(requiredFields).forEach(([field, label]) => {
        const error = validateRequired(state.formData[field], label);
        if (error) errors[field] = error;
        });

        if (!errors.amount && isNaN(Number(amount)) || Number(amount) <= 0) {
            errors.amount = 'Số tiền phải là một số dương hợp lệ.';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validateForm();
        dispatch({ type: 'SET_ERRORS', errors: validationErrors });

        if (Object.keys(validationErrors).length > 0 || state.submitting || !userId) {
        if (!userId) dispatch({ type: 'SET_API_ERROR', payload: 'Không tìm thấy User ID. Vui lòng đăng nhập lại.' });
        return;
        }

        dispatch({ type: 'START_SUBMIT' });
        let result;

        const dataToSend = {
        ...state.formData,
        amount: Number(state.formData.amount),
        userId: userId, 
        };

        if (isEdit) {
        result = await updatePayment(payment.id, dataToSend);
        } else {
        result = await addPayment(dataToSend);
        }

        if (result.success) {
        onHide(); 
        } else {
        dispatch({ type: 'SET_API_ERROR', payload: result.error || 'Lỗi xử lý yêu cầu.' });
        }
        dispatch({ type: 'END_SUBMIT' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({ type: 'SET_FIELD', field: name, value });
    };


    return (
        <Modal show={show} onHide={onHide} backdrop="static" keyboard={!state.submitting}>
            <Modal.Header closeButton={!state.submitting}>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(state.apiError || (isEdit && !payment)) && (
                <Alert variant="danger">{state.apiError || 'Không tìm thấy dữ liệu thanh toán để chỉnh sửa.'}</Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                {/* Semester Field */}
                <Form.Group className="mb-3" controlId="formSemester">
                    <Form.Label>Kỳ Học</Form.Label>
                    <Form.Control
                    type="text"
                    name="semester"
                    value={state.formData.semester}
                    onChange={handleChange}
                    isInvalid={!!state.errors.semester}
                    disabled={state.submitting}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.semester}</Form.Control.Feedback>
                </Form.Group>

                {/* Course Name Field */}
                <Form.Group className="mb-3" controlId="formCourseName">
                    <Form.Label>Tên Khóa Học</Form.Label>
                    <Form.Control
                    type="text"
                    name="courseName"
                    value={state.formData.courseName}
                    onChange={handleChange}
                    isInvalid={!!state.errors.courseName}
                    disabled={state.submitting}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.courseName}</Form.Control.Feedback>
                </Form.Group>

                {/* Amount Field */}
                <Form.Group className="mb-3" controlId="formAmount">
                    <Form.Label>Số Tiền (VND)</Form.Label>
                    <Form.Control
                    type="number"
                    name="amount"
                    value={state.formData.amount}
                    onChange={handleChange}
                    isInvalid={!!state.errors.amount}
                    placeholder="Ví dụ: 3500000"
                    disabled={state.submitting}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.amount}</Form.Control.Feedback>
                </Form.Group>

                {/* Date Field */}
                <Form.Group className="mb-3" controlId="formDate">
                    <Form.Label>Ngày Thanh Toán</Form.Label>
                    <Form.Control
                    type="date"
                    name="date"
                    value={state.formData.date}
                    onChange={handleChange}
                    isInvalid={!!state.errors.date}
                    disabled={state.submitting}
                    />
                    <Form.Control.Feedback type="invalid">{state.errors.date}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3" disabled={state.submitting}>
                    {state.submitting ? (
                    <>
                        <Spinner size="sm" animation="border" className="me-2" />
                        Đang xử lý...
                    </>
                    ) : isEdit ? 'Lưu Thay Đổi' : 'Thêm Thanh Toán'}
                </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide} disabled={state.submitting}>
                Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentFormModal;