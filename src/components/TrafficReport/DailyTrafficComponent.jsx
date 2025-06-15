import { Tabs } from "antd";
import DailyTrafficlTable from "./DailyTrafficlTable";

const DailyTrafficComponent = ({ traffic, onTabChange }) => {
    const items = [
        {
            key: 'tunai',
            label: 'Total Tunai',
            children: <DailyTrafficlTable type="Tunai" traffic={traffic} />,
        },
        {
            key: 'etoll',
            label: 'Total E-Toll',
            children: <DailyTrafficlTable type="Etoll" traffic={traffic} />,
        },
        {
            key: 'eflo',
            label: 'Total Flo',
            children: <DailyTrafficlTable type="eFlo" traffic={traffic} />,
        },
        {
            key: 'ktp',
            label: 'Total KTP',
            children: <DailyTrafficlTable type="KTP" traffic={traffic} />,
        },
        {
            key: 'semua',
            label: 'Total Keseluruhan',
            children: <DailyTrafficlTable type="All" traffic={traffic} />,
        },
        {
            key: 'E-Toll + eFlo + Tunai',
            label: 'Total E-Toll + Tunai + Flo',
            children: <DailyTrafficlTable type="E-Toll + eFlo + Tunai" traffic={traffic} />,
        },
    ];

    return <Tabs defaultActiveKey="tunai" items={items} onChange={onTabChange} />;
};

export default DailyTrafficComponent;
