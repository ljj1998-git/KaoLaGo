import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  /**
   * @description 加密密码到数据库
   */
  async careatePassword(password: string): Promise<string> {
    const hmac = crypto.createHmac(
      this.configService.get('crypto').algorithm,
      this.configService.get('crypto').secret,
    );
    const salt = this.configService.get('crypto').salt;
    hmac.update(password + salt);
    return hmac.digest('hex');
  }

  /**
   * @description 解密前端传入的密码 对称加密Hex
   */
  async decryptPassword(password: string): Promise<string> {
    const key = this.configService.get('crypto').hex.key;
    const iv = this.configService.get('crypto').hex.iv;

    password = Buffer.from(password, 'base64').toString('binary');
    const de = crypto.createDecipheriv('aes-128-cbc', key, iv);
    de.setAutoPadding(true);
    let _password = de.update(password, 'binary', 'utf8');
    _password += de.final('utf8');

    return _password;
  }

  /**
   * @description 验证密码
   */
  async checkPassword(
    password: string,
    hash_password: string,
  ): Promise<boolean> {
    const _password = await this.decryptPassword(password);
    password = await this.careatePassword(_password);
    return password === hash_password;
  }
}
