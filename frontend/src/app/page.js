'use client';
import React, { useEffect } from 'react';
import CardComponent from './components/Card.jsx';
import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, resetProductState } from './redux/features/productSlice';
import Link from 'next/link';
import Loading from './components/Loading.jsx';

const HomePage = () => {
 const dispatch = useDispatch();
 const { products, loading, error } = useSelector((state) => state.product);

 useEffect(() => {
  dispatch(getAllProducts());
  return () => {
   dispatch(resetProductState());
  };
 }, [dispatch]);

 if (loading) {
  return <Loading />;
 } else if (error) {
  return (
   <Flex justify="center" align="center" h="100vh">
    <Text fontSize="xl" fontWeight="bold" color="red.500">
     Error: {typeof error === 'object' ? JSON.stringify(error) : error}
    </Text>
   </Flex>
  );
 }

 return (
  <Box>
   {products.length > 0 ? (
    <>
     <Text fontSize="2xl" mb={4}>
      New Advertisements
     </Text>
     <Flex justifyContent={{ base: 'center', md: 'space-between' }} wrap="wrap" gap={3}>
      {products.map((data, idx) => (
       <CardComponent key={idx} productData={data} />
      ))}
     </Flex>
    </>
   ) : (
    <Flex justify="center" align="center" h="100vh" direction="column">
     <VStack spacing={4}>
      <Heading as="h1" size="2xl" bgGradient="linear(to-r, teal.400, teal.600)" backgroundClip="text">
       No Advertisements Available
      </Heading>
      <Link href="/create">
       <Button colorScheme="teal" bgGradient="linear(to-r, teal.400, teal.500, teal.600)" color="white" variant="solid">
        Create a New Advertisement
       </Button>
      </Link>
     </VStack>
     <Image src="/empty.png" alt="No Data" width={{ base: '280px', md: '320px' }} height={{ base: '280px', md: '320px' }} objectFit="cover" mt={4} />
    </Flex>
   )}
  </Box>
 );
};

export default HomePage;
