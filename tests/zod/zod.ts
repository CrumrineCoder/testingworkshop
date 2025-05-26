import { z } from "zod";
/*
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
*/

/*
const settingsSchema = z.object({
  theme: z.string().default("light"),
  notifications: z.boolean().optional(),
});

const result = settingsSchema.parse({});
console.log(result); // { theme: "light" }
*/

const passwordSchema = z.string().refine(val => val.length >= 8, {
  message: "Password must be at least 8 characters long",
});

const passResult1 = passwordSchema.parse("124567");
console.log(passResult1);

const passResult2 = passwordSchema.parse("BatteryTifaInALandMine");
console.log(passResult2);