import React, { useState } from 'react';
import {
 Button,
 Input,
 Stack,
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalBody,
 ModalCloseButton,
 useDisclosure,
 Spinner,
 Text,
 Box,
 useToast
} from '@chakra-ui/react';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import Link from 'next/link';

const SearchInput = () => {
 const [searchTerm, setSearchTerm] = useState('');
 const [results, setResults] = useState([]);
 const [loading, setLoading] = useState(false);
 const { isOpen, onOpen, onClose } = useDisclosure();
 const toast = useToast();

 const handleSearch = async () => {
  if (searchTerm.trim()) {
   setLoading(true);
   try {
    const response = await axios.get(`http://localhost:8000/api/search/`, {
     params: { searchTerm: searchTerm }
    });
    setResults(response.data.products);
    onOpen();
   } catch (err) {
    toast({
     title: 'Error',
     description: 'Failed to fetch products. Please try again later.',
     status: 'error',
     duration: 5000,
     isClosable: true
    });
   } finally {
    setLoading(false);
   }
   setSearchTerm('');
  }
 };

 const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
   handleSearch();
  }
 };

 const handleResultClick = () => {
  onClose();
 };

 return (
  <Stack display="flex" flexDirection="column" alignItems="center">
   <Stack display="flex" flexDirection="row" alignItems="center">
    <Input
     placeholder="Search..."
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)}
     onKeyPress={handleKeyPress}
    />
    <Button backgroundColor="green.600" onClick={handleSearch} isLoading={loading}>
     <CiSearch size={30} />
    </Button>
   </Stack>
   <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
     <ModalHeader>Search Results</ModalHeader>
     <ModalCloseButton />
     <ModalBody>
      {loading ? (
       <Spinner size="lg" />
      ) : results.length > 0 ? (
       <ul>
        {results.map((product) => (
         <Link href={`/single-product/${product._id}`} key={product._id}>
          <Box
           as="li"
           borderWidth="1px"
           borderRadius="lg"
           p={4}
           mb={4}
           cursor="pointer"
           onClick={handleResultClick}
           _hover={{ bg: 'gray.100', transform: 'scale(1.02)' }}
           transition="transform 0.2s"
          >
           <Text fontWeight="bold" fontSize="lg" color="blue.600">
            {product.name}
           </Text>
           <Text fontSize="sm" color="gray.600">
            Click to view more details
           </Text>
          </Box>
         </Link>
        ))}
       </ul>
      ) : (
       <Text>No products found.</Text>
      )}
     </ModalBody>
    </ModalContent>
   </Modal>
  </Stack>
 );
};

export default SearchInput;
