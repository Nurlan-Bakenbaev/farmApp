import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const PrivacyPolicy = () => {
 return (
  <Box p={5}>
   <VStack spacing={5}>
    <Heading textAlign={'center'} as="h1" size="xl">
     Privacy Policy
    </Heading>
    <Text>
     This Privacy Policy explains how Website collects, uses, discloses, and protects your
     information when you visit our Website. By using our Site, you agree to the collection and use
     of information in accordance with this policy.
    </Text>
    <Heading as="h2" size="lg">
     Information We Collect
    </Heading>
    <Text>
     We may collect personal information from you in various ways, including when you visit our
     Site, fill out a form, or interact with us. The types of information we may collect include:
    </Text>
    <Text>
     - Personal Identification Information: Name, email address, phone number, and any other
     information you provide.
    </Text>
    <Text>
     - Non-Personal Identification Information: Browser type, Internet Service Provider (ISP),
     referring/exit pages, and date/time stamps.
    </Text>

    <Heading as="h2" size="lg">
     How We Use Your Information
    </Heading>
    <Heading as="h2" size="lg">
     Cookies and Tracking Technologies
    </Heading>
    <Text>
     Our Site may use "cookies" and similar tracking technologies to enhance user experience. You
     can choose to set your web browser to refuse cookies or to alert you when cookies are being
     sent. If you do so, note that some parts of the Site may not function properly.
    </Text>

    <Heading as="h2" size="lg">
     Data Security
    </Heading>
    <Text>
     We implement a variety of security measures to maintain the safety of your personal
     information. However, no method of transmission over the Internet or method of electronic
     storage is 100% secure. While we strive to use commercially acceptable means to protect your
     personal information, we cannot guarantee its absolute security.
    </Text>

    <Heading as="h2" size="lg">
     Disclosure of Your Information
    </Heading>
    <Text>
     We do not sell, trade, or otherwise transfer your personally identifiable information to
     outside parties, except as required by law or with your consent.
    </Text>

    <Heading as="h2" size="lg">
     Changes to This Privacy Policy
    </Heading>
    <Text>
     We may update our Privacy Policy from time to time. We will notify you of any changes by
     posting the new Privacy Policy on this page and updating the "Effective Date" at the top. You
     are advised to review this Privacy Policy periodically for any changes.
    </Text>
   </VStack>
  </Box>
 );
};

export default PrivacyPolicy;
