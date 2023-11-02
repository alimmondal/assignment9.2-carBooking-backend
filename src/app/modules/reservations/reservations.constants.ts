export const orderFilterableFields: string[] = [
  'searchTerm',
  'orderId',
  'userId',
  'quantity',
  'bookId',
];

export const orderSearchableFields: string[] = [
  'orderId',
  'userId',
  'quantity',
  'bookId',
];

export const orderRelationalFields: string[] = ['userId', 'bookId'];
export const orderRelationalFieldsMapper: { [key: string]: string } = {
  bookId: 'bookId',
  userId: 'userId',
};
