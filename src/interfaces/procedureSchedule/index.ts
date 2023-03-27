export interface IProcedureScheduleRequest {
  date: string;
  hour: string;
  doctor_id: string;
  procedure_name: string;
  procedures_type: string;
  procedure_description: string;
}

export interface ITewatmentRequest {
  name: string;
  description: string;
  medicines_id: IMedicineRequest;
  procedures_id: IProcedureScheduleRequest;
}

export interface IMedicineRequest {
  name: string;
  class: string;
}

export interface IProcedureResponse {
  description: string;
  type: string;
  name: string;
  id: string;
}

export interface IProcedureScheduleResponse {
  description: string;
  hour: string;
  date: string;
  id: string;
  procedure: IProcedureResponse;
}
