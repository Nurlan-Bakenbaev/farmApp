import React, { useState } from 'react';
import {
 Box,
 Image,
 Text,
 Stack,
 Flex,
 Avatar,
 Badge,
 IconButton,
 HStack,
 VStack,
 useDisclosure,
 useToast,
 Button
} from '@chakra-ui/react';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import {
 MdOutlineDelete,
 MdCategory,
 MdAttachMoney,
 MdProductionQuantityLimits
} from 'react-icons/md';
import {
 FaPhone,
 FaTruck,
 FaLeaf,
 FaWarehouse,
 FaMapMarkerAlt,
 FaCalendarAlt
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/features/productSlice';
import ModalWindow from './ModalWindow';
import Link from 'next/link';
import Loading from './Loading';
import { likeProduct } from '../redux/features/userSlice';

const CardComponent = ({ productData }) => {
 const { isOpen, onOpen, onClose } = useDisclosure();
 const dispatch = useDispatch();
 const toast = useToast();
 const {
  _id,
  price,
  minOrder,
  user: userId,
  username,
  category,
  quantity,
  bio,
  name,
  images,
  delivery,
  address,
  createdAt
 } = productData;
 const { user, loading, error } = useSelector((state) => state.user);
 console.log(user);

 const isLiked = user?.likedProducts?.some((product) => product._id === _id);
 const [liked, setLiked] = useState(isLiked);
 const handleDelete = async () => {
  try {
   await dispatch(deleteProduct(_id)).unwrap();
   toast({
    title: 'Product Deleted.',
    description: `Product ${name} deleted successfully.`,
    status: 'success',
    duration: 3000,
    isClosable: true
   });
   onClose();
  } catch (error) {
   toast({
    title: 'Error deleting product.',
    description: error.message || 'Something went wrong.',
    status: 'error',
    duration: 5000,
    isClosable: true
   });
  }
 };
 const handleLike = async (userId, productId) => {
  console.log(userId, productId);

  try {
   setLiked(!liked);
   await dispatch(likeProduct({ userId, productId })).unwrap();
  } catch (error) {
   toast({
    title: `Error liking/unliking ${name}`,
    description: error.message,
    status: 'error',
    duration: 5000
   });
  }
 };
 if (!productData || !user) {
  return <Loading />;
 }
 return (
  <Box
   maxW="260px"
   borderWidth="1px"
   borderRadius="lg"
   overflow="hidden"
   boxShadow="md"
   transition="all 0.3s"
   _hover={{ transform: 'scale(1.03)' }}
  >
   <Box position="relative">
    <Image
     src={images && `https://farmapp-1.onrender.com/uploads/${images[0].split('/').pop()}`}
     alt={name}
     fallbackSrc="/default-image.jpg"
     boxSize="300px"
     objectFit="cover"
     borderTopRadius="lg"
    />
    {bio && (
     <Badge position="absolute" top="10px" left="10px" colorScheme="green">
      BIO
     </Badge>
    )}
    <Flex alignItems="center" gap={2}>
     {user?._id === userId && (
      <IconButton
       icon={<MdOutlineDelete />}
       position="absolute"
       top="10px"
       right="10px"
       size="md"
       onClick={onOpen}
       colorScheme="red"
       variant="solid"
      />
     )}
     <IconButton
      aria-label="Like button"
      icon={liked ? <FcLike /> : <FcLikePlaceholder />}
      position="absolute"
      top="10px"
      right="50px"
      size="md"
      onClick={() => handleLike(user.user._id, _id)}
      variant="solid"
      colorScheme={liked ? 'green' : 'gray'}
     />
    </Flex>
   </Box>
   <Box p="6">
    <VStack align="start" spacing={3}>
     <Box>
      <Text fontWeight="bold" fontSize="xl" noOfLines={1}>
       {name}
      </Text>
      <HStack justify="space-between" width="100%">
       <HStack>
        <MdAttachMoney />
        <Text fontSize="lg" fontWeight="semibold">
         {price} / kg
        </Text>
       </HStack>
       <HStack>
        <MdProductionQuantityLimits />
        <Text fontSize="sm">Min: {minOrder || 'N/A'}</Text>
       </HStack>
      </HStack>
      <HStack>
       <MdCategory />
       <Link href={`/cat/${category}`}>
        <Text fontSize="sm" fontWeight="bold" color="purple.500" noOfLines={1}>
         {category || 'Not Selected'}
        </Text>
       </Link>
      </HStack>
      <HStack justify="space-between" width="100%">
       <HStack>
        <FaWarehouse />
        <Text fontSize="sm">In stock: {quantity || 'N/A'}</Text>
       </HStack>
       <HStack>
        {bio && <FaLeaf color="green" />}
        {delivery && <FaTruck color="green" />}
       </HStack>
      </HStack>
      <VStack align="start" spacing={1}>
       <HStack>
        <FaMapMarkerAlt color="red" />
        <Text fontSize="xs">{address || 'No address provided'}</Text>
       </HStack>
       <HStack>
        <FaCalendarAlt color="gray" />
        <Text fontSize="xs">{new Date(createdAt).toLocaleDateString()}</Text>
       </HStack>
      </VStack>
      <Link href={`/products-owner/${userId}`}>
       <Flex alignItems="center" gap={2}>
        <Avatar name={username || 'Anonymous'} size="sm" />
        <Text fontSize="sm">{username || 'Anonymous'}</Text>
       </Flex>
      </Link>
     </Box>

     <Button
      mt={4}
      colorScheme="teal"
      width="full"
      onClick={() => (window.location.href = `/single-product/${_id}`)}
     >
      View Details
     </Button>
    </VStack>
   </Box>
   <ModalWindow
    isOpen={isOpen}
    onClose={onClose}
    id={_id}
    handleDelete={handleDelete}
    itemName={name}
   />
  </Box>
 );
};
export default CardComponent;
