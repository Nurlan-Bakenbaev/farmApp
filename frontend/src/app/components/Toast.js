// utils/toastUtils.js
import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const showToast = ({
    title,
    description,
    status,
    duration = 3000,
    isClosable = true,
  }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable,
    });
  };

  return { showToast };
};
