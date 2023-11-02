import { z } from 'zod';

const create = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'UserId is required',
    }),
    orderedBooks: z.any({
      required_error: 'OrderedBooks name is required',
    }),
    status: z.string().optional(),
  }),
});

const update = z.object({
  body: z.object({
    userId: z.string(),
    orderedBooks: z.any(),
    status: z.string().optional(),
  }),
});

export const OrderValidation = {
  create,
  update,
};
