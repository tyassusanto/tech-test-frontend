import { useEffect, useState } from 'react'
import Layout from '../components/BaseLayout'
import MasterGateForm from '../components/MasterGate/MasterGateForm'
import MasterGateTable from '../components/MasterGate/MasterGateTable'
import { useDispatch, useSelector } from 'react-redux'
import { createNewGate, deleteGateById, fetchGates, updateGate } from '../app/features/masterGatesSlice'
import { Button, Input, Modal } from 'antd'
import Swal from 'sweetalert2'

const MasterGate = () => {
  const dispatch = useDispatch();
  const { gates, loading, error } = useSelector(state => state.masterGate);


  const [selectedGate, setSelectedGate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  useEffect(() => {
    dispatch(fetchGates({ search: debouncedSearch }));
  }, [dispatch, debouncedSearch]);

  const handleSubmit = async (formData) => {
    const isEdit = !!selectedGate;

    const newGate = {
      ...formData,
      id: isEdit ? selectedGate.id : Math.floor(Math.random() * 1000) + 10,
      IdCabang: isEdit ? selectedGate.IdCabang : Math.floor(Math.random() * 1000) + 101
    };

    try {
      if (isEdit) {
        await dispatch(updateGate(newGate)).unwrap();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Data berhasil diperbarui',
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        await dispatch(createNewGate(newGate)).unwrap();
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Data berhasil ditambahkan',
          showConfirmButton: false,
          timer: 2000,
        });
      }

      dispatch(fetchGates({}));
      setSelectedGate(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleEdit = (gate) => {
    setSelectedGate(gate);
    setIsModalOpen(true);
  };

  const handleDelete = (gate) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: `Gerbang: ${gate.NamaGerbang}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGateById({ id: gate.id, IdCabang: gate.IdCabang }))
          .unwrap()
          .then((res) => {
            Swal.fire('Berhasil', res.message || 'Data berhasil dihapus', 'success');
            dispatch(fetchGates({}));
          })
          .catch((err) => {
            Swal.fire('Gagal', err || 'Terjadi kesalahan saat menghapus', 'error');
          });
      }
    });
  };

  return (
    <Layout>
      <h1 className='font-semibold'>Master Data Gerbang</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className='flex my-4 justify-between'>
        <Input
          className='max-w-sm'
          placeholder="Cari nama gerbang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            setSelectedGate(null);
            setIsModalOpen(true);
          }}
        >
          + Tambah Gerbang
        </Button>
      </div>


      <MasterGateTable data={gates} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal
        title={selectedGate ? 'Edit Gerbang' : 'Tambah Gerbang'}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedGate(null);
        }}
        footer={null}
        destroyOnHidden
      >
        <MasterGateForm initialData={selectedGate} onSubmit={handleSubmit} />
      </Modal>

    </Layout>
  )
}

export default MasterGate
