export type TBasicInfoState = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  alternateNumber: string;
  nidNumber: string;
  passport: string;
  attendanceShift: string;
  address: string;
  designation: string;
};

export type TSalaryAndBankInfo = {
  accountNumber: string;
  branchAddress: string;
  bankName: string;
  routingNumber: string;
  tinNumber: string;
  basicSalary: number;
  grossSalary: number;
  transportAllowance: number;
  medicalBenefit: number;
  familyBenefit: number;
  transportationBenefit: number;
  otherBenefit: number;
};

export type TPersonalInformation = {
  departmentId: string;
  payFrequency: string;
  subDepartmentId: string;
  payFrequencyText: string;
  position: string;
  hourlyRate: string;
  dutyType: string;
  hourlyRate2: string;
  joiningDate: string;
  employeeGrade: string;
  hireDate: string;
  terminationReason: string;
  rehireDate: string;
  workInCity: string;
  terminationDate: string;
  employeeType: string;
  cardNumber: string;
  monthlyWorkHours: number;
  workPermit: boolean;
};

export type TBiologicalInfoContact = {
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  numberOfKids: number;
  sosNumber: string;
  religion: string;
  ethnicGroup: string;
  profileImage: string;
  emergencyContactPerson: string;
  emergencyContactRelationship: string;
  emergencyContactNumber: string;
  emergencyHomePhone: string;
  emergencyWorkPhone: string;
  alternateEmergencyContact: string;
  alternateEmergencyHomePhone: string;
  alternateEmergencyWorkPhone: string;
};

export type TOthers = {
  bloodGroup: string;
  healthCondition: string;
  isDisabled: boolean;
  disabilitiesDesc: string;
  homeEmail: string;
  homePhone: string;
};

export type TSupervisor = {
  isSupervisor: boolean;
  supervisorEmail: string;
  supervisorPassword: string;
};
