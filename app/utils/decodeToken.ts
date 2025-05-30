import { DecodedToken } from "../interface/token";

export const decodeAccessToken = (token: string): DecodedToken | null => {
  try {
    if (!token) {
      throw new Error("Token is empty or undefined");
    }

    const base64Url = token.split(".")[1]; // Extract payload
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64)); // Decode base64

    return decodedPayload as DecodedToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};


// import { jwtDecode } from "jwt-decode"; // Ensure the correct import
// import { DecodedToken } from "../interface/token";

// // Extend JwtPayload for custom fields


// // Function to decode JWT
// export const decodeAccessToken = (token: string): DecodedToken | null => {
//   try {
//      const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
 
//     return decoded;
//   } catch (error) {
//     console.error("Error decoding token:", error);
//     return null;
//   }
// };

