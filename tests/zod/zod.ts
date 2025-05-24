import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

try {
  const result = userSchema.parse({ name: "Nicolas", age: 26 });
  console.log(result);
} catch (err) {
  if (err instanceof z.ZodError) {
    err.issues;
  }
}
