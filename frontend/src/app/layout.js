import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./components/ReduxWrapper";
import { ChakraUIProviders } from "./providers/ChakraProvider";
import Navbar from "./components/Navbar.jsx";
import { Box, Text } from "@chakra-ui/react";
import Footer from "./components/Footer";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  style: ["normal", "italic"],
});
export const metadata = {
  title: "Anzeigen",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ChakraUIProviders>
            <Navbar />
            <Box
              className={roboto.className}
              px={"5%"}
              mx="auto"
              my={"20px"}
              minH={"80vh"}
              maxW={{ base: "100%", md: "90%", lg: "80%" }}>
              {children}
            </Box>
            <Footer />
          </ChakraUIProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
