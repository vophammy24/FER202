import { Card } from 'react-bootstrap';
import { useExpenses } from '../hooks/useExpenses';
import { formatCurrency } from '../utils/formmated';

const TotalExpensesCard = () => {
  const { expenses } = useExpenses();

  const total = expenses.reduce((sum, expense) => {
    const amount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;
    return sum + (amount || 0);
  }, 0);

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Total of Expenses</Card.Title>
        <h3 className="mt-3">{formatCurrency(total)}</h3>
      </Card.Body>
    </Card>
  );
};

export default TotalExpensesCard;

