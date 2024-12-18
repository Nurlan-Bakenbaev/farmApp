'use client';

import { Box, Text, Heading, Flex, Badge, VStack, HStack, IconButton, Divider, Icon, Avatar } from '@chakra-ui/react';
import { MdAttachMoney, MdOutlineCategory, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaWeightHanging } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import Slider from 'react-slick';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '@/app/components/Loading';
import { getOneProduct } from '@/app/redux/features/productSlice';
import Link from 'next/link';
import Image from 'next/image';

const SingleProductPage = () => {
 const dispatch = useDispatch();
 const { singleProduct: product, loading, error } = useSelector((state) => state.product);
 const { id: productId } = useParams();

 useEffect(() => {
  if (productId) {
   dispatch(getOneProduct(productId));
  }
 }, [dispatch, productId]);

 const NextArrow = (props) => {
  const { onClick } = props;
  return (
   <IconButton
    aria-label="Next"
    icon={<IoIosArrowDropright size={35} />}
    position="absolute"
    right="0px"
    top="50%"
    transform="translateY(-50%)"
    zIndex="2"
    onClick={onClick}
   />
  );
 };

 const PrevArrow = (props) => {
  const { onClick } = props;
  return (
   <IconButton
    aria-label="Previous"
    icon={<IoIosArrowDropleft size={35} />}
    position="absolute"
    left="0px"
    top="50%"
    transform="translateY(-50%)"
    zIndex="2"
    onClick={onClick}
   />
  );
 };

 const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
 };

 if (!product) return <Loading />;
 if (error) return <Text>Error loading product</Text>;

 return (
  <Box mx="auto" my={10} p={5} maxWidth="900px">
   <Heading as="h1" size="2xl" textAlign="center" mb={6} fontWeight="bold">
    {product?.name}
    {product.bio && (
     <Badge ml="1" fontSize="0.8em" colorScheme="green">
      BIO
     </Badge>
    )}
   </Heading>

   {product.images && product.images.length > 0 && (
    <Box position="relative" mb={5} p={4}>
     <Slider {...settings}>
      {product.images.map((file, index) => (
       <Image src={`https://farmapp-1.onrender.com/uploads/${file.split('/').pop()}`} key={index} alt={`Product image ${index + 1}`} width={500} height={500} />
      ))}
     </Slider>
    </Box>
   )}
   <Link href={`/products-owner/${product.user._id}`}>
    <Flex alignItems="center" gap={2}>
     <Avatar name={product.user.name || 'Anonymous'} size="sm" />
     <Text fontSize="sm">{product.user.name || 'Anonymous'}</Text>
    </Flex>
   </Link>
   <Divider my="10px" />

   <VStack spacing={6} p={4} boxShadow={'xl'} align="stretch" w="full">
    <Flex justify="space-between" align="center">
     <HStack>
      <Icon as={MdOutlineCategory} boxSize={5} color="teal.500" />
      <Text fontSize="lg" fontWeight="semibold">
       {product.category}
      </Text>
     </HStack>
     <HStack>
      <Icon as={MdAttachMoney} boxSize={5} color="blue.500" />
      <Text fontSize="lg" fontWeight="semibold">
       {product.price}
      </Text>
     </HStack>
    </Flex>

    <Flex justify="space-between" align="center">
     <HStack>
      <Icon as={BiPackage} boxSize={5} color="green.500" />
      <Text fontSize="lg" fontWeight="semibold">
       {product.quantity}/kg available
      </Text>
     </HStack>
     <HStack>
      <Icon as={FaWeightHanging} boxSize={5} color="orange.500" />
      <Text fontSize="lg" fontWeight="semibold">
       Minimum Order: {product.minOrder}
      </Text>
     </HStack>
    </Flex>

    <Flex justify="space-between" align="center">
     <HStack>
      <Icon as={MdLocationOn} boxSize={5} color="red.500" />
      <Text fontSize="lg" fontWeight="semibold">
       {product.address}
      </Text>
     </HStack>
     <HStack>
      <Icon as={MdPhone} boxSize={5} color="purple.500" />
      <Text fontSize="lg" fontWeight="semibold">
       {`+ ${product.telephone || ' Telephon is undefined'} `}
      </Text>
     </HStack>
    </Flex>

    <Box>
     <Heading as="h2" size="lg" mb={4}>
      Description
     </Heading>
     <Text fontSize="md">{product.description}</Text>
    </Box>
   </VStack>
  </Box>
 );
};

export default SingleProductPage;
