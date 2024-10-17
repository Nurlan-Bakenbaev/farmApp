"use client";
import { Link } from "@chakra-ui/react";

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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/features/userSlice";
import { useRouter } from "next/navigation";
const Login = () => {
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    console.log(user)
  }, [user, router]);


  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(userData));
  };

  return (
    <Container maxW={"container.sm"}>
      <Heading as={"h3"} mb={"20px"} size={"xl"} textAlign={"center"}>
        Login with Account
      </Heading>
      <Box
        w={"full"}
        bg={useColorModeValue("gray.100", "gray.900")}
        p={6}
        rounded={"lg"}
        shadow={"md"}>
        <VStack padding={"10px"} spacing={4}>
          <Input
            type="email"
            placeholder="Email Address"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {error && (
            <Text color="red.500" fontSize="sm">
              {error.message}
            </Text>
          )}
          <Flex>
            <Button
              isLoading={error ? false : loading}
              onClick={handleLogin}
              colorScheme="purple">
              Sign up
            </Button>
          </Flex>
        </VStack>
        <Link _hover={{ color: "purple.500" }} href={"/signup"}>
          Have no Account yet?
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
