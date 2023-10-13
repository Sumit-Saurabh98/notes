import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import logo from "../logo/logo.png";

const Navbar = () => {
  return (
    <Box
      h="8vh"
      w="100vw"
      backgroundColor={"#000000"}
      display="flex"
      alignItems="center"
      gap="2%"
      justifyContent="space-between"
      padding="0 30px"
    >
      <Box w="70px">
        <Image  src={logo} />
      </Box>
      <Box display="flex" columnGap="20px">
        <Text
          color="#888888"
          fontSize="xl"
          _hover={{ color: "#fff", cursor: "pointer" }}
        >
          Create Notes
        </Text>
        <Text
          fontSize="xl"
          color="#888888"
          _hover={{ color: "#fff", cursor: "pointer" }}
        >
          Login
        </Text>
      </Box>
    </Box>
  );
};

export default Navbar;
