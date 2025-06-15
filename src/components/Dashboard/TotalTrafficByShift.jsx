import { useSelector } from 'react-redux';
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
} from 'recharts';

const TotalTrafficByShift = () => {
    const { traffic } = useSelector(state => state.traffic);

    const shiftCount = {
        1: 0,
        2: 0,
        3: 0,
    };

    (traffic || []).forEach(item => {
        const totalLalin =
            (item.Tunai || 0) +
            (item.eMandiri || 0) +
            (item.eBri || 0) +
            (item.eBni || 0) +
            (item.eBca || 0) +
            (item.eNobu || 0) +
            (item.eDKI || 0) +
            (item.eMega || 0) +
            (item.eFlo || 0) +
            (item.DinasKary || 0) +
            (item.DinasMitra || 0) +
            (item.DinasOpr || 0);

        const shiftKey = item.Shift;
        if (shiftCount[shiftKey] !== undefined) {
            shiftCount[shiftKey] += totalLalin;
        }
    });

    const totalLalin = shiftCount[1] + shiftCount[2] + shiftCount[3] || 1; // prevent divide by zero

    const shiftChartData = [
        { name: 'Shift 1', value: shiftCount[1] },
        { name: 'Shift 2', value: shiftCount[2] },
        { name: 'Shift 3', value: shiftCount[3] },
    ];

    const COLORS = ['#dcdcf1', '#b1a9a0', '#353132'];

    return (
        <div style={{ width: '100%', maxWidth: 360, height: 340, margin: 'auto', textAlign: 'center' }}>
            <h3>Total Lalin</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={shiftChartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        {shiftChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        layout="vertical"
                        verticalAlign="bottom"
                        align="center"
                        formatter={(value, entry, index) => {
                            const val = shiftChartData[index].value;
                            const percent = ((val / totalLalin) * 100).toFixed(0);
                            return `${value} — ${percent}%`;
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TotalTrafficByShift;
