"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdLightMode, MdModeNight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromStorage } from "../redux/features/userSlice";
import { RxHamburgerMenu } from "react-icons/rx";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUserFromStorage(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  return (
    <Container maxW={"100%"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        mx="auto"
        h={"80px"}
        gap={2}
        alignItems={"center"}
        justifyContent={"space-between"}>
        {/* Navbar Logo */}
        <Box
          display={{ base: "none", md: "block" }}
          bgGradient="linear(to-r, #7921CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "28px", md: "36px" }}
          fontWeight="extrabold">
          <Link href={"/"}>Anzeigen</Link>
        </Box>

        {/* Search Bar */}
        <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Input placeholder="Search..." />
          <Button backgroundColor={"#7921CA"}>
            <CiSearch size={30} />
          </Button>
        </Stack>

        {/* Buttons and User Menu */}
        <Box
          display={{ base: "none", md: "flex" }}
          alignItems={"center"}
          gap={3}>
          <Link href={"/create"} className="nav-Link">
            <IoMdAdd />
          </Link>
          <Button
            display={{ base: "none", md: "block" }}
            _hover={{ backgroundColor: "#FF0080" }}
            backgroundColor={"#7921CA"}
            color={"white"}
            onClick={toggleColorMode}>
            {colorMode === "light" ? <MdModeNight /> : <MdLightMode />}
          </Button>
          <Flex>
            {user ? (
              <User user={user.user} />
            ) : (
              <Box>
                <Link href={"/signup"} className="nav-Link">
                  Signup
                </Link>
              </Box>
            )}
          </Flex>
        </Box>

        {/* Hamburger Menu for small screens */}
        <Box display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              color={"purple"}
              icon={<RxHamburgerMenu fontSize={"30px"} />}
              variant="outline"
              aria-label="Menu"
            />
            <MenuList p={"15px"}>
              <MenuItem>
                <Link href={"/create"}>Create a Product</Link>
              </MenuItem>
              <MenuItem onClick={toggleColorMode}>Set Mode</MenuItem>
              <Text
                bgGradient="linear(to-r, #7921CA, #FF0080)"
                bgClip="text"
                fontSize={{ base: "28px", md: "36px" }}
                fontWeight="extrabold">
                <Link href={"/"}>Anzeigen</Link>
              </Text>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navbar;
