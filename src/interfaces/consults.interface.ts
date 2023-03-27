export interface IConsultsRequest {
  date?: string;
  hour?: string;
  animal?: string;
  doctor?: string;
  treatment_name?: string;
  treatment_description?: string;
  medicines?: string[];
  procedures?: [
    {
      date?: string;
      hour?: string;
      name?: string;
      type?: string;
      description?: string;
      id?: string;
    }
  ];
}
