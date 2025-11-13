import { useState, useEffect, useMemo } from 'react';
import { Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useExpenses } from '../hooks/useExpenses';
import { useAuth } from '../hooks/useAuth';
import { formatDateForInput, parseDateFromInput } from '../utils/formmated';

const ExpenseForm = ({ expense, onSave, onCancel }) => {
  const { addExpense, updateExpense } = useExpenses();
  const { user } = useAuth();
  const { expenses } = useExpenses();
  
  // Get unique categories from expenses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(expenses.map(e => e.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [expenses]);

  const isEditMode = !!expense;

  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      // Edit mode: populate form with expense data
      setFormData({
        name: expense.name || '',
        amount: expense.amount || '',
        category: expense.category || '',
        date: formatDateForInput(expense.date) || ''
      });
    } else {
      // Add mode: reset form
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: ''
      });
    }
    setError('');
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name.trim()) {
      setError('Name must not be empty');
      return;
    }
    const amountValue = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amountValue) || amountValue <= 0) {
      setError('Amount must be a valid number greater than 0');
      return;
    }
    if (!formData.category.trim()) {
      setError('Category must not be empty');
      return;
    }
    if (!formData.date) {
      setError('Date is required');
      return;
    }

    setLoading(true);
    try {
      // Convert date from dd/MM/YYYY to YYYY-MM-DD
      const dateForDB = parseDateFromInput(formData.date);
      
      if (isEditMode) {
        // Update existing expense
        const updateData = {
          name: formData.name.trim(),
          amount: amountValue,
          category: formData.category.trim(),
          date: dateForDB
        };
        
        const result = await updateExpense(expense.id, updateData);
        
        if (result.success) {
          if (onSave) onSave();
          // Reset form after successful edit
          setFormData({
            name: '',
            amount: '',
            category: '',
            date: ''
          });
        } else {
          setError(result.error || 'Failed to update expense');
        }
      } else {
        // Add new expense
        const expenseData = {
          name: formData.name.trim(),
          amount: amountValue,
          category: formData.category.trim(),
          date: dateForDB,
          userId: user?.id
        };
        
        const result = await addExpense(expenseData);
        
        if (result.success) {
          if (onSave) onSave();
          // Reset form after successful add
          setFormData({
            name: '',
            amount: '',
            category: '',
            date: ''
          });
        } else {
          setError(result.error || 'Failed to add expense');
        }
      }
    } catch (err) {
      setError(err.message || `Failed to ${isEditMode ? 'update' : 'add'} expense`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (expense) {
      // Reset to original expense data
      setFormData({
        name: expense.name || '',
        amount: expense.amount || '',
        category: expense.category || '',
        date: formatDateForInput(expense.date) || ''
      });
    } else {
      // Reset to empty form
      setFormData({
        name: '',
        amount: '',
        category: '',
        date: ''
      });
    }
    setError('');
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{isEditMode ? 'Edit Expense' : 'Add Expense'}</Card.Title>
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {/* Name - Full width */}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter expense name"
              required
            />
          </Form.Group>

          {/* Amount | Category - Side by side */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {/* Date - Date picker */}
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={(() => {
                // Convert dd/MM/YYYY to YYYY-MM-DD for date input
                if (!formData.date) return '';
                const parts = formData.date.split('/');
                if (parts.length === 3 && parts[0] && parts[1] && parts[2]) {
                  return `${parts[2]}-${parts[1]}-${parts[0]}`;
                }
                // If already in YYYY-MM-DD format, return as is
                if (formData.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
                  return formData.date;
                }
                return '';
              })()}
              onChange={(e) => {
                // Convert YYYY-MM-DD (from date input) to dd/MM/YYYY
                const dateValue = e.target.value;
                if (dateValue) {
                  const parts = dateValue.split('-');
                  if (parts.length === 3) {
                    setFormData(prev => ({
                      ...prev,
                      date: `${parts[2]}/${parts[1]}/${parts[0]}`
                    }));
                  } else {
                    setFormData(prev => ({
                      ...prev,
                      date: dateValue
                    }));
                  }
                } else {
                  setFormData(prev => ({
                    ...prev,
                    date: ''
                  }));
                }
                setError('');
              }}
              required
            />
          </Form.Group>

          {/* Buttons - Centered */}
          <div className="d-flex justify-content-center gap-2">
            
            {isEditMode && onCancel ?(
              <Button variant="secondary" type="button" onClick={onCancel} disabled={loading}>
                Reset
              </Button>
            ) : <Button variant="secondary" type="button" onClick={handleReset} disabled={loading}>
              Reset
            </Button> }
            <Button variant="primary" type="submit" disabled={loading}>
              {loading 
                ? (isEditMode ? 'Saving...' : 'Adding...') 
                : (isEditMode ? 'Save' : 'Add expense')
              }
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;

