import { redirect } from "react-router";
import { getToken } from "../../../utils/auth";

export async function publicLoader() {
  const token = getToken();
  if (token) {
    throw redirect("/rooms")
  }

  return null;
}