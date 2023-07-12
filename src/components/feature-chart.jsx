import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';

Chart.register(CategoryScale);

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
      const { features } = props;
      const dataset = createDataset(features);

      const labels = Object.keys(dataset);
      const data = Object.values(dataset);

      const config = {
        labels: labels.map((item) => item),
        datasets: [
          {
            data: data.map((item) => item),
            fill: true,
            backgroundColor: 'rgba(255, 159, 64, 0.3)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)',
          },
        ],
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Audio Features',
              font: {
                size: 18,
                weight: 'bold',
              },
            },
            legend: {
              display: false,
            },
          },
          scale: {
            ticks: {
              beginAtZero: true,
              max: 1,
              stepSize: 0.1,
              font: {
                size: 8,
                weight: 'bold',
              },
            },
            gridLines: {
              color: 'rgba(255, 255, 255, 1)',
              circular: true,
            },
          },
        },
      };

      setData(config);
    };

    parseData();
  }, [props]);

  return (
    <div className='md:w-full w-3/4 bg-white rounded-md flex items-center justify-center pt-4'>
      {data && <Radar data={data} options={data.options} />}
    </div>
  );
}
