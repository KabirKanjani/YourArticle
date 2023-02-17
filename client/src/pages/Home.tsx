import React from 'react'
import {useList} from '@pankod/refine-core';
import {Box,Typography,Stack} from '@pankod/refine-mui'
import {
  PieChart,
  ArticlesReferrals,
  TotalViews,
  ArticleCard,
  TopAuthor,
}
from 'components'
const Home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
      <PieChart title="Article Written" value={684} series={[75,25]} colors={['#475be8',"#e4e8ef"]}/>
      <PieChart title="Views Generated" value={684} series={[75,25]} colors={['#475be8',"#e4e8ef"]}/>
      <PieChart title="Views Per Article" value={684} series={[75,25]} colors={['#475be8',"#e4e8ef"]}/>      
      </Box>
      
      <TotalViews/>
      <ArticlesReferrals/>      
    </Box>
  )
}

export default Home