import { useEffect, useState } from "react";
import { getHomeStatsUseCase } from "../../../application/usecases/home/getHomeStatsUseCase";
import IndicatorCard from "../../components/home/IndicatorCard";
import { HomeStatsModel } from "../../../domain/models/HomeStatsModel";
import { IndicatorRepositoryImpl } from "../../../infrastructure/repositories/IndicatorRepositoryImpl";



const Home = () => {
  const indicatorRepository = new IndicatorRepositoryImpl();
  const createIndicatorUseCase = new getHomeStatsUseCase(indicatorRepository);
  const [stats, setStats] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStats = await createIndicatorUseCase.execute();
      setStats(fetchedStats);
    };
    fetchData();
  }, []);

  const formattedData: HomeStatsModel[] = [
    { id: '1', title: 'Envios Totales', value: 1500, type: 'number' },
    { id: '2', title: 'Vehiculos Activos', value: stats.availableVehicles, type: 'number' },
    { id: '5', title: 'Conductores Disponibles', value: stats.availableDrivers, type: 'number' },
    { id: '6', title: 'Soporte al Cliente', value: 95, type: 'number' }
  ];

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {formattedData.map(stat => (
        <IndicatorCard key={stat.id} stats={stat} />
      ))}
    </div>
  );
};

export default Home;