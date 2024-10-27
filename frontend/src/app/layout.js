import './globals.css';
import ReduxProvider from './components/ReduxWrapper';
import { ChakraUIProviders } from './providers/ChakraProvider';
import Navbar from './components/Navbar.jsx';
import { Box, Text } from '@chakra-ui/react';
import Footer from './components/Footer.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
export const metadata = {
 title: 'Eco-Farm Marketplace',
 description: 'This website connects farmers with buyers, offering a platform to showcase and sell their products and goods directly.',
 openGraph: {
  title: 'Eco-Farm Marketplace | Buy Direct from Local Growers',
  description:
   'Connect directly with local farmers to buy fresh products and support sustainable agriculture. Farmers Marketplace brings buyers and sellers together.',
  url: 'https://farm-app-lime.vercel.app/',
  images: [
   {
    url: '/public/banner.jpeg',
    width: 1200,
    height: 630,
    alt: 'Farmers showcasing their goods'
   }
  ]
 },
 icons: {
  icon: '/logo.jpg'
 }
};
export default function RootLayout({ children }) {
 return (
  <html lang="en">
   <body>
    <ReduxProvider>
     <ChakraUIProviders>
      <Navbar />
      <Box px={'5%'} mx="auto" my={'20px'} minH={'80vh'} maxW={{ base: '100%', md: '90%', lg: '80%' }}>
       {children}
      </Box>
      <Footer />
     </ChakraUIProviders>
    </ReduxProvider>
   </body>
  </html>
 );
}
