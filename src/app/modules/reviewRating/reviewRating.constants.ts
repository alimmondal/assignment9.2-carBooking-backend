export const reviewRatingFilterableFields: string[] = [
  'searchTerm',
  'review',
  'rating',
  'bookId',
  'userId',
];

export const reviewRatingSearchableFields: string[] = [
  'review',
  'rating',
  'bookId',
  'userId',
];

export const reviewRatingRelationalFields: string[] = ['bookId', 'userId'];
export const reviewRatingRelationalFieldsMapper: { [key: string]: string } = {
  bookId: 'bookId',
  userId: 'userId',
};
