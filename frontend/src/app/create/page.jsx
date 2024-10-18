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
 Flex
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { categories } from '../utils/categories';
import { createProduct } from '../redux/features/productSlice';

const CreateProductForm = () => {
 const { user, loading, error } = useSelector(state => state.user);
 const [productFormData, setFormData] = useState({
  name: '',
  price: '',
  description: '',
  category: '',
  quantity: '',
  minOrder: '',
  userId: null
 });
 const { loading: productLoading, error: productError, success } = useSelector(state => state.product);
 const [files, setFiles] = useState([]);
 const [filePreviews, setFilePreviews] = useState([]);
 const router = useRouter();
 const toast = useToast();
 const dispatch = useDispatch();
 useEffect(() => {
  if (user?.user?.userId) {
   setFormData(prevFormData => ({
    ...prevFormData,
    userId: user.user.userId
   }));
  }
 }, [user]);
 const handleChange = e => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
 };

 const handleFilesChange = e => {
  const newFiles = Array.from(e.target.files);
  const updatedFiles = [...files, ...newFiles];
  setFiles(updatedFiles);

  const newPreviews = newFiles.map(file => URL.createObjectURL(file));
  setFilePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
 };

 const handleSubmit = async e => {
  e.preventDefault();

  const formData = new FormData();

  // Append other product details
  Object.keys(productFormData).forEach(key => {
   formData.append(key, productFormData[key]);
  });

  // Append files directly (should match the field name used in your backend)
  files.forEach(file => {
   formData.append('files', file); // Ensure 'files' matches the multer configuration
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

 useEffect(() => {
  return () => {
   filePreviews.forEach(filePreview => URL.revokeObjectURL(filePreview));
  };
 }, [filePreviews]);

 return (
  <>
   <Text fontSize="2xl" mb={4}>
    Create your Product
   </Text>
   <Box mx="auto" m={5} p={5} borderWidth={1} borderRadius="lg">
    <form onSubmit={handleSubmit}>
     <VStack spacing={4}>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Product Name */}
       <FormControl isRequired>
        <FormLabel fontSize={11}>Name of Product</FormLabel>
        <Input
         type="text"
         name="name"
         placeholder="Enter product name"
         value={productFormData.name}
         onChange={handleChange}
        />
       </FormControl>
       {/* Price */}
       <FormControl isRequired>
        <FormLabel fontSize={11}>Price</FormLabel>
        <NumberInput min={1}>
         <NumberInputField
          name="price"
          placeholder="Product price"
          value={productFormData.price}
          onChange={handleChange}
         />
        </NumberInput>
       </FormControl>
      </Stack>
      {/* Description */}
      <FormControl isRequired>
       <FormLabel fontSize={11}>Description</FormLabel>
       <Textarea
        name="description"
        placeholder="Product description"
        value={productFormData.description}
        onChange={handleChange}
       />
      </FormControl>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Category */}
       <FormControl>
        <FormLabel fontSize={11}>Category</FormLabel>
        <Select placeholder="Select category" name="category" value={productFormData.category} onChange={handleChange}>
         {categories.map(cat => (
          <option key={cat} value={cat}>
           {cat}
          </option>
         ))}
        </Select>
       </FormControl>

       {/* Quantity */}
       <FormControl>
        <FormLabel fontSize={11}>Quantity</FormLabel>
        <NumberInput min={1}>
         <NumberInputField
          name="quantity"
          placeholder="Quantity in stock"
          value={productFormData.quantity}
          onChange={handleChange}
         />
        </NumberInput>
       </FormControl>
      </Stack>
      <Stack w="full" direction={{ base: 'column', md: 'row' }} spacing={4} alignItems="center">
       {/* Minimum Order */}
       <FormControl>
        <FormLabel fontSize={11}>Minimum Order</FormLabel>
        <Input
         type="text"
         name="minOrder"
         placeholder="Minimum order quantity"
         value={productFormData.minOrder}
         onChange={handleChange}
        />
       </FormControl>
       {/* Product Photo */}
       <FormControl>
        <FormLabel fontSize={11}>Photo Image</FormLabel>
        <Input type="file" name="photos" multiple accept="image/*" onChange={handleFilesChange} />
       </FormControl>
      </Stack>

      <Button type="submit" colorScheme="purple" width="full" isLoading={productLoading}>
       Submit
      </Button>
     </VStack>
    </form>
    <Flex mt={2} gap={1}>
     {filePreviews.length > 0 &&
      filePreviews.map((filePreview, index) => (
       <Box key={index}>
        <Image
         src={filePreview}
         alt={`Preview of ${files[index]?.name}`}
         boxSize="100px"
         objectFit="cover"
         mt={2}
         border="1px solid #ccc"
         borderRadius="md"
        />
       </Box>
      ))}
    </Flex>
   </Box>
  </>
 );
};

export default CreateProductForm;
