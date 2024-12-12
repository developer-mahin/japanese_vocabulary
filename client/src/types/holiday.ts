import { Employee } from ".";

export type TWeekDay = {
  id: string;
  dayName: [string];
  createdAt: string;
  updatedAt: string;
};

export type THoliday = {
  id: string;
  holidayName: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TLeave = {
  id: string;
  applyDate: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  leaveCode: string;
  reason: string;
  approvedDate: string;
  approvedStartDate: string;
  approvedEndDate: string;
  approvedDays: number;
  managerComment: string;
  status: string;
  employeeId: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};
