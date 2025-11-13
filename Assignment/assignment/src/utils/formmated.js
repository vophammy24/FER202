export const formatCurrency = (amount) => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount) || numAmount === null || numAmount === undefined) return '0 ₫';
  // Định dạng tiền tệ với dấu phẩy phân cách hàng nghìn và ký hiệu ₫
  // Ví dụ: 2,720,000 ₫
  return new Intl.NumberFormat('en-US').format(numAmount) + ' ₫';
};

export const formatDate = (dateString) => {
    // Định dạng ngày theo DD-MM-YYYY
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
};

// Convert YYYY-MM-DD to dd/MM/YYYY for date input
export const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

// Convert dd/MM/YYYY to YYYY-MM-DD for storing in database
export const parseDateFromInput = (dateString) => {
    if (!dateString) return '';
    // Parse dd/MM/YYYY format
    const parts = dateString.split('/');
    if (parts.length !== 3) return '';
    
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    
    // Return YYYY-MM-DD format
    return `${year}-${month}-${day}`;
};