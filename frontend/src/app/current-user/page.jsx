'use client';
import React from 'react';
import { Box, Heading, Text, Avatar, SimpleGrid, VStack, HStack, Button, useToast, Icon } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import CardComponent from '../components/Card';
import { FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
import { PhoneIcon } from '@chakra-ui/icons';

const CurrentUserPage = () => {
 const { user = {}, loading, error } = useSelector((state) => state.user);

 if (loading || !user.user) {
  return <Loading />;
 }

 return (
  <Box p={5} borderRadius="lg">
   <VStack spacing={4} align="start">
    <Heading as="h1" size="xl" color="teal.500">
     {`${user.user.name || 'User'}'s Products`}
    </Heading>

    <HStack spacing={4}>
     <Avatar
      name={user.user.name || 'User'}
      src={user.user.photo ? `https://farmapp-1.onrender.com/uploads/${user.user.photo.split('/').pop()}` : '/default-avatar.jpg'}
      size="lg"
      boxShadow="md"
     />
     <VStack align="start">
      <HStack>
       <Icon as={FaEnvelope} boxSize={5} color="gray.500" />
       <Text fontSize="lg">{user.user.email || 'No email available'}</Text>
      </HStack>
      <HStack>
       <Icon as={PhoneIcon} boxSize={5} color="gray.500" />
       <Text fontSize="lg">{` +${user.user?.products[0]?.telephone}` || 'No email available'}</Text>
      </HStack>
      <HStack>
       <Icon as={FaCalendarAlt} boxSize={5} color="gray.500" />
       <Text fontSize="lg">Created: {user.user.createdAt ? new Date(user.user.createdAt).toLocaleDateString() : 'N/A'}</Text>
      </HStack>
     </VStack>
    </HStack>

    <Heading as="h2" size="lg" mt={6} color="teal.400">
     My Products
    </Heading>
    {user.user.products ? (
     <Text>User has not created any Products yet</Text>
    ) : (
     <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
      {user.user.products.map((product) => (
       <CardComponent key={product._id} productData={product} />
      ))}
     </SimpleGrid>
    )}
   </VStack>
  </Box>
 );
};

export default CurrentUserPage;
