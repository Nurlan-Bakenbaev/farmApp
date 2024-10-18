import { Box, Spinner, Text } from '@chakra-ui/react';

const Loading = () => {
 return (
  <Box
   display="flex"
   flexDirection="column"
   justifyContent="center"
   alignItems="center"
  >
   <Spinner size="lg" thickness="2px" speed="0.70s" color="blue.500" />
   <Text mt={2} fontSize="lg" color="gray.700">
    Please wait...
   </Text>
  </Box>
 );
};

export default Loading;
