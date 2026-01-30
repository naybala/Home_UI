export interface Property {
  id: string;
  code: string;
  price: string | number;
  currencyCode: string;
  lastPrice: string | number;
  type: string;
  groupType: string;
  location: string;
  url: string;
  propertyStatus: string;
  createdAt: string;
  userFullName: string;
  desc: string;
  commissionFee: string | number;
  commissionRate: number;
}

export type PropertyList = Property[];

export interface PropertyDetail extends Property {
  title: string;
  titleType: string;
  status: string;
  countryName: string;
  size: number;
  priceShort: string;
  currencySymbol: string;
  locationName: string;
  districtName: string;
  numBathroom: number;
  numBed: number;
  urlList: string[];
  userPhoneNumber: string;
  userEmail: string;
  userTelegram: string;
  userCountry: string;
}

export interface PropertyResponse {
  success: boolean;
  code: number;
  message: string;
  data: {
    data: Property[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface PropertyDetailResponse {
  success: boolean;
  code: number;
  message: string;
  data: PropertyDetail;
}
