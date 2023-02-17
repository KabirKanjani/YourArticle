import React from 'react'
import {Add} from '@mui/icons-material';
import {useTable} from '@pankod/refine-core';
import {Box,Stack,Typography,TextField,Select,MenuItem} from '@pankod/refine-mui';
import { useNavigate } from '@pankod/refine-react-router-v6';
import { ArticleCard,CustomButton } from 'components';
import { useMemo } from "react";

const AllArticles = () => {
  const navigate=useNavigate();
  const {tableQueryResult:{data,isLoading,isError},
current,setCurrent,setPageSize,pageCount,sorter,setSorter,filters,setFilters,
}=useTable();
  const Articles=data?.data??[]
  console.log(Articles);
  const currentSports=sorter.find((item)=>item.field==='articleType')?.order;
  const toggleSort=(field:string)=>{setSorter([{field,order:currentSports==='asc'?'desc':'asc'}])}
  const currentFilterValues=useMemo(()=>{
      const logicalFilters=filters.flatMap((item)=>('field' in item? item:[]));
    return {
      title:logicalFilters.find((item)=>item.field==='title')?.value|| '',
      articleType:logicalFilters.find((item)=>item.field==='articleType')?.value|| '',
    }
  },[filters]);  
  if(isLoading){
    return <Typography>Loading.....</Typography>
  }
  if(isError){
    return <Typography>Error.....</Typography>
  }
  return (
    <Box>

      <Box mt="20px" sx={{display:'flex',flexWrap:'wrap',gap:3 }}>


        <Stack direction="column" width="100%" >


          <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={25} fontWeight={700} color="#11142d">
      {!Articles.length?'No Articles':'All Articles'}
      </Typography>
      <CustomButton title="Add Article" handleClick={()=>navigate('/articles/create')} backgroundColor="#475be8" color="#fcfcfc" icon={<Add/>}></CustomButton>
      </Stack>






          <Box mb={2} mt={3} display="flex" width="84%" justifyContent="space-between" flexWrap="wrap">
            <Box display="flex" gap={2} flexWrap="wrap" mb={{xs:'20px',sm:0}}>
            
                {/* <CustomButton title={`Sort by Sports `} handleClick={()=>{}} backgroundColor="#475be8" color="#fcfcfc"/>    */}
                <TextField variant="outlined" color="info" placeholder="Search by Title" value={currentFilterValues.title} onChange={(e)=>{setFilters(
                    [
                      {
                      field:'title',
                      operator:'contains',
                      value:e.currentTarget.value?e.currentTarget.value:undefined
                      }
                    ]
                  )
                }}/>
                <Select variant="outlined" color="info"   displayEmpty required inputProps={{'aria-label':'Without Label'}} defaultValue="All"  value={currentFilterValues.articleType} onChange={(e)=>{setFilters(
                    [
                      {
                      field:'articleType',
                      operator:'eq',
                      value:e.target.value
                      }
                    ],'replace'
                  )
                }}>
                  <MenuItem value="">All</MenuItem>
                  {['Cricket','Chess','F1','Lawn Tennis','Table Tennis','Football'].map((type)=>(
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                  
                  </Select>
                
              </Box>
            
            </Box>          
          </Stack>
        </Box>






      
      <Box mt="20px" sx={{display:'flex' , flexWrap:'wrap',gap:3}}>
        {Articles.map((article)=>(
          <ArticleCard 
          id={article._id}
          key={article._id}
          title={article.title}
          photo={article.photo} 
          desc={article.description}
          articleType={article.articleType}         
          />
        ))}
      </Box>
      {Articles.length>0 && (<Box display="flex" gap={2} mt={3} flexWrap="wrap">
        <CustomButton title="Previous" handleClick={()=>setCurrent((prev)=>prev-1)} color="#fcfcfc" disabled={!(current>1)} backgroundColor="#475be8"></CustomButton>
        <Box display={{xs:'hidden' ,sm:'flex'}} alignItems="center" gap="5px">Pages {' '}<strong>{current} of {pageCount}</strong></Box>
        <CustomButton title="Next" handleClick={()=>setCurrent((prev)=>prev+1)} color="#fcfcfc" disabled={current===pageCount} backgroundColor="#475be8"></CustomButton>        
        <Select variant="outlined" color="info" displayEmpty required inputProps={{'aria-label':'Without Label'}} defaultValue={10} value="" onChange={(e)=>{setPageSize(e.target.value?Number(e.target.value):10)}}>
        {[10,20,30,40,50,60].map((size)=>(
          <MenuItem key={size} value={size}>Show {size}</MenuItem>
        ))}
        </Select>
         </Box>
         )}
    </Box>
  )
}

export default AllArticles


