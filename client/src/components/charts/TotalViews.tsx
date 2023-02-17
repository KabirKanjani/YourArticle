import React from 'react'
import ReactApexChart from 'react-apexcharts';
import { ArrowCircleUpRounded } from '@mui/icons-material'
import {Box,Typography,Stack} from '@pankod/refine-mui'
import {TotalRevenueOptions,TotalRevenueSeries} from './chart.config'
const TotalViews = () => {
  return (
    <Box mt={2} p={4} flex={1} bgcolor="#fcfcfc" id="chart" display="flex" flexDirection="column" borderRadius="15px">
      <Typography fontSize={18} fontWeight={600} color="#11142d">Total Revenue</Typography>
      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700} color="#1142d">$263842</Typography>
        <Stack direction="row" alignItems="center" gap={1}><ArrowCircleUpRounded sx={{fontSize:25 , color:"#475be8"}}/>
        <Stack>
          <Typography fontSize={12} color="#475be8">0.02%</Typography>
          <Typography fontSize={12} color="#808191">Than Last Month</Typography>
          </Stack>          
        </Stack>
        </Stack>
        <ReactApexChart type="bar" height={310} options={TotalRevenueOptions} series={TotalRevenueSeries} />
    </Box> 
  )
}

export default TotalViews
