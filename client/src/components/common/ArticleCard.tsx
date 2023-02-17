import React from 'react'
import {Place} from '@mui/icons-material';
import {Link} from'@pankod/refine-react-router-v6'
import {Typography,Box,Card,CardMedia,CardContent,Stack} from '@pankod/refine-mui';
import {ArticleCardProps} from 'interfaces/article';
const ArticleCard = ({id,title,photo,articleType,desc}:ArticleCardProps) => {
  return (
    <Card component={Link} to={`/articles/show/${id}`}
    sx={{maxWidth:'330px' ,padding:'10px' ,'&:hover':{
      boxShadow:'0 22px 45px 2px rgba(176,176,176,0,1)'
    },
     cursor:'pointer',
     textDecoration:'none',

  }}
  elevation={0}
    >
      <CardMedia
      component="img"
      width='100%'      
      height={210}
      image={photo}
      alt="Card Image"
      sx={{borderRadius:'10px'}}
      />
      <CardContent sx={{display:'flex', flexDirection:'row',gap:'120px' ,paddingX:'5px', }}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={15} fontWeight={500} color='#11142d'>
            {title}
          </Typography>                    
        </Stack>
        
        <Box px={1.5} py={0.5}  display="flex" justifyContent="flex-end" borderRadius={1} bgcolor="#dadefa" height="fit-content" >
          <Typography fontSize={12} fontWeight={600} color="#475be8">{articleType}</Typography>          
          </Box>          
      </CardContent>
      <Box>
          <Typography fontSize={15} fontWeight={500} color='#11142d'>{desc.substring(0,30)}.....</Typography>
            </Box>          

    </Card>
  )
}

export default ArticleCard