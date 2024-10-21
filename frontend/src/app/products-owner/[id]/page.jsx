'use client';

import { Box, Divider, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import CardComponent from '@/app/components/Card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading';

const ProductOwnerPage = () => {
 const [user, setUser] = useState(null);
 const { id } = useParams();
 const getUserOwner = async () => {
  try {
   const res = await axios.get(`http://localhost:8000/user/owner/${id}`);
   console.log(res.data.user);
   setUser(res.data.user);
  } catch (error) {
   console.log(error);
  }
 };
 useEffect(() => {
  getUserOwner();
 }, [id]);
 if (!user) {
  return <Loading />;
 }
 return (
  <Box p={6}>
   <VStack spacing={6}>
    <Box>
     <Heading as="h1" size="lg">
      Product Owner
     </Heading>
    </Box>
    <Flex align="center" justify="center" direction="column">
     {user.photo && (
      <Image
       borderRadius="full"
       boxSize="150px"
       src={`http://localhost:8000/uploads/${user.photo.split('/').pop()}`}
       alt={user.name}
       mb={4}
      />
     )}
     <Text fontSize="2xl">{user.name}</Text>
     <Text fontSize="md" color="gray.500">
      {user.email}
     </Text>
     <Text fontSize="md" color="gray.500">
      {` Telephone : +${user.products[0]?.telephone.toString().replace(/(.{3})/g, '$1 ')}`}
     </Text>
    </Flex>
    <Divider />
    <Box w="full" mt={6}>
     <Heading as="h2" size="lg" mb={4}>
      {`${user.name}'s Products`}
     </Heading>
     {user.products.length === 0 ? (
      <Text>No products found.</Text>
     ) : (
      <Flex gap={4} wrap={'wrap'}>
       {user.products.map((product) => (
        <CardComponent key={product._id} productData={product} />
       ))}
      </Flex>
     )}
    </Box>
   </VStack>
  </Box>
 );
};

export default ProductOwnerPage;
