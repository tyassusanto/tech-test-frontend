import { useSelector } from 'react-redux';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
} from 'recharts';

const TotalTrafficByRuas = () => {
  const { traffic } = useSelector(state => state.traffic);

  const cabangLalinMap = {};

  (traffic || []).forEach(item => {
    const totalLalin =
      (item.Tunai || 0) +
      (item.eMandiri || 0) +
      (item.eBri || 0) +
      (item.eBni || 0) +
      (item.eBca || 0) +
      (item.eNobu || 0) +
      (item.eDKI || 0) +
      (item.eMega || 0) +
      (item.eFlo || 0) +
      (item.DinasKary || 0) +
      (item.DinasMitra || 0) +
      (item.DinasOpr || 0);

    const idCabang = item.IdCabang || 'Unknown';

    if (!cabangLalinMap[idCabang]) {
      cabangLalinMap[idCabang] = 0;
    }

    cabangLalinMap[idCabang] += totalLalin;
  });

  const cabangChartData = Object.entries(cabangLalinMap).map(([key, value]) => ({
    name: `Ruas ${key}`,
    value
  }));

  const totalLalin = cabangChartData.reduce((sum, curr) => sum + curr.value, 0) || 1;

  const COLORS = ['#dcdcf1', '#b1a9a0', '#353132', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

  return (
    <div style={{ width: '100%', maxWidth: 360, height: 340, margin: 'auto', textAlign: 'center' }}>
      <h3>Total Lalin</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={cabangChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {cabangChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="bottom"
            align="center"
            formatter={(value, entry, index) => {
              const val = cabangChartData[index].value;
              const percent = ((val / totalLalin) * 100).toFixed(0);
              return `${value} — ${percent}%`;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalTrafficByRuas;
