'use client';
import React, { useEffect } from 'react';
import CardComponent from './components/Card.jsx';
import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, resetProductState } from './redux/features/productSlice';

import Link from 'next/link';
import Loading from './components/Loading.jsx';

const HomePage = () => {
 const { products, loading, success, error } = useSelector((state) => state.product);
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getAllProducts());
  return () => {
   dispatch(resetProductState());
  };
 }, [dispatch]);

 if (loading) {
  return <Loading />;
 }
 
 if (error) {
  return (
   <Flex justify="center" align="center" h="100vh">
    <Text fontSize="xl" fontWeight="bold" color="red.500">
     Error: {error}
    </Text>
   </Flex>
  );
 }

 console.log(products);
 return (
  <Box>
   {products.length > 0 && (
    <Text fontSize="2xl" mb={4}>
     New Advertisements
    </Text>
   )}
   <Flex justifyContent="center" wrap={'wrap'} gap={3}>
    {products.length > 0 ? (
     products?.map((data) => <CardComponent productData={data} />)
    ) : (
     <Flex
      wrap={'wrap'}
      justifyContent={'center'}
      direction={{ base: 'col', sm: 'row' }}
      alignItems={'center'}
     >
      <VStack align="center" justify="center">
       <Heading
        display="inline-block"
        as="h1"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
       >
        No Data Found!
       </Heading>
       <Link href="/create">
        <Button
         colorScheme="teal"
         bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
         color="white"
         variant="solid"
        >
         A new Advertisement
        </Button>
       </Link>
      </VStack>

      <Box className="image-container">
       <Image
        className="img"
        src="/empty.png"
        alt="No-Data"
        width={{ base: '280px', md: '320px' }}
        height={{ base: '280px', md: '320px' }}
        objectFit="fit"
       />
      </Box>
     </Flex>
    )}
   </Flex>
  </Box>
 );
};
export default HomePage;
