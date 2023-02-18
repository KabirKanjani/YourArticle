import React, { useState } from 'react'
import { Box, DataGrid, Typography } from '@pankod/refine-mui';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetIdentity,useList } from '@pankod/refine-core';
import CategoryCard from 'components/common/CategoryCard';
  


const Categories = () => {
    const { data: user } = useGetIdentity();
    const [img, setImg] = useState('https://res.cloudinary.com/dkvscghgu/image/upload/v1676635141/Return_of_Sports_pxhf4y.jpg');
    const { data, isLoading, isError } = useList({
        resource: "articles/categories",        
    });

    const AllCategories = data?.data ?? [];    

    AllCategories.map((article)=>(        
        
        console.log()
    ))
    if (isLoading) return <div>loading...</div>;
    if (isError) return <div>error...</div>;
    
  return (
     <Box>
      <Typography fontSize={25} mx={5} fontWeight={700} color="#11142D">
            All Sports
        </Typography>
    <Box mt="20px" sx={{display:'flex' , flexWrap:'wrap',gap:3}}>        
    {AllCategories.map((article)=>(        
      <CategoryCard 
      id={article._id}
      key={article._id}
      Image={article.data['0']!==undefined ?article.data['0'].link :'https://res.cloudinary.com/dkvscghgu/image/upload/v1676635141/Return_of_Sports_pxhf4y.jpg'}
      articleType={article.articleType}         
      />
    ))}
    </Box>
    </Box>
  )
}

export default Categories