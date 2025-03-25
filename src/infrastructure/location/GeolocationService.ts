import { ILocationService } from "../../domain/location/ILocationService";

export class GeolocationService implements ILocationService {
  getLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject("Geolocation is not supported by this browser.");
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error.message)
      );
    });
  }
}