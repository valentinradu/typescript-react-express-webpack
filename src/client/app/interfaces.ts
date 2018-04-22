namespace Common {
  export interface DateRange {
    start: string,
    end: string,
  }
  export enum OrderStatus {
    cancelled = "cancelled",
    done = "done",
    pendingDropoff = "pendingDropoff",
    pendingPickup = "pendingPickup",
    pendingProvider = "pendingProvider",
    pendingShowup = "pendingShowup",
  }
  export enum AccountStatus {
    offline = "offline",
    online = "online",
  }
  export interface OrderFilter {
    ids?: Array< string | null >,
    statuses: (OrderStatus | null)[],
    dateRange?: DateRange,
  }
  export enum OrderCategory {
    fixed = "fixed",
    taxi = "taxi",
  }
  export enum Role {
    overseer = "overseer",
    patron = "patron",
    provider = "provider",
  }
  export interface Address {
    street?: string,
    zipNo?: string,
    city?: string,
    country?: string,
  }
  export interface Company {
    name: string
    address?: Address
  }
  export interface Location {
    lon: string,
    lat: string,
  }
  export interface User {
    id: string,
    role: Role,
    location?: Location,
    company?: Company
  }
  export interface Order {
    id: string
  }
  export interface Model {
    token?: string
    user?: User
    ordersFilter: OrderFilter
    orderResourcesMap: { [Key: string]: any }
  }
  export interface UIMessage {
    title: string,
    message?: string
  }
  export type ChangeHandler<T> = (event: React.ChangeEvent<T>) => void
  export type MouseHandler<T> = (event: React.MouseEvent<T>) => void
}
export default Common