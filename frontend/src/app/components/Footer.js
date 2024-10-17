import { Box, Container, Stack, Text, Link, Button } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"4xl"}
        py={5}
        justify={"center"}
        align={"center"}>
        <Text
          bgGradient="linear(to-r, #7921CA, #FF0080)"
          bgClip="text"
          fontSize={{ base: "28px", md: "36px" }}
          fontWeight="extrabold">
          <Link href={"/"}>Anzeigen</Link>
        </Text>
        <Stack direction={"row"} spacing={2}>
          <Link href={"#about"}>About Us</Link>
          <Link href={"#contact"}>Contact</Link>
          <Link href={"#privacy"}>Privacy Policy</Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={"solid"}>
        <Container
          mb={"20px"}
          as={Stack}
          maxW={"3xl"}
          py={2}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}>
          <Text>
            © {new Date().getFullYear()} MyWebsite. All rights reserved.
          </Text>
          <Stack direction={"row"} spacing={2}>
            <Button label={"Facebook"} href={"#"}>
              <FaFacebook />
            </Button>
            <Button label={"Twitter"} href={"#"}>
              <FaTwitter />
            </Button>
            <Button label={"Instagram"} href={"#"}>
              <FaInstagram />
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
