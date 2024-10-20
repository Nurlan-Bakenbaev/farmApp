'use client';
import React from 'react';
import {
 Box,
 Image,
 Text,
 Stack,
 Flex,
 Avatar,
 Badge,
 IconButton,
 Tag,
 Tooltip,
 HStack,
 VStack,
 useDisclosure,
 useToast
} from '@chakra-ui/react';
import { FcLikePlaceholder, FcLike } from 'react-icons/fc';
import {
 FaPhone,
 FaTruck,
 FaLeaf,
 FaWarehouse,
 FaCalendarAlt,
 FaMapMarkerAlt
} from 'react-icons/fa';
import {
 MdCategory,
 MdAttachMoney,
 MdProductionQuantityLimits,
 MdOutlineDelete
} from 'react-icons/md';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/features/productSlice';
import ModalWindow from './ModalWindow';
const CardComponent = ({ productData }) => {
 const [liked, setLiked] = React.useState(false);
 const { isOpen, onOpen, onClose } = useDisclosure();
 const {
  _id,
  price,
  minOrder,
  user: userId,
  username,
  category,
  quantity,
  bio,
  telephone,
  name,
  image,
  delivery,
  address,
  createdAt
 } = productData;
 const dispatch = useDispatch();
 const toast = useToast();
 const handleDelete = async (_id) => {
  try {
   const result = await dispatch(deleteProduct(_id)).unwrap();
   toast({
    title: 'Product Deleted.',
    description: `Product ${productData.name} has been successfully deleted.`,
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
    duration: 3000,
    isClosable: true
   });
  }
 };
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
   transition="transform 0.7s"
   _hover={{ transform: 'scale(1.01)' }}
  >
   <Box position="relative">
    {bio && (
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
    )}

    <IconButton
     aria-label="Like button"
     icon={liked ? <FcLike className="icons" /> : <FcLikePlaceholder className="icons" />}
     position="absolute"
     top="10px"
     right="10px"
     onClick={handleLikeClick}
     isRound
    />
    <IconButton
     icon={<MdOutlineDelete onClick={onOpen} className="icons" />}
     position="absolute"
     top="10px"
     left="10px"
     isRound
    />

    <Link href={`/single-product/${_id}`}>
     <Image
      borderRadius="8px"
      width="100%"
      height="100%"
      src={
       image?.length > 0
        ? `http://localhost:8000/uploads/${image[0].split('/').pop()}`
        : '/farmer.png'
      }
      alt={name}
      fallbackSrc="/default-image.jpg"
      objectFit="cover"
     />
    </Link>
   </Box>

   <Box p="4">
    <Stack spacing={3}>
     <Text borderBottom="1px solid gray" pb={2} textAlign="center" fontWeight="bold" fontSize="2xl">
      {name}
     </Text>

     <Flex justifyContent="center" gap={2}>
      <HStack>
       <MdAttachMoney className="icons" color="green" />
       <Text fontSize="md" fontWeight="bold">
        Price:{price} kg
       </Text>
      </HStack>
      <HStack>
       <MdProductionQuantityLimits className="icons" color="orange" />
       <Text fontSize="md" fontWeight="bold">
        Min order: {minOrder || 'N/A'}
       </Text>
      </HStack>
     </Flex>

     <Flex justifyContent="space-between" borderTop="1px solid gray" pt={2}>
      <HStack>
       <MdCategory className="icons" color="purple" />
       <Link href={`/cat/${category}`}>
        <Text fontWeight="bold" color="purple">
         {category || 'Not Selected'}
        </Text>
       </Link>
      </HStack>
      <HStack>
       <FaWarehouse className="icons" color="blue" />
       <Text>{`In stock: ${quantity || 'N/A'}`}</Text>
      </HStack>
     </Flex>

     <HStack justify="center" spacing={4}>
      {bio && <FaLeaf color="green" className="icons" title="BIO" />}
      {delivery && <FaTruck color="green" className="icons" title="Delivery" />}
     </HStack>

     <VStack align="start" spacing={2}>
      <HStack>
       <FaMapMarkerAlt color="red" />
       <Text>{address || 'No address provided'}</Text>
      </HStack>
      <HStack>
       <FaCalendarAlt className="icons" color="gray" />
       <Text>{`${new Date(createdAt).toLocaleDateString()}`}</Text>
      </HStack>
     </VStack>

     <Link href={`/products-owner/${userId}`}>
      <Flex alignItems="center" gap={3}>
       <HStack>
        <FaPhone />
        <Text>{telephone || 'No Phone Available'}</Text>
       </HStack>
       <Avatar name={username || 'Anonymous'} title={username} />
       <Text borderBottom="1px solid gray">{username || 'Anonymous'}</Text>
      </Flex>
     </Link>
     <ModalWindow
      isOpen={isOpen}
      onClose={onClose}
      id={_id}
      handleDelete={handleDelete}
      itemName={name}
     />
    </Stack>
   </Box>
  </Box>
 );
};

export default CardComponent;
