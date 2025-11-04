import { redirect } from "react-router";
import { getToken } from "../../../utils/auth";
import { useSelector } from "react-redux";

export async function publicLoader() {
  const {isAuthenticated} = useSelector((state) => state.auth);
  if (isAuthenticated) {
    throw redirect("/rooms")
  }

  return null;
}