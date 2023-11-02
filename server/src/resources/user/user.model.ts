import { User } from "@prisma/client";

function userModel(user: User) {
    const userView = {
        login: user.login
    }
    return userView
  }
export default userModel;