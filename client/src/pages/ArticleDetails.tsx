import React from 'react'
import { DataProvider, HttpError } from "@pankod/refine-core";
import {Typography,Stack,Box} from '@pankod/refine-mui';
import {useDelete,useGetIdentity,useShow} from '@pankod/refine-core';
import {useParams,useNavigate} from '@pankod/refine-react-router-v6';
import {ChatBubble,Delete,Edit,Phone,Place,Star} from '@mui/icons-material';
import {CustomButton} from 'components';



function checkImage(url: any) {
  const img = new Image();
  img.src = url;
  return img.width !== 0 && img.height !== 0;
}

const Article_Details = () => {
  const navigate=useNavigate();
  const {data:user}=useGetIdentity();
  const {id}=useParams();
  console.log(id);
  const{mutate}=useDelete();
  const {queryResult}=useShow();
  const{data,isLoading,isError}=queryResult;
  const Article=data?.data??[]
  if(isLoading){
    return <Typography>Loading.....</Typography>
  }
  if(isError){
    return <Typography>Error.....</Typography>
  }

  const isCurrentUser = user.email === Article.creator.email;
  const handleDeleteArticle = () => {
      const response = window.confirm(
          "Are you sure you want to delete this Article?",
      );
      if (response) {
          mutate(
              {
                  resource: "articles",
                  id: id as string,
              },
              {
                  onSuccess: () => {
                      navigate("/articles");
                  },
              },
          );
      }
  };
  return (
    
    <Box borderRadius="15px" padding="20px"  bgcolor="#fcfcfc" width="fit-content">
      <Typography fontSize={25} fontWeight={700} color="#11142d">
      {Article.title}
      </Typography>
        <Box mt="20px" display="flex" flexDirection={{xs:'column',lg:'row'}} gap={4}>
        <Box flex={1} maxWidth={764}>          
        <img src={Article.photo} alt={Article.title} height={546} width="100%" style={{objectFit:'cover',borderRadius:'10px',maxWidth:'100%',height:'auto',padding:'0',margin:'0'}} className=".article_details-img "></img>
        <Box mt="15px">
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            alignItems="center"
                        >
                            <Typography
                                fontSize={18}
                                fontWeight={500}
                                color="#11142D"
                                textTransform="capitalize"
                            >
                                {Article.articleType}
                            </Typography>
                            <Box>
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <Star
                                        key={`star-${item}`}
                                        sx={{ color: "#F2C94C" }}
                                    />
                                ))}
                            </Box>
                        </Stack>

                        <Stack
                            direction="row"
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <Box>
                                <Typography
                                    fontSize={22}
                                    fontWeight={600}
                                    mt="10px"
                                    color="#11142D"
                                >
                                    {Article.title}
                                </Typography>
                            </Box>

                        </Stack>

                        <Stack mt="25px" direction="column" gap="10px">
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {Article.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(Article.creator.avatar)
                                        ? Article.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {Article.creator.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Author
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                            </Stack>

                            <Typography
                                mt={1}
                                fontSize={16}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {Article.creator.allArticles.length}{" "}
                                Articles
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap="wrap"
                            gap={2}
                        >
                            {/* <CustomButton
                                title={!isCurrentUser ? "Message" : "Edit"}
                                backgroundColor="#475BE8"
                                color="#FCFCFC"
                                fullWidth
                                icon={
                                    !isCurrentUser ? <ChatBubble /> : <Edit />
                                }
                                handleClick={() => {
                                    if (isCurrentUser) {
                                        navigate(
                                            `/properties/edit/${Article._id}`,
                                        );
                                    }
                                }}
                            /> */}
                            <CustomButton
                                title={!isCurrentUser ? "Call" : "Delete"}
                                backgroundColor={
                                    !isCurrentUser ? "#2ED480" : "#d42e2e"
                                }
                                color="#FCFCFC"
                                fullWidth
                                icon={!isCurrentUser ? <Phone /> : <Delete />}
                                handleClick={() => {
                                    if (isCurrentUser) handleDeleteArticle();
                                }}
                            />
                        </Stack>
                    </Stack>

                 
                </Box>
            </Box>
        </Box>
    );
};
export default Article_Details