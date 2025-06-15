import { Table } from 'antd';
import { useState } from 'react';
import { getTotalByType } from '../../utils/trafficUtils';

const DailyTrafficlTable = ({ type, traffic }) => {
    const rows = traffic || [];

    const totalPerRuas = rows.reduce((acc, item) => {
        const ruas = item.IdCabang;
        const total = getTotalByType(item);
        if (!acc[ruas]) {
            acc[ruas] = 0;
        }
        acc[ruas] += total;
        return acc;
    }, {});

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        pageSizeOptions: ['5', '10', '20', '50'],
        showSizeChanger: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} Dari ${total} Data`,
    });

    const handleTableChange = (paginationInfo) => {
        setPagination((prev) => ({
            ...prev,
            current: paginationInfo.current,
            pageSize: paginationInfo.pageSize,
        }));
    };

    const columns = [
        { title: 'ID', dataIndex: 'id' },
        {
            title: 'Ruas',
            dataIndex: 'IdCabang',
            render: (value) => `Ruas ${value}`,
        },
        {
            title: 'Gerbang',
            dataIndex: 'IdGerbang',
            render: (value) => `Cabang ${value}`,
        },
        { title: 'Gardu', dataIndex: 'IdGardu' },
        {
            title: 'Hari',
            render: (_, record) =>
                new Date(record.Tanggal).toLocaleDateString('id-ID', { weekday: 'long' }),
        },
        {
            title: 'Tanggal',
            render: (_, record) =>
                new Date(record.Tanggal).toLocaleDateString('id-ID'),
        },
        {
            title: 'Metode Pembayaran',
            render: () => type,
        },
        {
            title: 'Total Lalin',
            render: (_, record) => getTotalByType(record),
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={rows}
            rowKey="id"
            pagination={{
                ...pagination,
                total: rows.length,
            }}
            onChange={handleTableChange}
            summary={() => (
                <Table.Summary>
                    {Object.entries(totalPerRuas).map(([ruas, total]) => (
                        <Table.Summary.Row key={ruas}>
                            <Table.Summary.Cell index={0} colSpan={7} style={{ fontWeight: 'bold', textAlign: 'right' }}>
                                Total Lalin Ruas {ruas}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell index={7} style={{ fontWeight: 'bold' }}>
                                {total}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    ))}
                </Table.Summary>
            )}
        />
    );
};

export default DailyTrafficlTable;
