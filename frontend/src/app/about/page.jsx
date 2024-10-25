import { Box, Heading, Text, VStack, Image, Divider } from '@chakra-ui/react';
const About = () => {
 return (
  <Box p={8} maxW="1000px" mx="auto">
   <VStack spacing={6}>
    <Heading
     display="inline-block"
     as="h1"
     size="2xl"
     bgGradient="linear(to-l, green.400, green.600)"
     backgroundClip="text"
    >
     Green Future
    </Heading>
    <Text fontSize="xl" textAlign="center">
     Welcome to Anzeigen, your trusted platform where farmers can advertise their goods directly to
     consumers. We connect you with local farmers, offering fresh, affordable products without
     middlemen, ensuring that you get the best quality at the best price.
    </Text>

    <Divider />

    <Box
     display="flex"
     flexDirection={['column', 'row']}
     alignItems="center"
     justifyContent="space-around"
     py={6}
    >
     <Box w={['100%', '45%']} mb={['4', '0']}>
      <Image src="/about/field.jpg" alt="Farm Produce" borderRadius="lg" boxShadow="md" />
     </Box>
     <Box w={['100%', '45%']}>
      <Heading as="h2" size="lg" mb={4}>
       Why Buy Direct from Farmers?
      </Heading>
      <Text fontSize="md">
       By purchasing directly from farmers, you can be sure of where your food comes from. You’re
       cutting out the middlemen, which not only makes it cheaper but also ensures you are
       supporting local farmers and getting the freshest products available. No more long supply
       chains, just pure, unprocessed goods straight from the farm.
      </Text>
     </Box>
    </Box>

    <Box
     display="flex"
     flexDirection={['column', 'row']}
     alignItems="center"
     justifyContent="space-around"
     py={6}
    >
     <Box w={['100%', '45%']} mb={['4', '0']}>
      <Heading as="h2" size="lg" mb={4}>
       Transparency & Trust
      </Heading>
      <Text fontSize="md">
       Our platform allows farmers to advertise their goods with up to three photos and a detailed
       description, including quantity and any special qualities. As a customer, you have the
       confidence that what you see is what you get, with no surprises or hidden fees.
      </Text>
     </Box>
     <Box w={['100%', '45%']}>
      <Image
       src="/about/harvest.jpg"
       alt="Direct Farm Connection"
       borderRadius="lg"
       boxShadow="md"
      />
     </Box>
    </Box>

    <Box
     display="flex"
     flexDirection={['column', 'row']}
     alignItems="center"
     justifyContent="space-around"
     py={6}
    >
     <Box w={['100%', '45%']} mb={['4', '0']}>
      <Image src="/about/hands.jpg" alt="Fresh Products" borderRadius="lg" boxShadow="md" />
     </Box>
     <Box w={['100%', '45%']}>
      <Heading as="h2" size="lg" mb={4}>
       Supporting Sustainability & Local Communities
      </Heading>
      <Text fontSize="md">
       Buying directly from local farmers not only guarantees fresh and organic products, but also
       contributes to a more sustainable environment. By reducing the distance your food travels,
       you help lower carbon emissions and cut down on excessive packaging waste. Supporting local
       farmers strengthens communities and promotes ethical farming practices, making a positive
       impact on both your health and the planet.
      </Text>
     </Box>
    </Box>
   </VStack>
  </Box>
 );
};

export default About;
