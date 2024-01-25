import bcrypt from 'bcryptjs'


interface HashOptions {
    plaintext: string;
    salt?: number;
  }
  
  interface CompareOptions {
    plaintext: string;
    hashValue: string;
  }
  
  export const hash = ({ plaintext, salt = parseInt(process.env.SALT_ROUND as string, 10) }: HashOptions): string => {
    const hashResult = bcrypt.hashSync(plaintext, salt);
    return hashResult;
  };
  
  export const compare = ({ plaintext, hashValue }: CompareOptions): boolean => {
    const matchResult = bcrypt.compareSync(plaintext, hashValue);
    return matchResult;
  };