'use client';
import { Link, useToast } from '@chakra-ui/react';
import {
 Box,
 Button,
 Container,
 Flex,
 Heading,
 Input,
 Text,
 useColorModeValue,
 VStack,
 InputGroup,
 InputLeftElement
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon } from '@chakra-ui/icons'; // Importing the icons
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/features/userSlice';
import { useRouter } from 'next/navigation';

const Login = () => {
 const [userData, setUserData] = React.useState({
  email: '',
  password: ''
 });
 const { user, loading, error } = useSelector((state) => state.user);
 const dispatch = useDispatch();
 const router = useRouter();
 const toast = useToast();

 useEffect(() => {
  if (user) {
   toast({
    title: 'Welcome back!',
    description: `You have successfully logged in.`,
    status: 'success',
    duration: 3000,
    isClosable: true
   });
   router.push('/');
  }
  console.log(user);
 }, [user, router, toast]);

 const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
   handleLogin(e);
  }
 };

 const handleChange = (e) => {
  setUserData({ ...userData, [e.target.name]: e.target.value });
 };

 const handleLogin = (e) => {
  e.preventDefault();
  dispatch(loginUser(userData));
 };

 return (
  <Container maxW={'container.sm'}>
   <Heading as={'h3'} mb={'20px'} size={'xl'} textAlign={'center'}>
    Login with Account
   </Heading>
   <Box
    className={`${error && 'shake'}`}
    w={'full'}
    bg={useColorModeValue('gray.100', 'gray.900')}
    p={6}
    rounded={'lg'}
    shadow={'md'}
   >
    <VStack padding={'10px'} spacing={4}>
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<AtSignIcon color="gray.300" />} />
      <Input
       type="email"
       placeholder="Email Address"
       name="email"
       value={userData.email}
       onChange={handleChange}
       isRequired
      />
     </InputGroup>
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
      <Input
       autoComplete="current-password"
       onKeyDown={handleKeyDown}
       type="password"
       placeholder="Password"
       name="password"
       value={userData.password}
       onChange={handleChange}
       isRequired
      />
     </InputGroup>
     {error && (
      <Text color="red.500" fontSize="sm">
       {error.message}
      </Text>
     )}
     <Flex>
      <Button isLoading={error ? false : loading} onClick={handleLogin} colorScheme="purple">
       Log In
      </Button>
     </Flex>
    </VStack>
    <Link _hover={{ color: 'purple.500' }} href={'/signup'}>
     Have no Account yet?
    </Link>
   </Box>
  </Container>
 );
};

export default Login;
