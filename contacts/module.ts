import User from "../user/model";
import { APIError } from "../utils/CustomError";
import { Contact } from "./model";
import { validateContactDetails } from "./Validation";

export async function addToContact(data: any, userDetails: any) {
  try {
    await validateContactDetails.validateAsync(data);
    if (userDetails.phoneNumber === data.phoneNumber) {
      throw new APIError(
        " you can not add your own phone number in contact list",
        " INVALID PHONE NUMBER "
      );
    }
    const user = await User.findOne({
      where: {
        phoneNumber: data.phoneNumber,
      },
    });
    if (!user) {
      throw new APIError(
        " phone number does not registerd in chat app",
        " INVLAID PHONE NUMBER "
      );
    }

    const contact = await Contact.findOne({
      where: { userId: userDetails.id, contactName: data.contactName },
    });
    if (contact) {
      throw new APIError(
        " contact name  already added in your contact list",
        " DUPLICATE CONTACT NAME"
      );
    }
    await Contact.create({
      userId: userDetails.id,
      contactUserId: user.id,
      contactName: data.contactName,
    });
    return {
      message: " contact added successfully",
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function getAllUserContacts(userId: any) {
  try {
    return await Contact.findAll({ where: { userId } });
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function getContactbyId(id: string) {
  try {
    return await Contact.findOne({ where: { id }, raw: true });
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}
