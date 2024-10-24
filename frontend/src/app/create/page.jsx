'use client';
import {
 Box,
 Button,
 FormControl,
 FormLabel,
 Input,
 Textarea,
 NumberInput,
 NumberInputField,
 Select,
 VStack,
 useToast,
 Text,
 Stack,
 Image,
 Flex,
 RadioGroup,
 Radio,
 AccordionItem,
 AccordionButton,
 AccordionPanel,
 Checkbox,
 Accordion,
 AccordionIcon,
 useColorModeValue
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../utils/categories';
import { createProduct } from '../redux/features/productSlice';

const CreateProductForm = () => {
 const { user, loading, error } = useSelector((state) => state.user);
 const [productFormData, setFormData] = useState({
  name: '',
  price: '',
  description: '',
  category: '',
  quantity: '',
  minOrder: '',
  telephone: '',
  address: '',
  delivery: false,
  bio: false,
  userId: null,
  username: null
 });
 const { loading: productLoading, error: productError, success } = useSelector((state) => state.product);
 const [files, setFiles] = useState([]);
 const [filePreviews, setFilePreviews] = useState([]);
 const router = useRouter();
 const toast = useToast();
 const dispatch = useDispatch();

 useEffect(() => {
  if (user) {
   setFormData((prevFormData) => ({
    ...prevFormData,
    userId: user?.user?._id,
    username: user.user.name
   }));
  }
 }, [user]);

 const handleChange = (e) => {
  if (e.target) {
   const { name, value, type, checked } = e.target;
   const newValue = type === 'checkbox' ? checked : value;
   setFormData((prev) => ({
    ...prev,
    [name]: newValue
   }));
  } else {
   setFormData((prev) => ({
    ...prev,
    telephone: e
   }));
  }
 };
 const handleFilesChange = (e) => {
  const newFiles = Array.from(e.target.files);
  const updatedFiles = [...files, ...newFiles];
  setFiles(updatedFiles);

  const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
  setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!productFormData?.userId) {
   toast({
    title: 'Please Login',
    description: (
     <span>
      You are not authorized to create a product. Please
      <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
       &nbsp; LOGIN &nbsp;
      </a>
      to continue.
     </span>
    ),
    status: 'error',
    duration: 6000,
    isClosable: true
   });
   return;
  }
  const formData = new FormData();

  Object.keys(productFormData).forEach((key) => {
   formData.append(key, productFormData[key]);
  });

  files.forEach((file) => {
   formData.append('files', file);
  });

  try {
   await dispatch(createProduct(formData)).unwrap();
   toast({
    title: 'Product created.',
    description: 'Your product has been created successfully.',
    status: 'success',
    duration: 3000,
    isClosable: true
   });
   setTimeout(() => {
    router.push('/');
   }, 3000);
  } catch (error) {
   console.log(error);
   toast({
    title: 'Error creating product.',
    description: error.message,
    status: 'error',
    duration: 5000,
    isClosable: true
   });
  }
 };
 const backgroundColor = useColorModeValue(' #e6ffe6', 'gray.900');
 useEffect(() => {
  return () => {
   filePreviews.forEach((filePreview) => URL.revokeObjectURL(filePreview));
  };
 }, [filePreviews]);

 return (
  <>
   <Text fontSize="2xl" mb={4}>
    Create your Product
   </Text>
   <Box mx="auto" m={5} backgroundColor={backgroundColor} p={5} borderWidth={1} borderRadius="lg">
    <form onSubmit={handleSubmit}>
     <VStack spacing={4}>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Product Name */}
       <FormControl isRequired>
        <FormLabel fontSize={11}>Name of Product</FormLabel>
        <Input type="text" name="name" placeholder="Enter product name" value={productFormData.name} onChange={handleChange} />
       </FormControl>
       {/* Price */}
       <FormControl isRequired>
        <FormLabel fontSize={11}>Price/kg/</FormLabel>
        <NumberInput min={1} step={0.01}>
         <NumberInputField name="price" placeholder="Product price" value={productFormData.price} onChange={handleChange} />
        </NumberInput>
       </FormControl>
      </Stack>
      {/* Description */}
      <FormControl isRequired>
       <FormLabel fontSize={11}>Description</FormLabel>
       <Textarea name="description" placeholder="Product description" value={productFormData.description} rows={8} maxLength={1000} onChange={handleChange} />
       <Text color={'gray.500'} fontSize={12}>
        {productFormData.description.length}/{1000}
       </Text>
      </FormControl>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Category */}
       <FormControl>
        <FormLabel fontSize={11}>Category</FormLabel>
        <Select placeholder="Select category" name="category" value={productFormData.category} onChange={handleChange}>
         {categories.map((cat) => (
          <option key={cat} value={cat}>
           {cat}
          </option>
         ))}
        </Select>
       </FormControl>

       {/* Quantity */}
       <FormControl>
        <FormLabel fontSize="11px">Quantity/kg/tons</FormLabel>
        <Input name="quantity" placeholder="Quantity in stock" value={productFormData.quantity} onChange={handleChange} />
       </FormControl>
      </Stack>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       <FormControl>
        <FormLabel fontSize={11}>Address (City,Street)</FormLabel>
        <Input type="text" name="address" placeholder="Enter address City, Street" value={productFormData.address} onChange={handleChange} />
       </FormControl>

       {/* telephone */}
       <Box>
        <FormLabel fontSize={11}>Telephone Number</FormLabel>
        <PhoneInput isRequired className="telephone" country={'kg'} name="telephone" value={productFormData.telephone} onChange={handleChange} />
       </Box>
      </Stack>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Minimum Order */}
       <FormControl>
        <FormLabel fontSize={11}>Minimum Order</FormLabel>
        <Select type="text" name="minOrder" placeholder="Minimum Order" value={productFormData.minOrder} onChange={handleChange}>
         <option> 10 kg</option>
         <option> 100 kg</option>
         <option> Negotiable </option>
        </Select>
       </FormControl>
       {/* Product Photo */}
       <FormControl>
        <FormLabel fontSize={11}>Photo Image / max 10 images</FormLabel>
        <Input type="file" name="photos" multiple accept="image/*" onChange={handleFilesChange} />
       </FormControl>
      </Stack>

      {/* First Accordion: Product Details */}
      <Accordion w={'100%'} allowMultiple>
       <AccordionItem>
        <h2>
         <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
           Additional Information
          </Box>
          <AccordionIcon />
         </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
         <VStack spacing={4}>
          <FormControl display="flex" alignItems="center">
           <Checkbox name="bio" isChecked={productFormData.bio} onChange={handleChange}>
            Bio product
           </Checkbox>
          </FormControl>

          <FormControl display="flex" alignItems="center">
           <Checkbox name="delivery" isChecked={productFormData.delivery} onChange={handleChange}>
            Can be Delivered
           </Checkbox>
          </FormControl>
         </VStack>
        </AccordionPanel>
       </AccordionItem>
      </Accordion>
      <Button type="submit" bgGradient="linear(to-r, teal.400, teal.500, teal.600)" width="full" isLoading={productLoading}>
       Submit
      </Button>
     </VStack>
    </form>
    <Flex mt={2} gap={1}>
     {filePreviews.length > 0 &&
      filePreviews.map((filePreview, index) => (
       <Box key={index}>
        <Image src={filePreview} alt={`Preview of ${files[index]?.name}`} boxSize="100px" objectFit="cover" mt={2} border="1px solid #ccc" borderRadius="md" />
       </Box>
      ))}
    </Flex>
   </Box>
  </>
 );
};

export default CreateProductForm;
