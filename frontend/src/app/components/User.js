import { Avatar, Button, Flex, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { MdAccountCircle } from "react-icons/md";
import { logout } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";

const User = ({ user }) => {
  const { name, img } = user;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  
  return (
    <Flex alignItems={"center"} gap={3}>
      <Wrap>
        <WrapItem display={{ base: "none", md: "block" }}>
          <Avatar
            title={name}
            size="md"
            name={name}
            src={img || <MdAccountCircle />}
          />
        </WrapItem>
      </Wrap>
      <Button onClick={handleLogout}>
        <IoIosLogOut />
      </Button>
    </Flex>
  );
};

export default User;
