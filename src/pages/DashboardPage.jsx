import { useEffect, useState } from 'react';
import BaseLayout from '../components/BaseLayout';
import { useDispatch } from 'react-redux';
import { fetchTraffic } from '../app/features/trafficSlice';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import TotalTrafficByPayment from '../components/Dashboard/TotalTrafficByPayment';
import TotalTrafficByGate from '../components/Dashboard/TotalTrafficByGate';
import TotalTrafficByShift from '../components/Dashboard/TotalTrafficByShift';
import TotalTrafficByRuas from '../components/Dashboard/TotalTrafficByRuas';

const getToday = () => new Date().toISOString().split('T')[0];

const DashboardPage = () => {
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(getToday());

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchTraffic({ search: selectedDate }));
    } else {
      dispatch(fetchTraffic({}));
    }
  }, [dispatch, selectedDate]);

  const handleChangeDate = (_, dateString) => {
    setSelectedDate(dateString);
  };

  return (
    <BaseLayout>
      <h1 className='font-semibold mb-2'>Dashboard</h1>
      <DatePicker
        value={selectedDate ? dayjs(selectedDate) : null}
        onChange={handleChangeDate}
        format="YYYY-MM-DD"
        placeholder="Pilih tanggal"
      />
      <div className='grid grid-cols-4 gap-4'>
        <div className="col-span-3">
          <TotalTrafficByPayment />
        </div>
        <div>
          <TotalTrafficByShift />
        </div>
        <div className="col-span-3">
          <TotalTrafficByGate />
        </div>
        <div>
          <TotalTrafficByRuas />
        </div>
      </div>
    </BaseLayout>
  )
}

export default DashboardPage
