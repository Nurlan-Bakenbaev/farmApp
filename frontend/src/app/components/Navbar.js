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
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import { MdLightMode } from "react-icons/md";
import { MdModeNight } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import React, { useEffect } from "react";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromStorage } from "../redux/features/userSlice";

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
    <Container
      maxW={"100%"}
      px={4}
      bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex
        mx="auto"
        maxW={"80%"}
        h={"80px"}
        gap={3}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}>
        <Box
          display={{ base: "none", md: "block" }}
          bgGradient="linear(to-r, #7921CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "28px", md: "36px" }}
          fontWeight="extrabold">
          <Link href={"/"}>Anzeigen</Link>
        </Box>
        <Stack display={"flex"} flexDirection={"row"} alignItems={"center"}>
          <Input placeholder="Search..." size="lg" />
          <Button backgroundColor={"#7921CA"}>
            <CiSearch size={35} />
          </Button>
        </Stack>
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={3}>
          {/* buttons*/}
          <Link href={"/create"} className="nav-Link">
            <IoMdAdd />
          </Link>
          <Button
            display={{ base: "none", md: "block" }}
            _hover={{ backgroundColor: "#FF0080" }}
            backgroundColor={"#7921CA"}
            color={"white"}
            onClick={toggleColorMode}>
            {colorMode === "light" ? (
              <MdModeNight className="lightModeIcon" />
            ) : (
              <MdLightMode />
            )}
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
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
