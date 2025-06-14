import { Button, Input } from 'antd';
import React, { useEffect, useState } from 'react'

const MasterGateForm = ({ initialData = null, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    IdCabang: '',
    NamaGerbang: '',
    NamaCabang: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: '', IdCabang: '', NamaGerbang: '', NamaCabang: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <div style={{ marginBottom: 16 }}>
          <label htmlFor="NamaCabang" style={{ display: 'block', marginBottom: 4 }}>
            Nama Ruas
          </label>
          <Input
            id="NamaCabang"
            placeholder="Ruas"
            name="NamaCabang"
            value={formData.NamaCabang}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="NamaGerbang" style={{ display: 'block', marginBottom: 4 }}>
            Nama Gerbang
          </label>
          <Input
            id="NamaGerbang"
            placeholder="Gerbang"
            name="NamaGerbang"
            value={formData.NamaGerbang}
            onChange={handleChange}
            required
          />
        </div>

        <div className='justify-self-end'>
          <Button type="primary" htmlType="submit">
            Simpan
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MasterGateForm
