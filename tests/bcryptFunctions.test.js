import { compare } from "bcrypt";
import { hashPass } from "../utils/bcryptFunction";

test("Test should pass with the correct password", async () => {
  const password = "meena123";
  const savedPass = await hashPass(password);
  const result = await compare("meena123", savedPass);

  expect(result).toBe(true);
});

test("Test should fail with wrong password", async () => {
  const password = "meena123";
  const savedPass = await hashPass(password);
  const result = await compare("meena12", savedPass);

  expect(result).toBe(false);
});
