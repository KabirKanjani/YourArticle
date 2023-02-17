import React from 'react'
import { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

import {Box,Typography,FormControl,FormHelperText,TextField,TextareaAutosize,Stack,Select,MenuItem,Button} from '@pankod/refine-mui';
import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';

const Form = ({type,register,handleSubmit,handleImageChange,formLoading,onFinishHandler,articleImage}:FormProps) => {
  const editor = useRef(null);
	const [content, setContent] = useState('');

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} an Article
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
      <form style={{marginTop:'20px',width:"100%",display:'flex',flexDirection:'column',gap:'20px'}} onSubmit={handleSubmit(onFinishHandler)}>
      <FormControl>

        <FormHelperText sx={{fontWeight:500 , margin:'10px 0' , fontSize:16,color:"#11142d"}}>Enter Article Name:</FormHelperText>
        <TextField fullWidth required id="outlined-basic" color="info" variant="outlined" {...register('title',{required:true})}/>

      </FormControl>    
      <FormControl>

        <FormHelperText sx={{fontWeight:500 , margin:'10px 0' , fontSize:16,color:"#11142d"}}>Enter Article Description:</FormHelperText>
        <TextareaAutosize minRows={5} minLength={350} required placeholder="Write Article" color="info" style={{width:'100%' ,background:'transparent',fontSize:'16px', borderColor:'rgba(0,0,0,0,23)',borderRadius:6,padding:10 , color:"#919191"}} {...register('description',{required:true})}/>

      </FormControl>    
        <Stack direction="row" gap={4}>
        <FormControl>
          <FormHelperText sx={{
            fontWeight:500,margin:'10px 0',
            fontSize:16,color:'#11142d'
          }}>
            Select Sport:
          </FormHelperText>
          <Select variant="outlined" color="info"  displayEmpty required inputProps={{'aria-label':'Without label'}} defaultValue="Cricket" {...register('SportsTag',{required:true})}>
            <MenuItem value="Cricket">Cricket</MenuItem>
            <MenuItem value="Chess">Chess</MenuItem>
            <MenuItem value="F1">F1</MenuItem>
            <MenuItem value="Tennis">Tennis</MenuItem>
            <MenuItem value="Table_Tennis">Table Tennis</MenuItem>
            <MenuItem value="Football">Football</MenuItem>
          </Select>
        </FormControl>
        </Stack>      
        <Stack direction="column" gap={1} justifyContent="center" mb={2}>
          <Stack direction="row" gap={2} >
            <Typography color="#11142d" fontSize={16} fontWeight={500} my="10px">Article Image</Typography>
            <Button component="label" sx={{width:'fit-content' , color:"#2ed480",textTransform:'capitalize',fontSize:16}}>Upload *<input hidden accept="image/*" type="file" onChange={(e)=>handleImageChange(
              //@ts-ignore
               e.target.files[0])}/></Button>
          </Stack>
          <Typography fontSize={14} color="#808191" sx={{wordBreak:'break-all'}}>{articleImage?.name}</Typography>
          <CustomButton type="submit" title={formLoading ?'Submitting.....' :'Submit'} backgroundColor="#475be8" color="#fcfcfc"/>
          </Stack>        

      </form>
      </Box>
    </Box>

  )
}

export default Form