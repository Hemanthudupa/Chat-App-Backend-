import { Op } from "sequelize";
import { sequelize } from "../database";
import { Profile } from "../profile/model";
import { hashPassword } from "../utils/Authentication";
import { APIError } from "../utils/CustomError";
import User from "./model";
import { validateSignUp } from "./validation";

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
