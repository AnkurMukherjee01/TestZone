export class CreateTestModel {
    constructor(
        public testName: string,
        public testDuration: string,
        public testType: String,
        public noOfQstn:number,
        public testFile: String
      ) {  }
}
