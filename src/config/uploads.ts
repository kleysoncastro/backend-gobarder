import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callabck) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const name = `${fileHash}-${file.originalname}`;
      return callabck(null, name);
    },
  }),
};
