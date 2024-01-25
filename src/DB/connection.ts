import mongoose, { Connection } from "mongoose";

interface IConnectDBResult {
  connection: typeof import("mongoose") ;
}

const connectToDB = async (): Promise<IConnectDBResult> => {
  try {
    const connection = await mongoose.connect(process.env.DB_ATLAS as string) 
    console.log("DB Is Connected .....");
    return { connection };
  } catch (error) {
    console.error("There Is Something Wrong In DB Connection ...");
    throw error;
  }
};

export default connectToDB;