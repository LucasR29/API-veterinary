export interface IVaccine {
  id: string;
  name: string;
  class: string;
  description: string;
}

export interface IVaccinesAplications {
  id: string[] | string;
  date_aplied: string;
  medicines: IVaccine[];
}

export interface IVaccinesAplicationsGet {
  id: string[] | string;
  date_aplied: string;
  medicines: IVaccine[];
}
