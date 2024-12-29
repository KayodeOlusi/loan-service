import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const saltRounds = 10;
class EncryptService {
  private static _createToken(data: any) {
    return jwt.sign({ data }, process.env.TOKEN_ID, {
      expiresIn: "300000"
    });
  }

  static hash(str: string) {
    return bcrypt.hashSync(str, saltRounds);
  }
  static generateToken(data: any) {
    return this._createToken(data);
  }

  static async compare(data: string, encrypted: string) {
    return await bcrypt.compare(data, encrypted);
  }

  static verify(token: string, compare: string) {
    return jwt.verify(token, compare);
  }
}

export default EncryptService;