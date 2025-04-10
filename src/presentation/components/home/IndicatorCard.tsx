import { FC } from "react";
import { motion } from "framer-motion";
import { HomeStatsModel } from "../../../domain/models/HomeStatsModel";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const IndicatorCard: FC<{ stats: HomeStatsModel }> = ({ stats }) => {
  const chartData = [
    { name: 'Enero', value: 30 },
    { name: 'Febrero', value: 45 },
    { name: 'Marzo', value: 60 },
    { name: 'Abril', value: 80 },
  ];

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4">{stats.title}</h3>
      <div className="w-full flex justify-center">
        {stats.type === "number" ? (
          <div className="text-4xl font-semibold">{stats.value}</div>
        ) : (
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default IndicatorCard;