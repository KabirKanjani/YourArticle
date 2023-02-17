import React from 'react'
import {useList} from '@pankod/refine-core'
import {Box,Typography} from '@pankod/refine-mui'
import {AuthorCard} from 'components'

const Authors = () => {
  const {data,isLoading,isError}=useList({
    resource:'/users'
  })
  const AllAuthors=data?.data??[];
  return (
  <Box>
    <Typography fontSize={25} fontWeight={700} color="#11142d">
      Authors
    </Typography>
    <Box mt="20px" sx={{display:'flex' ,flexWrap:'wrap',gap:'20px',backgroundColor:'#fcfcfc'}}>

      {AllAuthors.map((Author)=>(
        <AuthorCard
         key={Author._id}
         id={Author._id}
         name={Author.name}
         email={Author.email}
         avatar={Author.avatar}
         noOfArticles={Author.allArticles.length}
        />      
      ))}
    </Box>
  </Box>    
  )
}

export default Authors