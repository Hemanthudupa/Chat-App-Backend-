import { Op } from "sequelize";
import { sequelize } from "../database";
import { Profile } from "../profile/model";
import {
  comparePassword,
  generateToken,
  hashPassword,
} from "../utils/Authentication";
import { APIError } from "../utils/CustomError";
import User from "./model";
import { validateSignData, validateSignUp } from "./validation";
import { compare } from "bcrypt";

export async function signUpUser(data: any) {
  const transaction = await sequelize.transaction();
  try {
    await validateSignUp.validateAsync(data);

    if (
      await User.findOne({
        where: {
          [Op.or]: [
            {
              email: data.email,
            },
            {
              phoneNumber: data.phoneNumber,
            },
          ],
        },
      })
    ) {
      throw new APIError(" duplicate email or phone number ", "DUPLICATE DATA");
    }
    const user = await User.create(
      {
        userName: data.userName,
        password: await hashPassword(data.password),
        email: data.email,
        phoneNumber: data.phoneNumber,
      },
      {
        transaction,
        raw: true,
      }
    );
    // await Profile.create(
    //   {
    //     userId: user.id,
    //     imageLocation: data.destination ?? "",
    //   } as any,
    //   { transaction }
    // );
    await transaction.commit();

    return " user created successfully ";
  } catch (error) {
    await transaction.rollback();

    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function userLogin(data: any) {
  try {
    await validateSignData.validateAsync(data);
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new APIError(" user not found ", "USER NOT FOUND");
    }
    const res = await comparePassword(data.password, user.password);
    if (res) {
      const token = await generateToken(user.dataValues);
      return {
        token: token,
      };
    } else {
      throw new APIError(" password not matched ", "PASSWORD NOT MATCHED");
    }
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
