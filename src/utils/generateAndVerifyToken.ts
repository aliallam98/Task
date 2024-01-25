import jwt from "jsonwebtoken";

interface TokenOptions {
  payload?: any;
  signature?: string;
  expiresIn?: number;
}

export const generateToken = ({
  payload = {},
  signature = process.env.TOKEN_SIGNATURE,
  expiresIn = 60 * 60,
}: TokenOptions): string => {
  const token = jwt.sign(payload , signature!, { expiresIn });
  return token;
};

export const verifyToken = ({
  token,
  signature = process.env.TOKEN_SIGNATURE,
}: {
  token: string;
  signature?: string;
}) => {
  const decoded = jwt.verify(token, signature!);
  return decoded;
};
