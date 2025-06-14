import { Button, Space, Table } from "antd";

const MasterGateTable = ({ data, onEdit, onDelete }) => {
    const columns = [
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
                pagination={false}
            />
        </div>
    )
}

export default MasterGateTable
