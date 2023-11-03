export const listingFilterableFields: string[] = [
  'searchTerm',
  'name',
  'price',
  'description',
  'reviews',
  'comments',
  'reviewsId',
  'createdAt',
  'updatedAt',
]

export const listingSearchableFields: string[] = [
  'searchTerm',
  'name',
  'description',
  'price',
  'reviews',
  'reviewsId',
  'comments',
  'createdAt',
  'updatedAt',
]

export const listingRelationalFields: string[] = ['reviewsId']
export const listingRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'reviewsId',
}
