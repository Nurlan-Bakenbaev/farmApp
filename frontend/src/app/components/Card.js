import React from 'react';
import { Box, Image, Text, Button, Stack, Flex, WrapItem, Avatar } from '@chakra-ui/react';
import Link from 'next/link';
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';
import { Badge } from '@chakra-ui/react';
const CardComponent = ({
 name,
 price,
 imageUrl,
 minOrder,
 userName,
 userId,
 id,
 cat,
 quantity
}) => {
 const [liked, setLiked] = React.useState(false);

 const handleLikeClick = (e) => {
  e.stopPropagation();
  setLiked(!liked);
 };

 return (
  <Box
   maxW="xs"
   borderWidth="1px"
   borderRadius="lg"
   overflow="hidden"
   boxShadow="lg"
   transition="transform 0.5s"
   _hover={{ transform: 'scale(1.01)' }}
  >
   <Box position="relative">
    <Badge
     title="This Product is a Bio product"
     position="absolute"
     bottom="15px"
     left="10px"
     ml="1"
     fontSize="0.8em"
     colorScheme="green"
    >
     BIO
    </Badge>

    <Button position="absolute" top="10px" right="10px" onClick={handleLikeClick}>
     {liked ? <FcLike fontSize={30} /> : <FcLikePlaceholder fontSize={30} />}
    </Button>
    <Link href={`/single-product/${id}`}>
     <Image borderRadius={'8px'} width="100%" height="100%" src={imageUrl} alt="Product-photo" />
    </Link>
   </Box>

   <Box p="4">
    <Stack spacing={3}>
     <Text
      borderBottom={'1px solid gray'}
      pb={2}
      textAlign={'center'}
      fontWeight="bold"
      fontSize="2xl"
     >
      {name}
     </Text>
     <Flex textAlign={'center'} gap={2}>
      <Text fontSize="md">Price: ${price} per/kg</Text>
      <Text fontSize="md">Min order: {minOrder} </Text>
     </Flex>

     <Flex
      borderTop={'1px solid gray'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={3}
      fontSize="md"
      pt={'10px'}
     >
      <Link href={`/products-owner/${userId}`}>
       <Avatar name={userName} src={'/farmer.png'} />
      </Link>
      <Link className="nav-Link" href={`/cat/${cat}`}>
       {cat}
      </Link>
      {quantity} in stock
     </Flex>
    </Stack>
   </Box>
  </Box>
 );
};

export default CardComponent;
