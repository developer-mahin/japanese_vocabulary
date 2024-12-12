import { Employee } from ".";

export type TLoan = {
  id: string;
  employeeId: string;
  permittedBy: string;
  loanNo: string;
  amount: number;
  interestRate: number;
  installmentPeriod: number;
  installmentCleared: number;
  repaymentAmount: number;
  isDeleted: boolean;
  approvedDate: string;
  repaymentFrom: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  employee: Employee;
};
