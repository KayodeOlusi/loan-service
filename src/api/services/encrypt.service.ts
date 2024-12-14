import bcrypt from "bcrypt";

const saltRounds = 10;
class EncryptService {
  private static async _createToken() {
  }

  static hash(str: string) {
    return bcrypt.hashSync(str, saltRounds);
  }
  static async generateAuthToken(str: string) {
    return await this._createToken();
  }
}

export default EncryptService;