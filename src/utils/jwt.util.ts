import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export class JWT {
  public static sign(payload: JwtPayload | string, secretOrPrivateKey: string) {
    return jsonwebtoken.sign(payload, secretOrPrivateKey, { expiresIn: '1h' });
  }

  public static verify(token: string, secretOrPublicKey: string) {
    try {
      return jsonwebtoken.verify(token, secretOrPublicKey);
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public static decode(token: string) {
    try {
      return jsonwebtoken.decode(token, { json: true });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
