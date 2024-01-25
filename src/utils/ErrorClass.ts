class ErrorClass extends Error {
    status: number;
  
    constructor(public message: string, status: number) {
      super(message);
      this.status = status || 500;
    }
  }
  
  export default ErrorClass;