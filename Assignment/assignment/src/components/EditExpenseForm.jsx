import { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useExpenses } from '../hooks/useExpenses';
import { formatDateForInput, parseDateFromInput } from '../utils/formmated';

const EditExpenseForm = ({ expense, onClose }) => {
  const { updateExpense } = useExpenses();
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
      setFormData({
        name: expense.name || '',
        amount: expense.amount || '',
        category: expense.category || '',
        date: formatDateForInput(expense.date) || ''
      });
    }
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
      
      const updateData = {
        name: formData.name.trim(),
        amount: amountValue,
        category: formData.category.trim(),
        date: dateForDB
      };
      
      const result = await updateExpense(expense.id, updateData);
      
      if (result.success) {
        onClose();
      } else {
        setError(result.error || 'Failed to update expense');
      }
    } catch (err) {
      setError(err.message || 'Failed to update expense');
    } finally {
      setLoading(false);
    }
  };


  if (!expense) return null;

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Edit Expense</Card.Title>
        {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
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

          <Form.Group className="mb-3">
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

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="dd/MM/YYYY (e.g., 02/10/2025)"
              pattern="\d{2}/\d{2}/\d{4}"
              required
            />
            <Form.Text className="text-muted">
              Format: dd/MM/YYYY (e.g., 02/10/2025)
            </Form.Text>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" type="button" onClick={onClose} disabled={loading}>
              Reset
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditExpenseForm;

