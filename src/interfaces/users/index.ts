export interface IAddressRequest {
  name: string;
  phone_number: string;
  createdAt: Date;
  address: IAddress;
}
export interface IAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
}
