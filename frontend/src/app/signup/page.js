'use client';
import { FormControl, FormHelperText, Link } from '@chakra-ui/react';
import {
 Button,
 Container,
 Flex,
 Heading,
 Input,
 Text,
 useColorModeValue,
 VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postUser } from '../redux/features/userSlice';
import { useRouter } from 'next/navigation';
import { userValidator } from '../utils/passwordValidator';
import Loading from '../components/Loading';
const Login = () => {
 const [userData, setUserData] = useState({
  email: '',
  password: '',
  name: ''
 });
 const [validationMessage, setValidationMessage] = useState('');
 const [formError, setFormError] = useState(true);
 const { user, loading, error } = useSelector(state => state.user);
 const dispatch = useDispatch();
 const router = useRouter();
 const handleChange = e => {
  setUserData({ ...userData, [e.target.name]: e.target.value });
 };

 const handleLogin = e => {
  e.preventDefault();
  const { status, message } = userValidator(userData.password);
  if (!status) {
   setFormError(false);
   setValidationMessage(message);
   return;
  }
  setValidationMessage('');
  dispatch(postUser(userData));
 };
 if (loading) {
  <Loading />;
  return;
 }
 if (user) {
  router.push('/login');
 }

 return (
  <Container maxW={'container.sm'}>
   <Heading as={'h2'} mb={'20px'} size={'xl'} textAlign={'center'}>
    Create an Account
   </Heading>
   <FormControl
    className={`sign-up-form ${error || (!formError && 'shake')}  `}
    w={'full'}
    bg={useColorModeValue('gray.50', 'gray.900')}
    p={6}
    rounded={'lg'}
    shadow={'md'}
   >
    <VStack padding={'10px'} spacing={4}>
     <Input placeholder="User name" name="name" value={userData.name} onChange={handleChange} />
     <Input
      isRequired
      type="email"
      placeholder="Email Address"
      name="email"
      value={userData.email}
      onChange={handleChange}
     />
     {userData.email && (
      <FormHelperText color={'red'}>
       {error ? error.message : "We'll never share your credentials"}
      </FormHelperText>
     )}
     <Input
      isRequired
      type="password"
      placeholder="Password"
      name="password"
      value={userData.password}
      onChange={handleChange}
     />
     {!formError && <FormHelperText color={'red'}>{validationMessage}</FormHelperText>}
     <Flex>
      <Button
       isLoading={error || user ? false : loading}
       onClick={handleLogin}
       colorScheme="purple"
      >
       Sign up
      </Button>
     </Flex>
    </VStack>
    <Link _hover={{ color: 'purple.500' }} href={'/login'}>
     Already have an Account?
    </Link>
   </FormControl>
  </Container>
 );
};

export default Login;
