import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import ReactApexChart from 'react-apexcharts'
import abbrNum from '../../services/numberHelper';

export default function Income({chartsData, title, label}) {
  const [isLoading, setLoading] = useState(false)
  const [lbText, setLbText] = useState(label)
  const [data, setData] = useState()
  const [revenueList, setRevenueList] = useState([65, 59, 80, 81, 56, 65, 59, 80, 81, 56, 22, 22])
  const listManga = ["truyện 1", "truyện 2",  "truyện 3",  "truyện 4dfgsdfgsdfgsdfgsdfgsdfgsdfgsdfgsdfsdfgdfgdsfgdfg",  "truyện 5",  "truyện 6",  "truyện 7",  "truyện 8",  "truyện 9",  "truyện 10",  "truyện 11",  "truyện 12"]
  var labelText = ''
  useEffect(() => {
    console.log(chartsData)
    if (chartsData) {
      if (isLoading) {
        let rs = []
        chartsData.forEach(function addRevenue(i) {
          rs.push(i.revenue)
        })
        setRevenueList(rs)
      }
      setLoading(false)
    }
    console.log(label)
    labelText = label.toString()
  }, [])
  
  const c = {
    series: [{
      name: `${label}`,
      data: revenueList
    },],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        labels: {
          rotate: -45,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        categories: listManga,
      },
      yaxis: {
        title: {
          text: `${label}`
        },
        labels: {
          formatter: function (value) {
            return  abbrNum(value);
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return abbrNum(value);
          }
        }
      }
    },
  }
  return (
    <Box display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>{title}</Typography>

      {
        isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
          <ReactApexChart options={c.options} series={c.series} type="bar"  width={'100%'} height={"200%"}/>
      }
    </Box>
  );
}