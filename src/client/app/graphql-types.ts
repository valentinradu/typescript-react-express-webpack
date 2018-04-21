/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface RegisterOrderInput {
  token: string,
  category: OrderCategory,
  pickup: LocationInput,
  dropoff: LocationInput,
  pickupAddress: AddressInput,
  dropoffAddress: AddressInput,
  scheduledDate?: string | null,
  recipientFirstName?: string | null,
  recipientLastName?: string | null,
  recipientPhoneNumber?: string | null,
};

// An enumeration.
export enum OrderCategory {
  fixed = "fixed",
  taxi = "taxi",
}


export interface LocationInput {
  lat: string,
  lon: string,
};

export interface AddressInput {
  area?: string | null,
  name?: string | null,
  street?: string | null,
  city?: string | null,
  zipNo?: string | null,
  country?: string | null,
};

export interface RegisterUserInput {
  token: string,
  firstName: string,
  lastName: string,
  role: Role,
  phoneNumber?: string | null,
  email?: string | null,
};

// An enumeration.
export enum Role {
  overseer = "overseer",
  patron = "patron",
  provider = "provider",
}


export interface UpdateUserInput {
  token: string,
  iban?: string | null,
  company?: CompanyInput | null,
  vehicle?: VehicleInput | null,
  status: AccountStatus,
  location?: LocationInput | null,
  pushNotification?: PushNotificationInput | null,
  id?: string | null,
};

export interface CompanyInput {
  name: string,
  address?: AddressInput | null,
};

export interface VehicleInput {
  category: VehicleCategory,
  color?: Color | null,
  make?: string | null,
  model?: string | null,
  license?: string | null,
};

// An enumeration.
export enum VehicleCategory {
  bicycle = "bicycle",
  car = "car",
  motobike = "motobike",
}


// An enumeration.
export enum Color {
  black = "black",
  blue = "blue",
  brown = "brown",
  green = "green",
  grey = "grey",
  red = "red",
  silver = "silver",
  white = "white",
}


// An enumeration.
export enum AccountStatus {
  offline = "offline",
  online = "online",
}


export interface PushNotificationInput {
  category: PushNotificationCategory,
  token: string,
};

// An enumeration.
export enum PushNotificationCategory {
  firebase = "firebase",
}


export interface GetUserInput {
  token: string,
};

export interface GetOrdersInput {
  token: string,
  filtering?: OrderFilterInput | null,
};

export interface OrderFilterInput {
  ids?: Array< string | null > | null,
  statuses?: Array< OrderStatus | null > | null,
  dateRange?: DateRange | null,
};

// An enumeration.
export enum OrderStatus {
  cancelled = "cancelled",
  done = "done",
  pendingDropoff = "pendingDropoff",
  pendingPickup = "pendingPickup",
  pendingProvider = "pendingProvider",
  pendingShowup = "pendingShowup",
}


export interface DateRange {
  start: string,
  end: string,
};

export interface GetAccessTokenInput {
  token: string,
};

export interface TrackOrderInput {
  token: string,
  filtering?: OrderFilterInput | null,
};

export interface registerOrderMutationVariables {
  params: RegisterOrderInput,
};

export interface registerOrderMutation {
  registerOrder:  {
    id: string,
  } | null,
};

export interface registerUserMutationVariables {
  params: RegisterUserInput,
};

export interface registerUserMutation {
  registerUser:  {
    id: string,
    role: Role,
    location:  {
      lon: string,
      lat: string,
    } | null,
    company:  {
      name: string,
      address:  {
        street: string | null,
        zipNo: string | null,
        city: string | null,
        country: string | null,
      } | null,
    } | null,
  } | null,
};

export interface updateUserMutationVariables {
  params: UpdateUserInput,
};

export interface updateUserMutation {
  updateUser:  {
    id: string,
    role: Role,
    location:  {
      lon: string,
      lat: string,
    } | null,
    company:  {
      name: string,
      address:  {
        street: string | null,
        zipNo: string | null,
        city: string | null,
        country: string | null,
      } | null,
    } | null,
  } | null,
};

export interface loginQueryVariables {
  params: GetUserInput,
};

export interface loginQuery {
  getUser:  {
    id: string,
    role: Role,
    location:  {
      lon: string,
      lat: string,
    } | null,
    company:  {
      name: string,
      address:  {
        street: string | null,
        zipNo: string | null,
        city: string | null,
        country: string | null,
      } | null,
    } | null,
  } | null,
};

export interface ordersQueryVariables {
  params: GetOrdersInput,
};

export interface ordersQuery {
  getOrders:  Array< {
    id: string,
    status: OrderStatus,
    provider:  {
      firstName: string,
      lastName: string,
      location:  {
        lon: string,
        lat: string,
      } | null,
    } | null,
    patron:  {
      firstName: string,
      lastName: string,
    },
    pickupAddress:  {
      street: string | null,
      zipNo: string | null,
      city: string | null,
    },
    dropoffAddress:  {
      street: string | null,
      zipNo: string | null,
      city: string | null,
    },
    pickup:  {
      lon: string,
      lat: string,
    },
    dropoff:  {
      lon: string,
      lat: string,
    },
    addedDate: string,
  } | null > | null,
};

export interface tokenQueryVariables {
  params: GetAccessTokenInput,
};

export interface tokenQuery {
  getAccessToken:  {
    token: string,
  } | null,
};

export interface TrackOrderSubscriptionVariables {
  params: TrackOrderInput,
};

export interface TrackOrderSubscription {
  trackOrder:  {
    id: string,
    status: OrderStatus,
    provider:  {
      firstName: string,
      lastName: string,
      location:  {
        lon: string,
        lat: string,
      } | null,
    } | null,
    patron:  {
      firstName: string,
      lastName: string,
    },
    pickupAddress:  {
      street: string | null,
      zipNo: string | null,
      city: string | null,
    },
    dropoffAddress:  {
      street: string | null,
      zipNo: string | null,
      city: string | null,
    },
    pickup:  {
      lon: string,
      lat: string,
    },
    dropoff:  {
      lon: string,
      lat: string,
    },
    addedDate: string,
  } | null,
};
