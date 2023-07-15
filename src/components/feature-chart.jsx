import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const properties = [
  'acousticness',
  'danceability',
  'energy',
  'instrumentalness',
  'liveness',
  'speechiness',
  'valence',
];

export default function FeatureChart(props) {
  const [data, setData] = useState(null);
  const { axis, features } = props;

  const average = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  useEffect(() => {
    const createDataset = (features) => {
      const dataset = {};
      properties.forEach((prop) => {
        if (features) {
          dataset[prop] = features.length
            ? average(features.map((feature) => feature && feature[prop]))
            : features[prop];
        }
      });

      return dataset;
    };

    const parseData = () => {
      const dataset = createDataset(features);

      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      const config = {
        labels: labels.map((item) => item),
        datasets: [
          {
            data: data.map((item) => item),
            fill: true,
            backgroundColor: [
              'rgba(255, 99, 132, 0.3)',
              'rgba(255, 159, 64, 0.3)',
              'rgba(255, 206, 86, 0.3)',
              'rgba(75, 192, 192, 0.3)',
              'rgba(54, 162, 235, 0.3)',
              'rgba(104, 132, 245, 0.3)',
              'rgba(153, 102, 255, 0.3)',
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(104, 132, 245, 1)',
              'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
      };

      setData(config);
    };

    parseData();
  }, [props, features]);

  return (
    <div className='w-11/12 h-96 sm:h-80 rounded-md flex items-center justify-center'>
      {data && (
        <Bar
          data={data}
          options={{
            indexAxis: axis,
            plugins: {
              title: {
                display: true,
                text: 'Audio Features',
                padding: 24,
                color: '#fff',
                font: {
                  size: 18,
                  weight: 'bold',
                },
              },
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            ticks: {
              beginAtZero: true,
              max: 1,
              stepSize: 0.1,
              font: {
                size: 10,
              },
            },
            scales: {
              y: {
                grid: {
                  display: true,
                  color: 'rgba(255,255,255,0.3)',
                },
              },
              x: {
                grid: {
                  display: true,
                  color: 'rgba(255,255,255,0.3)',
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}
