import localFont from "next/font/local";
import "./globals.css";
import ReduxProvider from "./components/ReduxWrapper";
import { ChakraUIProviders } from "./providers/ChakraProvider";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Anzeigen",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxProvider>
          <ChakraUIProviders>
            <Navbar />
            <Box mx="auto" my={"20px"} minH={"80vh"}  maxW={"80%"}>
              {children}
            </Box>
            <Footer />
          </ChakraUIProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
