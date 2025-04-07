import { Op } from "sequelize";
import User from "../user/model";
import { APIError } from "../utils/CustomError";
import { Message } from "./model";
import { validateGetMessageReqBody, validationMessageBody } from "./validation";
import { Contact } from "../contacts/model";

import { promises as fs } from "fs";
export async function sendMessage(data: any) {
  try {
    console.log(data);
    await validationMessageBody.validateAsync(data);
    const contact: any = await Contact.findOne({
      where: { id: data.contactId, userId: data.senderUserId },
    });
    if (!contact) throw new APIError(" invalid contact id ", " INVALID ID ");
    const users = await User.count({
      where: { id: [data.senderUserId, contact.contactUserId] },
    });
    if (users != 2) {
      throw new APIError(" invlaid user id passed ", " INVLAID USER ID");
    }

    await Message.create({
      senderUserId: data.senderUserId,
      recieverUserId: contact.contactUserId,
      imagesPath: data.imagesPath || "",
      message: data.message,
    });
    return {
      message: " successfully sent message ",
    };
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

export async function getMessages(details: any) {
  try {
    const data = await validateGetMessageReqBody.validateAsync(details);
    const contact = await Contact.findOne({
      where: {
        id: data.to,
      },
      attributes: ["userId", "contactUserId"],
    });
    if (!contact)
      throw new APIError(
        " invlaid contact id passes throgh params FE ",
        " INVALID ID "
      );
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          {
            senderUserId: data.from,
            recieverUserId: contact.contactUserId,
          },
          {
            recieverUserId: data.from,
            senderUserId: contact.contactUserId,
          },
        ],
      },
      order: [["createdAt", "ASC"]],
    });
    let ele: any;
    for (ele of messages) {
      let i = 1;
      if (ele.imagesPath.split(";").length > 1) {
        for (let img of ele.imagesPath.split(";")) {
          ele.dataValues[`imagesPath${i}`] = await readFileFromPath(img);
          ++i;
        }
      } else {
        ele.dataValues[`imagesPath${i}`] = await readFileFromPath(
          ele.imagesPath.split(";")[0]
        );
      }
      delete ele.dataValues.imagesPath;
    }
    return messages;
  } catch (error) {
    throw new APIError((error as APIError).message, (error as APIError).code);
  }
}

// async function readFileFromPath(path: string) {
//   const data = await fs.readFile(path);
//   let finalStr = data.toString("base64");
//   finalStr = `base64:data ${finalStr}`;
//   return finalStr;
// }
async function readFileFromPath(path: string): Promise<string> {
  try {
    const data = await fs.readFile(path);
    const finalStr = `data:image/png;base64,${data.toString("base64")}`;
    return finalStr;
  } catch (err: any) {
    throw new APIError(err.message, err.code);
  }
}
