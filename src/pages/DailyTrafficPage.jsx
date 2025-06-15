import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BaseLayout from '../components/BaseLayout';
import { fetchTraffic } from '../app/features/trafficSlice';
import { Button, DatePicker } from 'antd';
import DailyTrafficComponent from '../components/TrafficReport/DailyTrafficComponent';
import dayjs from 'dayjs';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ExportOutlined } from '@ant-design/icons';
import { getTotalByType } from '../utils/trafficUtils';

const getToday = () => new Date().toISOString().split('T')[0];

const DailyTrafficPage = () => {

  const dispatch = useDispatch();
  const { traffic, loading, error } = useSelector(state => state.traffic);

  const [activeTab, setActiveTab] = useState('Tunai');
  const [selectedDate, setSelectedDate] = useState(getToday());

  useEffect(() => {
    if (selectedDate) {
      dispatch(fetchTraffic({ search: selectedDate }));
    } else {
      dispatch(fetchTraffic({}));
    }
  }, [dispatch, selectedDate]);

  const handleChangeDate = (dateString) => {
    setSelectedDate(dateString);
  };

  const handleFilter = () => {
    if (selectedDate) {
      dispatch(fetchTraffic({ search: selectedDate }));
    } else {
      dispatch(fetchTraffic({}));
    }
  };

  const handleReset = () => {
    setSelectedDate('');
    dispatch(fetchTraffic({}));
  };

  const tabKeyToType = {
    tunai: 'Tunai',
    etoll: 'Etoll',
    eflo: 'eFlo',
    ktp: 'KTP',
    semua: 'All',
    gabungan: 'E-Toll + eFlo + Tunai',
  };

  const handleExport = () => {
    if (!traffic || traffic.length === 0) return;

    const type = tabKeyToType[activeTab] || 'Tunai';

    const filtered = traffic.map(item => {
      const total = getTotalByType(item, type);
      return {
        ID: item.id,
        Ruas: `Ruas ${item.IdCabang}`,
        Gerbang: `Cabang ${item.IdGerbang}`,
        Gardu: item.IdGardu,
        Hari: new Date(item.Tanggal).toLocaleDateString('id-ID', { weekday: 'long' }),
        Tanggal: new Date(item.Tanggal).toLocaleDateString('id-ID'),
        Metode: type,
        'Total Lalin': total,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Lalu Lintas');

    const fileName = `Lalin-${selectedDate || getToday()}-${type}.xlsx`;
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, fileName);
  };
  
  return (
    <BaseLayout>
      <h1 className='font-semibold'>Laporan Lalin Per Hari</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='flex my-4 gap-2 flex-wrap'>
        <DatePicker
          value={selectedDate ? dayjs(selectedDate) : null}
          onChange={handleChangeDate}
          format="YYYY-MM-DD"
          placeholder="Pilih tanggal"
        />

        <Button type="primary" onClick={handleFilter}>
          Filter
        </Button>

        <Button onClick={handleReset}>
          Reset
        </Button>
        <Button onClick={() => handleExport(activeTab)}>
          <ExportOutlined /> Export
        </Button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message || error}</p>}
      <DailyTrafficComponent traffic={traffic} onTabChange={(key) => setActiveTab(key)} />
    </BaseLayout>
  );
};

export default DailyTrafficPage;
