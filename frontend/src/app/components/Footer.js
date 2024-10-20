import { Box, Container, Stack, Text, Link, Button, Flex } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
 return (
  <Box>
   <Container as={Stack} maxW={'4xl'} py={5} justify={'center'} align={'center'}>
    <Stack direction={'row'} spacing={2}>
     <Link href={'/about'}>About Us</Link>
     <Link href={'/contact'}>Contact</Link>
     <Link href={'/policy'}>Privacy Policy</Link>
    </Stack>
   </Container>
   <Flex wrap={'wrap'} direction={{ base: 'col', md: 'row' }} justifyContent={'center'} gap={5}>
    <Link href="https://www.freepik.com"> https://www.freepik.com</Link>
    <Link href="https://unsplash.com"> https://unsplash.com</Link>
   </Flex>
   <Box>
    <Container
     mb={'20px'}
     as={Stack}
     maxW={'3xl'}
     py={2}
     direction={{ base: 'column', md: 'row' }}
     spacing={4}
     justify={{ base: 'center', md: 'space-between' }}
     align={{ base: 'center', md: 'center' }}
    >
     <Text>
      © {new Date().getFullYear()} All rights belong to the copyright holders. Website uses only
      Free sourses
     </Text>

     <Stack direction={'row'} spacing={2}>
      <Button label={'Facebook'} href={'#'}>
       <FaFacebook />
      </Button>
      <Button label={'Twitter'} href={'#'}>
       <FaTwitter />
      </Button>
      <Button label={'Instagram'} href={'#'}>
       <FaInstagram />
      </Button>
     </Stack>
    </Container>
   </Box>
  </Box>
 );
}
