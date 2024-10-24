import React from 'react';
import {
 Modal,
 ModalOverlay,
 ModalContent,
 ModalHeader,
 ModalFooter,
 ModalBody,
 ModalCloseButton,
 Button,
 Text,
 Box
} from '@chakra-ui/react';
import { MdOutlineWarningAmber } from 'react-icons/md';

const ModalWindow = ({ isOpen, onClose, handleDelete, id, itemName }) => {
 return (
  <Modal size={{ base: 'xs', md: 'lg' }} isOpen={isOpen} onClose={onClose}>
   <ModalOverlay />
   <ModalContent textAlign={'center'}>
    <ModalHeader color={'red'} fontWeight={'bold'}>
     Confirm Deletion
    </ModalHeader>
    <Box display="flex" justifyContent="center">
     <MdOutlineWarningAmber size={60} color="red" />
    </Box>
    <ModalCloseButton />
    <ModalBody>
     <Text>Are you sure you want to delete &quot;{itemName}&quot;?</Text> {/* Escaped quotes */}
    </ModalBody>

    <ModalFooter>
     <Button colorScheme="red" onClick={() => handleDelete(id)}>
      Delete
     </Button>
     <Button variant="ghost" onClick={onClose}>
      Cancel
     </Button>
    </ModalFooter>
   </ModalContent>
  </Modal>
 );
};

export default ModalWindow;
