import bcrypt from "bcrypt";

export async function compare(password1, password2) {
  return await bcrypt.compare(password1, password2);
}

export async function hashPass(password) {
  return await bcrypt.hash(password, 10);
}
