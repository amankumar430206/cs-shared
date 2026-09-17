import { z } from "zod";
import { TICKET_CATEGORIES, TICKET_PRIORITIES, type TicketCategory } from "../types/support";

// Copied from cs-web's components/support/SupportPanel.tsx; mirrors cs-api's support.validators.js createTicketSchema.
export const createTicketSchema = z.object({
  category: z.enum(TICKET_CATEGORIES.map((c) => c.value) as [TicketCategory, ...TicketCategory[]], {
    message: "Choose a category",
  }),
  subject: z.string().min(3, "Enter a subject").max(255),
  description: z.string().min(10, "Describe the issue in a bit more detail").max(5000),
  priority: z.enum(TICKET_PRIORITIES).optional(),
});
export type CreateTicketFormValues = z.infer<typeof createTicketSchema>;

// Mirrors support.validators.js addMessageSchema / feedbackSchema.
export const ticketMessageSchema = z.object({
  message: z.string().trim().min(1, "Write a message").max(5000),
});
export type TicketMessageFormValues = z.infer<typeof ticketMessageSchema>;
