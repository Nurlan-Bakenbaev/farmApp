'use client';
import React from 'react';
import { Box, Heading, Text, Avatar, SimpleGrid, VStack, HStack, Button, useToast, Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import CardComponent from '../components/Card';
import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const CurrentUserPage = () => {
 const { user, loading, error } = useSelector((state) => state.user);

 if (loading) {
  return <Loading />;
 }

 if (!user) {
  return <Text align={'center'}>No user information available.</Text>;
 }

 return (
  <Box p={5} borderRadius="lg">
   <VStack spacing={4} align="start">
    <Heading as="h1" size="xl" color="teal.500">
     {user.user.name}'s Profile
    </Heading>
    <HStack spacing={4}>
     <Avatar
      name={user.user.name}
      src={`https://farmapp-1.onrender.com/uploads/${user.user.photo.split('/').pop()}` || '/default-avatar.jpg'}
      size="lg"
      boxShadow="md"
     />
     <VStack align="start">
      <HStack>
       <Icon as={FaEnvelope} boxSize={5} color="gray.500" />
       <Text fontSize="lg">{user.user.email}</Text>
      </HStack>
      <HStack>
       <Icon as={FaCalendarAlt} boxSize={5} color="gray.500" />
       <Text fontSize="lg">Created: {new Date(user.user.createdAt).toLocaleDateString()}</Text>
      </HStack>
     </VStack>
    </HStack>

    <Heading as="h2" size="lg" mt={6} color="teal.400">
     My Products
    </Heading>
    {user.user.products.length === 0 ? (
     <Text>User has not created any Products yet</Text>
    ) : (
     <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
      {user.user.products.map((product) => (
       <CardComponent key={product._id} productData={product} />
      ))}
     </SimpleGrid>
    )}
   </VStack>
   <Button mt={5} colorScheme="teal" size="lg" onClick={() => console.log('Edit Profile Clicked')}>
    Edit Profile
   </Button>
  </Box>
 );
};

export default CurrentUserPage;
