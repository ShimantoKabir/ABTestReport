import { AuthorizedUserService } from "../adapter/data/services/AuthorizedUserService";

export enum IOMsg{
  EMPTY = "",
  OK = "Operation successful!",
  LOGOUT = "Logout successful!",
  ERROR = "Something went wrong, please try again later!",
  DATA_POPULATE_SUCCESSFULLY = "Data populate successfully on spread sheet!",
  USER_EXIST = "User already exist!",
  USER_FOUND = "User found!",
  USER_UNAUTHORIZED = "This email address is not authorized yet!",
  USER_NOT_FOUND = "User not found!",
  LOGIN_SUCCESS = "Login successful!",
  REGISTRATION_SUCCESS = "Registration successful!",
  LOGIN_UNSUCCESSFUL = "Login unsuccessful!",
  REGISTRATION_UNSUCCESSFUL = "Registration unsuccessful!",
  JWT_ERROR = "JWT token missing!",
  UPDATE_OK = "Update successful!",
  NOT_FOUND = "Not found!",
  NA = "N/A",
  NO_DATA_API = "No data found to populate on spread sheet!",
  NO_SITE = "No site found to populate data on spread sheet!",
  COMING_SOON = "Other tool service coming soon....!"
}
