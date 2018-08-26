export class ChangepasswordModel {
    constructor(
        public email: string,
        public oldPassword: string,
        public newPassword: String,
        public confirmPassword: String
      ) {  }
}
