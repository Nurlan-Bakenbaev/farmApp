'use client';

import {
 Box,
 Text,
 Heading,
 Image,
 Flex,
 Badge,
 VStack,
 Stack,
 Icon,
 HStack,
 IconButton,
 Divider
} from '@chakra-ui/react';
import { MdAttachMoney, MdOutlineCategory, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaWeightHanging } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import Slider from 'react-slick';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
const SingleProductPage = () => {
 const product = {
  name: 'Organic Honey',
  files: ['/about/harvest.jpg', '/about/field.jpg'],
  category: 'Food',
  price: '25.00',
  quantity: '100',
  minOrder: '10 kg',
  bio: true,
  delivery: true,
  address: '123 Honey Lane, Beeville',
  telephone: '+1 555 1234',
  description: 'Pure organic honey harvested from local farms. No preservatives, 100% natural.'
 };

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
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
 };

 return (
  <Box mx="auto" my={10} p={5} maxWidth="900px">
   <Heading as="h1" size="2xl" textAlign="center" mb={6} fontWeight="bold">
    {product.name}
    {product.bio && (
     <Badge ml="1" fontSize="0.4em" colorScheme="green">
      BIO
     </Badge>
    )}
   </Heading>
   {product.files && product.files.length > 0 && (
    <Box position="relative" mb={8}>
     <Slider {...settings}>
      {product.files.map((file, index) => (
       <Image
        key={index}
        src={file}
        alt={`Product image ${index + 1}`}
        borderRadius="md"
        boxShadow="md"
        objectFit="cover"
        w="80%"
        h={{ base: '300px', md: '450px' }}
       />
      ))}
     </Slider>
    </Box>
   )}
   <Divider m={'10px'} />
   <VStack spacing={6} align="stretch" w="full">
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
       ${product.price}
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
       {product.telephone}
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
