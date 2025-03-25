
import { getDrivers } from "../infrastructure/api/driverService";
import { getVehicles } from "../infrastructure/api/vehicleService";
import { getClients } from "../infrastructure/api/clientService";
import { transformDrivers, transformVehicles, transformClients } from "../utils/transformers";

export const fetchAll = async () => {
  try {
    const drivers = await getDrivers();
    const vehicles = await getVehicles();
    const clients = await getClients();

    const transformedDrivers = transformDrivers(drivers);
    const transformedVehicles = transformVehicles(vehicles);
    const transformedClients = transformClients(clients);

    return {
      drivers: transformedDrivers,
      vehicles: transformedVehicles,
      clients: transformedClients
    };
  } catch (error) {
    console.error("Error fetching or transforming data", error);
    throw error;
  }
};