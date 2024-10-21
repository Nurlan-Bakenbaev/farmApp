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
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../redux/features/productSlice';
import ModalWindow from './ModalWindow';
import { Link } from '@chakra-ui/react';
import Loading from './Loading';
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
  images,
  delivery,
  address,
  createdAt
 } = productData;
 console.log(images);

 const dispatch = useDispatch();
 const toast = useToast();
 const { user } = useSelector((state) => state.user);
 const handleDelete = async (_id) => {
  try {
   const result = await dispatch(deleteProduct(_id)).unwrap();
   toast({
    title: 'Product Deleted.',
    description: `Product ${productData.name} deleted.`,
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
 if (!productData) {
  return <Loading />;
 }
 return (
  <Box
   maxW="240px"
   maxHeight="460px"
   borderRadius="lg"
   overflow="hidden"
   boxShadow="2xl"
   transition="transform 0.5s"
   _hover={{ transform: 'scale(1.01)' }}
  >
   <Box background={'black'}>
    <Box h="160px" position="relative" overflow="hidden">
     {bio && (
      <Badge
       zIndex={20}
       title="This Product is a Bio product"
       position="absolute"
       bottom="15px"
       left="10px"
       fontSize="0.8em"
       colorScheme="green"
      >
       BIO
      </Badge>
     )}
     {user?.user._id === productData.user && (
      <IconButton
       zIndex={20}
       icon={
        <MdOutlineDelete
         onClick={(e) => {
          e.stopPropagation();
          onOpen();
         }}
         className="icons"
        />
       }
       position="absolute"
       top="10px"
       left="10px"
       isRound
      />
     )}

     <IconButton
      zIndex={20}
      aria-label="Like button"
      icon={liked ? <FcLike className="icons" /> : <FcLikePlaceholder className="icons" />}
      position="absolute"
      top="10px"
      right="10px"
      onClick={handleLikeClick}
      isRound
     />
     <Link href={`/single-product/${_id}`}>
      <Image
       zIndex={10}
       _hover={{ opacity: '0.7' }}
       borderWidth="1px"
       boxShadow="lg"
       borderRadius="8px"
       position="absolute"
       top={0}
       left={0}
       width="100%"
       height="100%"
       src={images ? `http://localhost:8000/uploads/${images[0].split('/').pop()}` : <Loading />}
       alt={name}
       fallbackSrc="/default-image.jpg"
       objectFit="cover"
      />
     </Link>
    </Box>
   </Box>
   <Box p="3">
    <Stack spacing={2}>
     <Text borderBottom="1px solid gray" pb={1} textAlign="center" fontWeight="bold" fontSize="md">
      {name}
     </Text>

     <Flex justifyContent="space-between" alignItems="center">
      <HStack>
       <MdAttachMoney className="icons" color="green" />
       <Text fontSize="sm" fontWeight="bold">
        {price} kg
       </Text>
      </HStack>
      <HStack>
       <MdProductionQuantityLimits className="icons" color="orange" />
       <Text fontSize="sm" fontWeight="bold">
        {minOrder || 'N/A'}
       </Text>
      </HStack>
     </Flex>

     <Flex wrap={'wrap'} gap={2} justifyContent="space-between" alignItems="center">
      <MdCategory className="icons" color="purple" />
      <Link href={`/cat/${category}`}>
       <Text fontSize="sm" fontWeight="bold" color="purple" noOfLines={1}>
        {category || 'Not Selected'}
       </Text>
      </Link>
      <HStack>
       <FaWarehouse className="icons" color="blue" />
       <Text fontSize="sm">{`In stock: ${quantity || 'N/A'}`}</Text>
      </HStack>
     </Flex>
     <HStack justify="center" spacing={2}>
      {bio && <FaLeaf color="green" className="icons" title="BIO" />}
      {delivery && <FaTruck color="green" className="icons" title="Delivery" />}
     </HStack>

     <VStack align="start" spacing={1}>
      <HStack>
       <FaMapMarkerAlt color="red" />
       <Text fontSize="xs">{address || 'No address provided'}</Text>
      </HStack>
      <HStack>
       <FaCalendarAlt className="icons" color="gray" />
       <Text fontSize="xs">{`${new Date(createdAt).toLocaleDateString()}`}</Text>
      </HStack>
     </VStack>

     <Link href={`/products-owner/${userId}`}>
      <Flex alignItems="center" gap={2}>
       <HStack>
        <FaPhone />
        <Text fontSize="xs">{telephone || 'No Phone Available'}</Text>
       </HStack>
       <Avatar name={username || 'Anonymous'} title={username} size="xs" />
       <Text fontSize="xs" borderBottom="1px solid gray">
        {username || 'Anonymous'}
       </Text>
      </Flex>
     </Link>
    </Stack>
    <Box mt={1} p={2} textAlign={'right'}>
     <Link
      color="blue.500"
      textDecoration="underline"
      fontSize={'16px'}
      href={`/single-product/${_id}`}
      _hover={{ textDecoration: 'none', color: 'blue.500' }}
     >
      Read more
     </Link>
    </Box>
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
