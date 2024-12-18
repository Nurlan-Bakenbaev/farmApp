"use client"

import { Avatar, Button, Flex, Wrap, WrapItem, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import { logout } from '../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
 const dispatch = useDispatch();
 const { user } = useSelector((state) => state.user)
 const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem('token');
  window.location.href = '/';
 };

 return (
  <Flex display={{ base: 'none', md: 'flex' }} zIndex={20} alignItems={'center'} gap={4}>
   <Wrap>
    <WrapItem
     transition="transform 0.4s"
     _hover={{
      transform: 'scale(1.04)',
      overflow: 'hidden',
      position: 'relative'
     }}
    >
     <Avatar
      title={user?.user?.name}
      size="lg"
      src={`https://farmapp-1.onrender.com/uploads/${user?.user?.photo.split('/').pop()}` || <MdAccountCircle />}
      fallback={<MdAccountCircle style={{ fontSize: '2em', color: 'gray.300' }} />}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      borderWidth={2}
      borderStyle="solid"
      boxShadow="md"
     />
    </WrapItem>
   </Wrap>
   <Flex direction="column" align="flex-start">
    <Text fontWeight="bold">{user?.user?.name || 'User'}</Text>
    <Button
     leftIcon={<IoIosLogOut />}
     colorScheme="purple"
     variant="solid"
     size="sm"
     onClick={handleLogout}
     _hover={{ backgroundColor: '#FF0080', color: 'white' }}
    >
     Log out
    </Button>
   </Flex>
  </Flex>
 );
};

export default User;
