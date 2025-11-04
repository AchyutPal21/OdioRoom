import { useSelector } from "react-redux";
import { redirect } from "react-router";
import { getToken } from "../../../utils/auth";


export async function semiProtectedLoader() {
  const {isAuthenticated, user} = useSelector((state) => state.auth);


  if (!isAuthenticated) throw redirect("/");

  // const user = { username: "johndoe@3", profilePicture: "profileimage.com/user1" };
  // const hasProfileDetails = user.username && user.profilePicture;

  if (!user || !user.isActivated) {
    // Let them stay to complete details
    return null;
  }

  // Redirect to dashboard if complete
  throw redirect("/rooms");
}

// export async function semiProtectedLoader() {
//   const token = getToken();

//   // 🔒 No token → redirect to login/register
//   if (!token) throw redirect("/");

//   try {
//     // ✅ Fetch user info using token
//     // const response = await apiClient.get("/auth/me", {
//     //   headers: { Authorization: `Bearer ${token}` },
//     // });

//     // const user = response.data;
//     const user = {username: "johndoe@3", profilePicture: "www.image.com"};

//     // ⚠️ Check if user has completed profile
//     const hasProfileDetails = user.username && user.profilePicture;

//     if (!hasProfileDetails) {
//       // Allow access to this route to complete details
//       return null;
//     }

//     // ✅ If already completed, redirect to dashboard
//     throw redirect("/rooms");
//   } catch (error) {
//     console.error("Error validating user:", error);
//     // 🔐 If token invalid/expired
//     throw redirect("/");
//   }
// }
