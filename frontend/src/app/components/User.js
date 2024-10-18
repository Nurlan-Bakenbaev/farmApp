import { Avatar, Button, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { MdAccountCircle } from 'react-icons/md';
import { logout } from '../redux/features/userSlice';
import { useDispatch } from 'react-redux';

const User = ({ user }) => {
 const dispatch = useDispatch();

 const handleLogout = () => {
  dispatch(logout());
  localStorage.removeItem('token');
  window.location.href = '/';
 };

 return (
  <Flex alignItems={'center'} gap={3}>
   <Wrap>
    <WrapItem display={{ base: 'none', md: 'block' }}>
     <Avatar
      title={user?.name}
      size="md"
      src={`http://localhost:8000/uploads/${user?.photo?.split('/').pop()}` || <MdAccountCircle />}
     />
    </WrapItem>
   </Wrap>
   <Button onClick={handleLogout}>Log out</Button>
  </Flex>
 );
};

export default User;
