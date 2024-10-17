"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  useToast,
  HStack,
  Text,
  Stack,
  List,
  ListItem,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { categories } from "../utils/categories";

const CreateProductForm = () => {
  const { user, loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    minOrder: "",
    user: user?.user.userId,
  });
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    {
      /*  generate previews*/
    }
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append form data
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append multiple files
    files.forEach((file, index) => {
      data.append(`file${index + 1}`, file); // Append each file with a unique name
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data, // Send FormData with all the fields and files
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      toast({
        title: "Product created.",
        description: "Your product has been successfully created.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect or clear the form
      router.push("/products");
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Text fontSize="2xl" mb={4}>
        Create your Product
      </Text>
      <Box mx="auto" m={5} p={5} borderWidth={1} borderRadius="lg">
        <form>
          <VStack spacing={4}>
            <Stack
              w="full"
              direction={{ base: "column", md: "row" }}
              spacing={4}
              alignItems="center">
              {/* Product Name */}
              <FormControl isRequired>
                <FormLabel fontSize={11}>Name of Product</FormLabel>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </FormControl>
              {/* Price */}
              <FormControl isRequired>
                <FormLabel fontSize={11}>Price</FormLabel>

                <NumberInput min={1}>
                  <NumberInputField
                    name="price"
                    placeholder="Product price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </NumberInput>
              </FormControl>
            </Stack>
            {/* Description */}
            <FormControl isRequired>
              <FormLabel fontSize={11}>Description</FormLabel>
              <Textarea
                name="description"
                placeholder="Product description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <Stack
              w="full"
              direction={{ base: "column", md: "row" }}
              spacing={4}
              alignItems="center">
              {/* Category */}
              <FormControl>
                <FormLabel fontSize={11}>Category</FormLabel>
                <Select
                  placeholder="Select category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Quantity */}
              <FormControl>
                <FormLabel fontSize={11}>Quantity</FormLabel>
                <NumberInput min={1}>
                  <NumberInputField
                    name="quantity"
                    placeholder="Quantity in stock"
                    value={formData.quantity}
                    onChange={handleChange}
                  />
                </NumberInput>
              </FormControl>
            </Stack>
            <Stack
              w="full"
              direction={{ base: "column", md: "row" }}
              spacing={4}
              alignItems="center">
              {/* Minimum Order */}
              <FormControl>
                <FormLabel fontSize={11}>Minimum Order</FormLabel>
                <Input
                  type="text"
                  name="minOrder"
                  placeholder="Minimum order quantity"
                  value={formData.minOrder}
                  onChange={handleChange}
                />
              </FormControl>
              {/* Product Photo */}
              <FormControl>
                <FormLabel fontSize={11}>Photo Image</FormLabel>
                <Input
                  type="file"
                  name="photos"
                  multiple
                  onChange={handleFilesChange}
                />
              </FormControl>
            </Stack>

            <Button type="submit" colorScheme="purple" width="full">
              Submit
            </Button>
          </VStack>
        </form>
        <Flex mt={2} gap={1}>
          {files.length > 0 &&
            files.map((file, index) => (
              <Box key={index}>
                {file.type.startsWith("image/") && (
                  <Image
                    src={filePreviews[index]}
                    alt={`Preview of ${file.name}`}
                    boxSize="100px"
                    objectFit="cover"
                    mt={2}
                    border="1px solid #ccc"
                    borderRadius="md"
                  />
                )}
              </Box>
            ))}
        </Flex>
      </Box>
    </>
  );
};

export default CreateProductForm;
