import { Employee } from "./employee";

export interface Payment {
  id: string;
  employeeId: string;
  salaryMonth: string;
  totalSalary: number;
  releaseAmount: number;
  status: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
}
