import { ILocationService } from "../../../domain/location/ILocationService";

export class LocationUseCase {
  private locationService: ILocationService;

  constructor(locationService: ILocationService) {
    this.locationService = locationService;
  }

  async execute() {
    try {
      const position = await this.locationService.getLocation();
      return position.coords;
    } catch (error) {
      throw new Error(`Unable to retrieve location: ${error}`);
    }
  }
}