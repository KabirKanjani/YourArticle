import React from 'react'
import {Typography,Stack,Box} from '@pankod/refine-mui';
import {useDelete,useGetIdentity,useShow} from '@pankod/refine-core';
import {useParams,useNavigate} from '@pankod/refine-react-router-v6';
import {ChatBubble,Delete,Edit,Phone,Place,Star} from '@mui/icons-material';
import { ArticleCard,CustomButton } from 'components';




const Category_List = () => {
    const navigate=useNavigate();
    const {data:user}=useGetIdentity();
    const {id}=useParams();
    console.log(id);
    const{mutate}=useDelete();
    const {queryResult}=useShow();
    const{data,isLoading,isError}=queryResult;
    const Articles=data?.data??[];
    if(isLoading){
      return <Typography>Loading.....</Typography>
    }
    if(isError){
      return <Typography>Error.....</Typography>
    }
  
  
    return (
          <Box mt="20px" sx={{display:'flex',flexWrap:'wrap',gap:3 }}>
        
          
          <Box mt="20px" sx={{display:'flex' , flexWrap:'wrap',gap:3}}>
          {Articles.map((article:any)=>(
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
          </Box>
      )
}

export default Category_List