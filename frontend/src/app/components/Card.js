import React from "react";
import { Box, Image, Text, Button, Stack } from "@chakra-ui/react";

const CardComponent = ({ title, description, imageUrl }) => {
  return (
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      transition="transform 0.5s"
      _hover={{ transform: "scale(1.01)" }}>
      <Image w={"100%"} src={imageUrl} alt={title} />
      <Box p="4">
        <Stack spacing={3}>
          <Text fontWeight="bold" fontSize="xl">
            {title}
          </Text>
          <Text fontSize="md">{description}</Text>
        </Stack>
        <Button mt={4} colorScheme="teal">
          View More
        </Button>
      </Box>
    </Box>
  );
};
export default CardComponent;
