import { Request, Response } from "express-serve-static-core"
import { User } from "@/config/db/models/user.model";
import { getSignedToken } from "@/config/middlewares/auth";
import { apiHandler } from "@/config/middlewares/handlers/api.handlers";
import { successResponse, errorResponse } from "@/utils/response.utils";
import bcrypt from "bcrypt";
import { cookieName } from "@/config/application";

export const Create = apiHandler(async (req: Request, res: Response) => {
  const { email, password, confirm_password } = req.body;

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return errorResponse(res, 400, 'User with this email already exists. Please try with another one');
  }

  if (password != confirm_password) {
    return errorResponse(res, 400, 'Password and Confirm Password does not match');
  }

  const newUser = await User.create({
    email: email,
    password: password
  }) as User

  const token = getSignedToken(newUser);

  res.cookie(cookieName, token, {
    maxAge: 86400000,
    secure: true,
    sameSite: "none"
  });

  successResponse(res, 201, 'User registered successfully', {
    user: newUser,
  });
});

export const Login = apiHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.scope('withPassword').findOne({ where: { email: email } });

  if (user) {
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return errorResponse(res, 500, 'An error occurred during login');
      }

      if (!isMatch) {
        return errorResponse(res, 400, 'Please check your credentials');
      }

      const token = getSignedToken(user);

      res.cookie(cookieName, token, {
        maxAge: 86400000,
        secure: true,
        sameSite: "none"
      });

      return successResponse(res, 200, 'Login successful', {
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          color: user.color,
          email: user.email,
          profile_setup: user.profile_setup,
          created_at: user.created_at,
          updated_at: user.updated_at
        },
      });
    });

  } else {
    return errorResponse(res, 400, 'Please check your credentials');
  }
})

export const currentUser = apiHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({ where: { id: req.userId } })
  if (user) {
    return successResponse(res, 200, "", user);
  } else {
    return errorResponse(res, 400, "User not found");
  }
})

export const updateProfile = apiHandler(async (req: Request, res: Response) => {
  const { userId } = req;
  const { first_name, last_name, color } = req.body;

  // await User.update({
  //   first_name: first_name,
  //   last_name: last_name,
  //   color: color,
  //   profile_setup: true
  // },{ where: { id: userId }, returning: true});
  const user  = await User.update({
    first_name: first_name,
    last_name: last_name,
    color: color,
    profile_setup: true
  },{ where: { id: userId }, returning: true});

  console.log(user)

  return successResponse(res, 200, "User updated successfully", user)
})
