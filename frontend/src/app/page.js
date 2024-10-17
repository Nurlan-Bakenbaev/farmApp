import React from "react";
import CardComponent from "./components/Card";
import { Flex, Text } from "@chakra-ui/react";

const HomePage = () => {
  const cardData = [
    {
      title: "Beautiful Sunset",
      description:
        "Experience the stunning beauty of a sunset over the mountains.",
      imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?text=Sunset",
    },
    {
      title: "Ocean Waves",
      description: "Relax by the beach and listen to the calming ocean waves.",
      imageUrl:
        "https://via.placeholder.com/300/33C1FF/FFFFFF?text=Ocean+Waves",
    },
    {
      title: "Forest Trail",
      description: "Take a peaceful walk in the woods and enjoy nature.",
      imageUrl:
        "https://via.placeholder.com/300/75FF33/FFFFFF?text=Forest+Trail",
    },
    {
      title: "City Skyline",
      description: "Marvel at the beautiful skyline of the city at night.",
      imageUrl:
        "https://via.placeholder.com/300/FF33C1/FFFFFF?text=City+Skyline",
    },
    {
      title: "Starry Night",
      description: "Enjoy the tranquility of a starry night under the sky.",
      imageUrl:
        "https://via.placeholder.com/300/3333FF/FFFFFF?text=Starry+Night",
    },
    {
      title: "Mountain Adventure",
      description: "Embark on an adventure in the majestic mountains.",
      imageUrl:
        "https://via.placeholder.com/300/FFFF33/FFFFFF?text=Mountain+Adventure",
    },
  ];
  return (
    <div>
      <Text fontSize="xl" mb={4}>
        New Advertisements
      </Text>
      <Flex justifyContent={"center"} wrap={"wrap"} gap={3}>
        {cardData.map((cardData) => (
          <CardComponent
            key={cardData.title}
            title={cardData.title}
            description={cardData.description}
            imageUrl={cardData.imageUrl}
          />
        ))}
      </Flex>
    </div>
  );
};
export default HomePage;
