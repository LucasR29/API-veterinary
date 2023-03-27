export interface IAddressRequest {
  district: string;
  zipCode: string;
  number: string;
  city: string;
  state: string;
  street: string;
  complement: string;
}

export interface IAddressUpdate {
  id: string;
  district?: string;
  zipCode?: string;
  number?: string;
  city?: string;
  state?: string;
  street?: string;
  complement?: string;
}
