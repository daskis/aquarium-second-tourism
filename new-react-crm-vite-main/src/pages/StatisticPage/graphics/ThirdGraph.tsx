import { Line } from '@ant-design/plots';

type GraphType = {
  current: object,
  previous: object,
}

type mounthType = {
  current: {
    January: string
    February: string
    March: string
    April: string
    May: string
    June: string
    July: string
    August: string
    September: string
    October: string
    November: string
    December: string
  },
  previous: {
    January: string
    February: string
    March: string
    April: string
    May: string
    June: string
    July: string
    August: string
    September: string
    October: string
    November: string
    December: string
  }

}

export const ThirdGraph = ({current,previous}: mounthType ):GraphType => {


const data = 
[
  {
    "year": "Янв",
    "value": current.January ? current.January : 0,
    "category": "Этот год"
  },
  {
    "year": "Фев",
    "value": current.February ? current.February : 0,
    "category": "Этот год"
  },
  {
    "year": "Март",
    "value": current.March ? current.March : 0,
    "category": "Этот год"
  },
  {
    "year": "Апр",
    "value": current.April ? current.April : 0,
    "category": "Этот год"
  },
  {
    "year": "Май",
    "value": current.May ? current.May : 0,
    "category": "Этот год"
  },
  {
    "year": "Июнь",
    "value": current.June ? current.June : 0,
    "category": "Этот год"
  },
  {
    "year": "Июль",
    "value": current.July ? current.July : 0,
    "category": "Этот год"
  },
  {
    "year": "Авг",
    "value": current.August ? current.August : 0,
    "category": "Этот год"
  },
  {
    "year": "Сен",
    "value": current.September ? current.September : 0,
    "category": "Этот год"
  },
  {
    "year": "Окт",
    "value": current.October ? current.October : 0,
    "category": "Этот год"
  },
  {
    "year": "Ноя",
    "value": current.November ? current.November : 0,
    "category": "Этот год"
  },
  {
    "year": "Дек",
    "value": current.December ? current.December : 0,
    "category": "Этот год"
  },
  {
    "year": "Янв",
    "value": previous.January ? previous.January : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Фев",
    "value": previous.February ? previous.February : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Март",
    "value": previous.March ? previous.March : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Апр",
    "value": previous.April ? previous.April : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Май",
    "value": previous.May ? previous.May : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Июнь",
    "value": previous.June ? previous.June : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Июль",
    "value": previous.July ? previous.July : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Авг",
    "value": previous.August ? previous.August : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Сен",
    "value": previous.September ? previous.September : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Окт",
    "value": previous.October ? previous.October : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Ноя",
    "value": previous.November ? previous.November : 0,
    "category": "Прошлый год"
  },
  {
    "year": "Дек",
    "value": previous.December ? previous.December : 0,
    "category": "Прошлый год"
  },
 
];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    smooth: true,
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ['#5B8FF9', '#7484A5'],
    lineStyle: ({ category }) => {
      if (category === 'Прошлый год') {
        return {
          lineDash: [4, 4],
        };
      }
    },
  };
  
  return <Line {...config} />;
};

