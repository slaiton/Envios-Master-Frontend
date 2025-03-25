export interface ILocationService {
    getLocation(): Promise<GeolocationPosition>;
  }