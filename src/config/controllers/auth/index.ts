import { Request, Response } from "express"
import { User } from "../../db/models/user.model";
import { getSignedToken } from "../../middlewares/auth";
import { apiHandler } from "../../middlewares/handlers/api.handlers";
import { successResponse, errorResponse } from "../../../utils/response.utils";
import bcrypt from "bcrypt";

export const Create = apiHandler(async (req: Request, res: Response) => {
  const { email, password, confirm_password } = req.body;

  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    return errorResponse(res, 400, 'User already exists');
  }

  if (password != confirm_password) {
    return errorResponse(res, 400, 'Password and Confirm Password does not match');
  }

  const newUser = await User.create({
    email: email,
    password: password
  }) as User

  const token = getSignedToken(newUser);

  successResponse(res, 201, 'User registered successfully', {
    token,
    user: {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
    },
  });
});

export const Login = apiHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email: email } });

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
      return successResponse(res, 200, 'Login successful', {
        token,
        user: {
          id: user.id,
          first_name: user.first_name,
          email: user.email,
        },
      });
    });

    const token = getSignedToken(user);

    successResponse(res, 200, 'Login successful', {
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        email: user.email,
      },
    });

  } else {
    return errorResponse(res, 400, 'Please check your credentials');
  }
})
