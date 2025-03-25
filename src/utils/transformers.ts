export type Vehicles = { id: number; plate: string, capacity: number };
export type TransformedVehicles = { id: number; label: string };

export const transformVehicles = (vehicles: Vehicles[]): TransformedVehicles[] => {
  return vehicles.map(({ id, plate, capacity }) => ({
    id: id,
    label: plate,
    capacity: capacity
  }));
};

export type Drivers = { id: number; name: string };
export type TransformedDrivers = { id: number; label: string };

export const transformDrivers = (drivers: Drivers[]): TransformedDrivers[] => {
  return drivers.map(({ id, name }) => ({
    id: id,
    label: name,
  }));
};

export type Clients = { id: number; name: string };
export type TransformedClients = { id: number; label: string };

export const transformClients = (clients: Clients[]): TransformedClients[] => {
  return clients.map(({ id, name }) => ({
    id: id,
    label: name,
  }));
};