import { Employee } from ".";

export type TAttendance = {
    id: string;
    employeeId: string;
    date: string;
    checkIn: string;
    checkOut: string;
    monthName: string;
    createdAt: string;
    updatedAt: string;
    attendanceType: string | null;
    employee: Employee;
  };