import { Button, Space, Table } from "antd";
import { useState } from "react";

const MasterGateTable = ({ data, onEdit, onDelete }) => {
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
        {
            title: 'No',
            key: 'no',
            render: (_text, _record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Ruas',
            dataIndex: 'NamaCabang',
            key: 'NamaCabang',
        },
        {
            title: 'Gerbang',
            dataIndex: 'NamaGerbang',
            key: 'NamaGerbang',
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => onDelete(record)}>
                        Hapus
                    </Button>
                </Space>
            ),
        },
    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{
                    ...pagination,
                    total: data.length,
                }}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default MasterGateTable
