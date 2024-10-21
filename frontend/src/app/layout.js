import './globals.css';
import ReduxProvider from './components/ReduxWrapper';
import { ChakraUIProviders } from './providers/ChakraProvider';
import Navbar from './components/Navbar.jsx';
import { Box, Text } from '@chakra-ui/react';
import Footer from './components/Footer.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export const metadata = {
 title: 'Farmers Marketplace',
 description:
  'This website connects farmers with buyers, offering a platform to showcase and sell their products and goods directly.',
 openGraph: {
  title: 'Farmers Marketplace - Connect and Trade',
  description: 'A platform for farmers to showcase and sell their products directly to buyers.',
  url: 'https://github.com/Nurlan-Bakenbaev',
  images: [
   {
    url: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ',
    width: 1200,
    height: 630,
    alt: 'Farmers showcasing their goods'
   }
  ]
 },
 icons: {
  icon: '/farmer.png'
 }
};

export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <ReduxProvider>
     <ChakraUIProviders>
      <Navbar />
      <Box
       px={'5%'}
       mx="auto"
       my={'20px'}
       minH={'80vh'}
       maxW={{ base: '100%', md: '90%', lg: '80%' }}
      >
       {children}
      </Box>
      <Footer />
     </ChakraUIProviders>
    </ReduxProvider>
   </body>
  </html>
 );
}
