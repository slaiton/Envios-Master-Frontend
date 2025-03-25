import { useEffect, useState } from "react";
import { getHomeStats } from "../../../application/usecases/home/getHomeStats";
import IndicatorCard from "../../components/home/IndicatorCard";
import { HomeStatsModel } from "../../../domain/models/HomeStatsModel";

const Home = () => {
  const [stats, setStats] = useState<HomeStatsModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStats = await getHomeStats();
      setStats(fetchedStats);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {stats.map(stat => (
        <IndicatorCard key={stat.id} stats={stat} />
      ))}
    </div>
  );
};

export default Home;