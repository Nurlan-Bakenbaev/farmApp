import { Box, Spinner, Text } from '@chakra-ui/react';

const Loading = () => {
 return (
  <Box
   display="flex"
   flexDirection="column"
   justifyContent="center"
   alignItems="center"
   minH="100vh" 
   textAlign="center" 
  >
   <Spinner
    size="lg"
    thickness="4px" 
    speed="0.65s"
    color="blue.500"
    aria-label="Loading" 
   />
   <Text mt={4} fontSize="lg" fontWeight="medium" color="gray.700">
    Please wait...
   </Text>
  </Box>
 );
};

export default Loading;
