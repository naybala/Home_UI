export interface Property {
  id: string;
  code: string;
  price: number;
  currencyCode: string;
  currencySymbol: string;
  lastPrice: number;
  type: string;
  groupType: string;
  location: string;
  locationName: string;
  propertyStatus: string;
  createdAt: string;
  userFullName: string;
  profileUrl: string;
  desc: string;
  url: string;
  urlList?: string[];
}

export type PropertyList = Property[];

export interface PropertyDetail extends Property {
  title: string;
  titleType: string;
  status: string;
  countryName: string;
  size: string | number;
  priceShort: string;
  pricePerSquare: string;
  createdUser: string;
  createdUserName: string;
  phoneNumberPrefix: string;
  countryCode: string;
  locationId: string;
  districtId: string;
  districtName: string;
  address: string;
  additional: any[];
  dimension: string;
  linkYoutube: string | null;
  is_private: boolean;
  numBathroom: number;
  numBed: number;
  numFav: number;
  numRenew: number;
  shareUrl: string | null;
  urlList: string[];
  nearBy: any[];
  view: number;
  position: {
    lat: number;
    lng: number;
  };
  geolocation: {
    coordinates: number[];
    type: string;
  };
  commissionFee: number;
  commissionRate: number;
  extraPrice: number;
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
