import { Box } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect } from 'react';

function Notes(props) {
    const getNotes = async()=>{
        const {data} = await axios.get(`${process.env.REACT_APP_BASE_URL}/notes/get`)
    }

    useEffect(()=>{
        
    },[])
    return (
        <Box bg="#262626" w="100vw" h="100vh">
            
        </Box>
    );
}

export default Notes;