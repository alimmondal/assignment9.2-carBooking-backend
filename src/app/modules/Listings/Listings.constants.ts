export const listingFilterableFields: string[] = [
  'searchTerm',
  'name',
  'category',
]

export const listingSearchableFields: string[] = ['name', 'category']

export const listingRelationalFields: string[] = ['reviewsId']
export const listingRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'reviewsId',
}
