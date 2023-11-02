import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'First name is required',
    }),
    author: z.string({
      required_error: 'Last name is required',
    }),
    price: z.number({
      required_error: 'Middle name is required',
    }),
    genre: z.string({
      required_error: 'Profile image is required',
    }),
    categoryId: z.string({
      required_error: 'Email is required',
    }),
    publicationDate: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    genre: z.string().optional(),
    categoryId: z.string().optional(),
    publicationDate: z.string().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
