'use client';
import { Box, Button, Container, Flex, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, IconButton, Text } from '@chakra-ui/react';
import { AddIcon, MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import React, { useEffect } from 'react';
import User from './User.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setUserFromStorage } from '../redux/features/userSlice';
import SearchInput from './SearchInput';

const Navbar = () => {
 const { colorMode, toggleColorMode } = useColorMode();
 const dispatch = useDispatch();
 const { user } = useSelector((state) => state.user);
 console.log(user);

 useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
   dispatch(setUserFromStorage(JSON.parse(storedUser)));
  }
 }, [dispatch]);
 const likedProducts = useSelector((state) => state.user.user.likedProducts?.length);
 return (
  <Container maxW={'100%'} bg={useColorModeValue('gray.100', 'gray.900')} py={4}>
   <Flex mx="auto" h={'80px'} alignItems={'center'} justifyContent={'space-between'}>
    <Box
     display={{ base: 'none', md: 'block' }}
     bgGradient="linear(to-r, green.500, green.700)"
     bgClip="text"
     fontSize={{ base: '22px', md: '28px' }}
     fontWeight="extrabold"
    >
     <Link href="/">ECO-FARM</Link>
    </Box>

    <Box flex={1} mx={4}>
     <SearchInput />
    </Box>

    <Flex alignItems={'center'} gap={4}>
     <Link href="/create">
      <IconButton
       display={{ base: 'none', md: 'block' }}
       aria-label="Create Product"
       icon={<AddIcon />}
       variant="outline"
       colorScheme="green"
       size="md"
       _hover={{ backgroundColor: 'green.500', color: 'white' }}
      />
     </Link>
     <Button
      display={{ base: 'none', md: 'block' }}
      onClick={toggleColorMode}
      variant="outline"
      colorScheme="green"
      size="md"
      _hover={{ backgroundColor: 'green.500', color: 'white' }}
     >
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
     </Button>
     {user.id !== null || !user ? (
      <Link position={'absolute'} href={'/current-user'}>
       <User />
       <Text
        display={{ base: 'none', md: 'block' }}
        position={'relative'}
        align={'center'}
        top={-5}
        left={0}
        fontSize={'12px'}
        backgroundColor={'red'}
        w={'18px'}
        height={'18px'}
        borderRadius={'50%'}
       >
        {likedProducts}
       </Text>
      </Link>
     ) : (
      <Link href="/signup">
       <Button variant="solid" colorScheme="green">
        Signup
       </Button>
      </Link>
     )}
    </Flex>

    <Box display={{ base: 'flex', md: 'none' }}>
     <Menu>
      <MenuButton as={IconButton} colorScheme="green" icon={<HamburgerIcon />} variant="outline" aria-label="Menu" />
      <MenuList p={'15px'}>
       <MenuItem>
        <Link href="/create">Create a Product</Link>
       </MenuItem>
       <MenuItem onClick={toggleColorMode}>Toggle Mode</MenuItem>
       <MenuItem>
        <Link href="/signup">Signup</Link>
       </MenuItem>
      </MenuList>
     </Menu>
    </Box>
   </Flex>
  </Container>
 );
};

export default Navbar;
