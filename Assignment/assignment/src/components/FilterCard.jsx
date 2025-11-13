import { useState, useMemo } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useExpenses } from '../hooks/useExpenses';

const FilterCard = ({ onFilterChange }) => {
  const { expenses } = useExpenses();
  const [category, setCategory] = useState('');

  // Get unique categories from expenses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(expenses.map(e => e.category).filter(Boolean))];
    return uniqueCategories.sort();
  }, [expenses]);

  const handleChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    if (onFilterChange) {
      onFilterChange(value === 'all' ? '' : value);
    }
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Filter</Card.Title>
        <Form.Group className="mt-3">
          <Form.Select
            value={category || 'all'}
            onChange={handleChange}
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default FilterCard;

