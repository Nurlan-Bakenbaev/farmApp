'use client';
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Avatar, SimpleGrid, VStack, HStack, Spinner, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProducts } from '../redux/features/productSlice';
import Loading from '../components/Loading';
import CardComponent from '../components/Card';

const CurrentUserPage = () => {
 const toast = useToast();

 const { user, loading, error } = useSelector((state) => state.user);

 if (loading) {
  return <Loading />;
 }

 if (!user) {
  return <Text align={'center'}>No user information available.</Text>;
 }
 console.log(user.user.products);

 return (
  <Box p={5}>
   <VStack spacing={4} align="start">
    <Heading as="h1" size="xl">
     {user.user.name}'s Profile
    </Heading>
    <HStack spacing={4}>
     <Avatar name={user.user.name} src={`https://farmapp-1.onrender.com/uploads/${user.user.photo.split('/').pop()}` || '/default-avatar.jpg'} />
     <VStack align="start">
      <Text fontSize="lg">email: {user.user.email}</Text>
      <Text fontSize="lg">created: {new Date(user.user.createdAt).toLocaleDateString()}</Text>
     </VStack>
    </HStack>

    <Heading as="h2" size="lg" mt={6}>
     My Products
    </Heading>
    {user.user.products.length === 0 ? (
     <Text>User has not created any Products yet</Text>
    ) : (
     <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
      {user?.user?.products.map((product) => (
       <CardComponent key={product._id} productData={product} />
      ))}
     </SimpleGrid>
    )}
   </VStack>
  </Box>
 );
};

export default CurrentUserPage;
