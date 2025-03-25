
import { getDrivers } from "../infrastructure/api/driverService";
import { getVehicles } from "../infrastructure/api/vehicleService";
import { transformDrivers, transformVehicles } from "../utils/transformers";

export const fetchAll = async () => {
  try {
    const drivers = await getDrivers();
    const vehicles = await getVehicles();

    const transformedDrivers = transformDrivers(drivers);
    const transformedVehicles = transformVehicles(vehicles);

    return {
      drivers: transformedDrivers,
      vehicles: transformedVehicles
    };
  } catch (error) {
    console.error("Error fetching or transforming data", error);
    throw error;
  }
};