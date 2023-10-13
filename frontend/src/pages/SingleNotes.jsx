import { Box, Button, Container, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {GrEdit} from "react-icons/gr"
import {MdDelete} from "react-icons/md"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SingleNotes(props) {
    const navigate = useNavigate()
    const toast = useToast();
    const [notesData, setNotesData] = useState({})
    const {id} = useParams()
    
    const getSingleNotes = async(id)=>{
       try {
         const token = localStorage.getItem("myToken")
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/notes/get/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        setNotesData(data.singleNotes)
       } catch (error) {
        console.error(error)
       }
    }

    useEffect(()=>{
        getSingleNotes(id)
    },[])

    const handleDelete = async(id) => {
       try {
        const token = localStorage.getItem("myToken")
         await axios.delete(`${process.env.REACT_APP_BASE_URL}/notes/delete/${id}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
         .then((res)=>{
            console.log(res)
            toast({
            title: "Notes deleted",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
         })
         .then(()=>{
            navigate("/notes")
         })
       } catch (error) {
        toast({
            title: "Internal Error",
            status: "error",
            duration: 2000,
            isClosable: true,
          });
       }
    }
    return (
        <Box bg="#262626" color="#fff" w="100vw" h="100vh">
             <Heading
          fontWeight="600"
          fontSize="32px"
          color={"white"}
          textAlign="center"
        >
          {notesData.title}
        </Heading>
            <Box>
                <Text>
                    {notesData.description}
                </Text>
            </Box>
            <Container>
                <Stack direction='row' spacing={4}>
  <Button leftIcon={<GrEdit />} colorScheme='orange' variant='solid'>
    Edit
  </Button>
  <Button onClick={() => handleDelete(notesData._id)} rightIcon={<MdDelete />} colorScheme='orange' variant='solid'>
    Delete
  </Button>
</Stack>
            </Container>
        </Box>
    );
}

export default SingleNotes;