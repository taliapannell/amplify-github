import { AuthUser } from "aws-amplify/auth";

export const getName = (user: AuthUser) => {
  const email = user?.signInDetails?.loginId;
  if (!email) {
    return "Karl";
  }
  const name = email.split("@")[0];
  const first_name = name.split(".")[0];
  const capitalized_first_name =
    first_name.charAt(0).toUpperCase() + first_name.slice(1);
  // Check if the first name is just an initial
  if (capitalized_first_name.length === 1) {
    return "Karl";
  }
  return capitalized_first_name;
};

export const getInitials = (user: AuthUser): string => {
  if (
    user !== undefined &&
    user.userId !== undefined
  ) {
    const email = user?.signInDetails?.loginId || user?.userId;
    const id = email.substring(0, email?.indexOf("@")).split(".");
    let initials = "";
    if (!id.length) {
      initials = "";
    } else if (id.length === 1) {
      initials = id[0][0];
    } else if (id.length == 2) {
      initials = id[0][0] + id[1][0];
    } else {
      initials = id[0][0] + id[2][0];
    }
    return initials;
  }
  return "";
}