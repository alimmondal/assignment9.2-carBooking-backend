export const listingFilterableFields: string[] = [
  'searchTerm',
  'name',
  'price',
  'description',
  'category',
  'comments',
  'categoryId',
  'createdAt',
  'updatedAt',
]

export const listingSearchableFields: string[] = [
  'searchTerm',
  'name',
  'description',
  'price',
  'category',
  'comments',
  'createdAt',
  'updatedAt',
]

export const listingRelationalFields: string[] = ['categoryId']
export const listingRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'categoryId',
}
