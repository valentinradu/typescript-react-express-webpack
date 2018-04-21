export const orderResourcesMap = {
  pendingProvider: {
    title: { color: 'danger', 'text': 'Unassigned' },
    smallMapIcon: 'pin-danger-small.svg',
    largePickupMapIcon: 'pin-danger-large-pickup.svg',
    largeDropoffMapIcon: 'pin-danger-large-dropoff.svg'
  },
  pendingShowup: {
    title: { color: 'warning', 'text': 'En Route' },
    smallMapIcon: 'pin-warning-small.svg',
    largePickupMapIcon: 'pin-warning-large-pickup.svg',
    largeDropoffMapIcon: 'pin-warning-large-dropoff.svg'
  },
  pendingPickup: {
    title: { color: 'warning', 'text': 'En Route' },
    subtitle: { color: 'info', 'text': 'Approaching' },
    smallMapIcon: 'pin-warning-small.svg',
    largePickupMapIcon: 'pin-warning-large-pickup.svg',
    largeDropoffMapIcon: 'pin-warning-large-dropoff.svg'
  },
  pendingDropoff: {
    title: { color: 'warning', 'text': 'En Route' },
    subtitle: { color: 'success', 'text': 'Completed' },
    smallMapIcon: 'pin-warning-small.svg',
    largePickupMapIcon: 'pin-warning-large-pickup.svg',
    largeDropoffMapIcon: 'pin-warning-large-dropoff.svg'
  },
  done: {
    title: { color: 'success', 'text': 'Completed' },
    smallMapIcon: 'pin-success-small.svg',
    largePickupMapIcon: 'pin-success-large-pickup.svg',
    largeDropoffMapIcon: 'pin-success-large-dropoff.svg'
  },
  cancelled: {
    title: { color: 'danger', 'text': 'Unassigned' },
    smallMapIcon: 'pin-danger-small.svg',
    largePickupMapIcon: 'pin-danger-large-pickup.svg',
    largeDropoffMapIcon: 'pin-danger-large-dropoff.svg'
  },
  provider: {
    smallMapIcon: 'pin-small-courier.svg',
    largeMapIcon: 'pin-large-courier.svg'
  }
}