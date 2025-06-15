import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseLayout from '../components/BaseLayout';
import { fetchTraffic } from '../app/features/trafficSlice';

const getToday = () => new Date().toISOString().split('T')[0]; // hasil: "2025-06-14"

const DailyTrafficPage = () => {
  const dispatch = useDispatch();
  const { traffic, loading, error } = useSelector(state => state.traffic);

  useEffect(() => {
    const today = getToday();
    // dispatch(fetchTraffic({}));
    dispatch(fetchTraffic({ search: today }));
  }, [dispatch]);

  return (
    <BaseLayout>
      <h1 className="text-xl font-bold mb-4">Traffic Harian</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message || error}</p>}

      <ul className="mt-4">
        {traffic.map(item => (
          <li key={item.id}>
            {item.Tanggal} | Golongan: {item.Golongan} | eMandiri: {item.eMandiri}
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default DailyTrafficPage;
