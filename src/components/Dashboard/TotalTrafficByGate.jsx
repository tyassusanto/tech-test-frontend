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

const TotalTrafficByGate = () => {

    const { traffic } = useSelector(state => state.traffic);

    const total = {
        Gerbang: 0
    };

    (traffic || []).forEach(item => {
        total.Gerbang += item.IdGerbang || 0;
    });

    const chartData = [
        { metode: 'Gerbang 1', total: total.Gerbang },
    ];
    return (
        <div style={{ width: '100%', height: 400, marginTop: 20 }}>
            <h2>Jumlah Lalin per Gerbang</h2>
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
    )
}

export default TotalTrafficByGate
