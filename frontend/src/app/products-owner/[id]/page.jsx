'use client';
import { Box, Divider, Flex, Heading, Image, Text, VStack, Stack, Button } from '@chakra-ui/react';
import CardComponent from '@/app/components/Card';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import { Badge } from '@chakra-ui/react';

const ProductOwnerPage = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getUserOwner = async () => {
      try {
        const res = await axios.get(`https://farmapp-1.onrender.com/user/owner/${id}`);
      
        setUser(res.data.user);
      } catch (error) {
       console.error('Failed to fetch user owner', error);
      }
    };

    getUserOwner();
  }, [id]);

  if (!user) {
    return <Loading />;
  }

  return (
    <Box p={6}>
      <VStack spacing={6}>
        <Box>
          <Heading as="h1" size="lg" textAlign="center" mb={4}>
            Product Owner
          </Heading>
        </Box>
        <Flex align="center" justify="center" direction="column">
          {user.photo && (
            <Image
              borderRadius="full"
              objectFit="cover"
              boxSize="250px"
              mb={4}
              src={`https://farmapp-1.onrender.com/uploads/${user.photo.split('/').pop()}`}
              alt={user.name}
              fallbackSrc="https://via.placeholder.com/250" // Placeholder for missing image
            />
          )}
          <Badge colorScheme={user.userchecked ? 'green' : 'red'}>{user.userchecked ? 'Verified' : 'Not Verified'}</Badge>
          <Text fontSize="2xl" fontWeight="bold" mt={2}>
            {user.name}
          </Text>
          <Text fontSize="md" color="gray.500">
            {user.email}
          </Text>
          {user.products.length > 0 && (
            <Text fontSize="md" color="gray.500">
              {` Telephone: +${user.products[0]?.telephone.toString().replace(/(.{3})/g, '$1 ')}`}
            </Text>
          )}
        </Flex>
        <Divider />
        <Box w="full" mt={6}>
          <Heading as="h2" size="lg" mb={4}>
            {`${user.name}'s Products`}
          </Heading>
          {user.products.length === 0 ? (
            <Text textAlign="center">No products found.</Text>
          ) : (
            <Flex gap={4} wrap={'wrap'} justify="center">
              {user.products.map((product) => (
                <CardComponent key={product._id} productData={product} />
              ))}
            </Flex>
          )}
        </Box>
        <Button colorScheme="blue" size="md" mt={4} onClick={() => window.history.back()}>
          Go Back
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductOwnerPage;
