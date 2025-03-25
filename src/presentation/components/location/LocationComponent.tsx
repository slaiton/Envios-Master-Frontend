import React, { useEffect, useState } from "react";
import { LocationUseCase } from "../../../application/usecases/location/LocationUseCase";
import { GeolocationService } from "../../../infrastructure/location/GeolocationService";

const LocationComponent: React.FC = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const locationService = new GeolocationService();
    const locationUseCase = new LocationUseCase(locationService);

    const getLocation = async () => {
      try {
        const coords = await locationUseCase.execute();
        setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      } catch (err:any) {
        setError(err.message);
      }
    };

    // Solicitar ubicación al cargar el componente
    getLocation();
  }, []);

  return (
    <div>
      <h1>Ubicación</h1>
      {error && <p>Error: {error}</p>}
      {location ? (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      ) : (
        <p>Obteniendo ubicación...</p>
      )}
    </div>
  );
};

export default LocationComponent;