import models from "@/config/db/models"
import { Pool } from 'pg';

export const createAttachment = async (
  fileName: string,
  filePath: string,
  fileType: string,
  fileSize: number,
  uploadableType: string,
  uploadableId: number
) => {
  const attachment = await models.Attachment.create({
    file_name: fileName,
    file_path: filePath,
    file_type: fileType,
    file_size: fileSize,
    uploadable_type: uploadableType,
    uploadable_id: uploadableId
  });
  return attachment.id;
}

export const getAttachmentsByUploadable = async (uploadableType: string, uploadableId: number) => {
  const attachments = await models.Attachment.findAll({where: {
    uploadable_type: uploadableType,
    uploadable_id: uploadableId
  }})
  return attachments;
}

export const updateUserAvatar = async (userId: number, avatarPath: string) => {
  const db = new Pool();
  const query = 'UPDATE users SET avatar_path = $1 WHERE id = $2';
  await db.query(query, [avatarPath, userId]);
}
