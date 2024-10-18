'use client';
import React, { useEffect } from 'react';
import CardComponent from './components/Card';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, resetProductState } from './redux/features/productSlice';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import Image from 'next/image';
const HomePage = () => {
 const { products, loading, success, error } = useSelector(state => state.product);
 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(getAllProducts());
  return () => {
   dispatch(resetProductState());
  };
 }, [dispatch]);
 console.log(products, products.image);
 if (loading) {
  return (
   <HStack>
    <Skeleton height="100px" />
    <Skeleton height="100px" />
    <Skeleton height="100px" />
   </HStack>
  );
 }

 if (error) {
  return <div>Error: {error}</div>;
 }
 return (
  <Box>
   <Text fontSize="2xl" mb={4}>
    Advertisements {-products.length}
   </Text>
   <Flex justifyContent="center" wrap={'wrap'} gap={3}>
    {products.length > 0 ? (
     products?.map(data => (
      <CardComponent
       key={data._id}
       title={data.category}
       description={data.description}
       imageUrl={`http://localhost:8000/uploads/${data.image[0].split('/').pop()}`}
      />
     ))
    ) : (
     <Image src="/nodata.png" alt="No Products" width={600} height={600} />
    )}
   </Flex>
  </Box>
 );
};
export default HomePage;
