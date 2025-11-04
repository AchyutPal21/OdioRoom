import { redirect } from "react-router";
import { getToken } from "../../../utils/auth";
import { useSelector } from "react-redux";


export async function protectedLoader() {
  const {isAuthenticated, user} = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    // No token? Redirect before the route renders.
    throw redirect("/");
  }

  // const user = { username: "johndoe@3", profilePicture: "profileimage.com/user1" };
  // const hasProfileDetails = user.username && user.profilePicture;

  if (!user || !user.isActivated) {
    // Let them stay to complete details
    throw redirect("/activate");

  }

  return null;

  // try {
  //   // // Simulate API call to verify token and fetch user data
  //   // const response = await apiClient.get("/auth/me", {
  //   //   headers: { Authorization: `Bearer ${token}` },
  //   // });

  //   // // Return user info for components via useLoaderData()
  //   // return response.data;
  //   return { id: 123, userName: "John Doe", email: "ap@gmail.com", profilePicture: "https://imgs.search.brave.com/XwbrPfbgtIrw33SC7El4zr55bzJNjDRRnZl99E_GRpM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOS8w/OC8xMS8xOC81OS9p/Y29uLTQzOTk3MDFf/MTI4MC5wbmc" }
  // } catch (err) {
  //   // Token invalid or expired
  //   throw redirect("/login");
  // }
}
