export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') return '0 VND';
  // Định dạng tiền tệ Việt Nam
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const formatDate = (dateString) => {
    // Định dạng ngày theo DD/MM/YYYY
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN'); 
};

export const validateRequired = (value, fieldName = 'Trường này') => {
  // Chuyển sang chuỗi và loại bỏ khoảng trắng đầu/cuối
  const trimmedValue = value ? String(value).trim() : ''; 

  if (!trimmedValue) {
    return `${fieldName} không được để trống.`;
  }
  return null;
};