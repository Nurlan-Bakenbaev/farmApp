'use client';
import { FormControl, FormHelperText, Link, InputGroup, InputLeftElement } from '@chakra-ui/react';
import {
 Button,
 Container,
 Flex,
 Heading,
 Input,
 useColorModeValue,
 VStack
} from '@chakra-ui/react';
import { AtSignIcon, LockIcon, InfoIcon, AddIcon } from '@chakra-ui/icons';
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
  name: '',
  photo: null
 });
 const [validationMessage, setValidationMessage] = useState('');
 const [formError, setFormError] = useState(true);
 const [formIncomplete, setFormIncomplete] = useState(false); // State for incomplete form
 const { user, loading, error } = useSelector((state) => state.user);
 const dispatch = useDispatch();
 const router = useRouter();

 const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  if (type === 'file') {
   setUserData({ ...userData, photo: files[0] });
  } else {
   setUserData({ ...userData, [name]: value });
  }
 };

 const handleLogin = (e) => {
  e.preventDefault();

  // Check if all fields are filled
  if (!userData.name || !userData.email || !userData.password) {
   setFormIncomplete(true);
   return;
  } else {
   setFormIncomplete(false);
  }

  const { status, message } = userValidator(userData.password);
  if (!status) {
   setFormError(false);
   setValidationMessage(message);
   return;
  }

  const formData = new FormData();
  for (const key in userData) {
   formData.append(key, userData[key]);
  }

  setValidationMessage('');
  dispatch(postUser(formData));
 };

 if (loading) {
  return <Loading />;
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
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<InfoIcon color="gray.300" />} />
      <Input
       placeholder="User name"
       name="name"
       value={userData.name}
       onChange={handleChange}
       isRequired
      />
     </InputGroup>
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<AtSignIcon color="gray.300" />} />
      <Input
       isRequired
       type="email"
       placeholder="Email Address"
       name="email"
       value={userData.email}
       onChange={handleChange}
      />
     </InputGroup>
     {userData.email && <FormHelperText color={'red'}>{error && error.message}</FormHelperText>}
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<LockIcon color="gray.300" />} />
      <Input
       isRequired
       type="password"
       placeholder="Password"
       name="password"
       value={userData.password}
       onChange={handleChange}
      />
     </InputGroup>
     {!formError && <FormHelperText color={'red'}>{validationMessage}</FormHelperText>}
     {formIncomplete && <FormHelperText color={'red'}>Please fill out all fields.</FormHelperText>}
     <InputGroup>
      <InputLeftElement pointerEvents="none" children={<AddIcon color="gray.300" />} />
      <Input isRequired type="file" accept="image/*" name="photo" onChange={handleChange} />
     </InputGroup>
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