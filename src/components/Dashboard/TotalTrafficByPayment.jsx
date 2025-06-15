import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const TotalTrafficByPayment = () => {
  const { traffic } = useSelector(state => state.traffic);
  
  const total = {
    BCA: 0,
    BRI: 0,
    BNI: 0,
    DKI: 0,
    Mandiri: 0,
    Mega: 0,
    Flo: 0,
  };

  (traffic || []).forEach(item => {
    total.BCA += item.eBca || 0;
    total.BRI += item.eBri || 0;
    total.BNI += item.eBni || 0;
    total.DKI += item.eDKI || 0;
    total.Mandiri += item.eMandiri || 0;
    total.Mega += item.eMega || 0;
    total.Flo += item.eFlo || 0;
  });

  const chartData = [
    { metode: 'BCA', total: total.BCA },
    { metode: 'BRI', total: total.BRI },
    { metode: 'BNI', total: total.BNI },
    { metode: 'DKI', total: total.DKI },
    { metode: 'Mandiri', total: total.Mandiri },
    { metode: 'Mega', total: total.Mega },
    { metode: 'Flo', total: total.Flo },
  ];

  return (
    <div style={{ width: '100%', height: 400, marginTop: 20 }}>
      <h2>Jumlah Lalin per Metode Pembayaran E-Money</h2>
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="metode" />
          <YAxis label={{ value: 'Jumlah Lalin', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Bar dataKey="total" fill="#333" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalTrafficByPayment;
