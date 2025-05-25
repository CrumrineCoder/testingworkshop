import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  age: z.number(),
});

try {
  const result = userSchema.parse({ name: "Nicolas", age: 26 });
  console.log(result);
  const result2 = userSchema.parse({ name: 9, age: "thirty" });
  console.log(result2);
} catch (err) {
  if (err instanceof z.ZodError) {
    err.issues;
    console.log(err.issues);
  }
}
