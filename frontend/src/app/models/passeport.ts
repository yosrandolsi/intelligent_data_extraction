export class Passeport {
    constructor(
      public passportNumber: string,
      public givenName: string,
      public surname: string,
      public nationality: string,
      public dateOfBirth: string,
      public issueDate: string,
      public expiryDate: string,
      public sex: string
    ) {}
  }
  