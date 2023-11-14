export const listingFilterableFields: string[] = [
  'searchTerm',
  'name',
  // 'price',
  // 'description',
  'category',
  // 'reviews',
  // 'comment',
  // 'reviewsId',
  // 'createdAt',
  // 'updatedAt',
]

export const listingSearchableFields: string[] = ['name', 'category']

export const listingRelationalFields: string[] = ['reviewsId']
export const listingRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'reviewsId',
}
