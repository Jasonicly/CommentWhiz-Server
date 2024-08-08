
import DoughnutChartComponent from '../components/Doughnutchart';
export default function Testing() {
    const data1 = [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
    ];

    const data2 = [
        { value: 135, name: 'Negative' },
        { value: 89, name: 'Positive' }
    ];

    return (
        <div>
            <DoughnutChartComponent data={data1} chartId="chart1" />
            <DoughnutChartComponent data={data2} chartId="chart2" />
        </div>
    );

}

