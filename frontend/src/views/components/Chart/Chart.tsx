import {useMemo} from 'react';

type ChartProps = {
    employees: any[];
};

export default function Chart({employees}: ChartProps) {
    const chartData = useMemo(() => {
        const totalLeavesPerEmployee = employees.map((emp) => {
            const totalLeaves = emp.leave_logs.reduce((sum: number, log: any) => sum + (log.count || 0), 0);
            return {
                name: emp.name,
                value: totalLeaves,
            };
        });
        return totalLeavesPerEmployee.filter(e => e.value > 0);
    }, [employees]);

    const total = chartData.reduce((sum, item) => sum + item.value, 0);

    const getColor = (i: number) =>
        ['#1E90FF', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF6666'][i % 6];

    const paths = useMemo(() => {
        let cumulativePercent = 0;

        const getCoordinatesForPercent = (percent: number) => {
            const x = Math.cos(2 * Math.PI * percent);
            const y = Math.sin(2 * Math.PI * percent);
            return [x, y];
        };

        return chartData.map((slice, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
            cumulativePercent += slice.value / total;
            const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

            const largeArcFlag = slice.value / total > 0.5 ? 1 : 0;

            const d = `
                M ${startX} ${startY}
                A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
                L 0 0
            `;

            return {
                d,
                name: slice.name,
                color: getColor(index),
            };
        });
    }, [chartData, total]);

    if (chartData.length === 0) return null;

    return (
        <div className="flex flex-col items-center mb-12 mt-12">
            <svg viewBox="-1 -1 2 2" style={{transform: 'rotate(-90deg)', width: 250, height: 250}}>
                {paths.map((path, i) => (
                    <path key={i} d={path.d} fill={path.color} stroke="white" strokeWidth="0.005"/>
                ))}
            </svg>
            <div className="mt-6 flex flex-col space-y-2">
                {paths.map((p, i) => (
                    <div key={i} className="flex items-center space-x-2">
                        <span className="w-4 h-4 inline-block rounded" style={{backgroundColor: p.color}}></span>
                        <span>{p.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}