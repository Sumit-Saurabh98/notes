import { Box, Container, Input, Text, Button, Center, Heading, InputGroup, InputRightElement, HStack, Stack, Divider, Icon } from "@chakra-ui/react";
import React,{useState} from "react";
import { BsFacebook, BsTwitch } from "react-icons/bs";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { SiAccenture } from "react-icons/si";
import { Link } from "react-router-dom";

function Login(props) {
     const [show, setShow] = useState(false);
  return (
     <Container
      style={{
        backgroundImage:
          "url(https://razerid-assets.razerzone.com/static/media/serpents-eye-v2-20220906.dae1e41f.jpg)",
        backgroundPosition: "center top -150px",
        height: "100vh", // move image 50px up from the center
      }}
    >
      <Center>
        <Box
          border={"2px"}
          borderColor={"green"}
          mt="20px"
          w="412px"
          h="560px"
          bg="#000000"
        >
          <Heading
            ml="20px"
            my="30px"
            as={"h1"}
            fontWeight={"thin"}
            color={"white"}
            size="lg"
          >
            RAZER ID LOGIN
          </Heading>
          <form>
            <Input
              mb="20px"
              width="375px"
              ml={"20px"}
              isRequired="true"
              focusBorderColor="rgb(69,214,43)"
              color={"white"}
              type="email"
              placeholder="EMAIL ADDRESS"
            ></Input>
            <InputGroup size="md">
              <Input
                width="375px"
                ml={"20px"}
                color={"white"}
                focusBorderColor="rgb(69,214,43)"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button
                  colorScheme="liquid"
                  h="1.75rem"
                  size="sm"
                >
                  {show ? (
                    <Icon boxSize={7} as={FiEye}></Icon>
                  ) : (
                    <Icon boxSize={7} as={FiEyeOff}></Icon>
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text
              _hover={{ color: "green" }}
              cursor={"pointer"}
              mt={2}
              mr={5}
              mb={8}
              textAlign={"right"}
              text
              fontWeight={"light"}
              color={"white"}
            >
              Forgot Password
            </Text>

            <Center>
              <Button
                colorScheme="green"
                color="black"
                px="160px"
              >
                LOG IN
              </Button>
            </Center>
            <Center>
              <Text color={"white"} fontSize={"13px"} mb="20px" mt={8}>
                Don't have an account yet?
              </Text>
            </Center>
            <Center>
              <Button
                _hover={{ color: "rgb(69,214,43)" }}
                color={"white"}
                rightIcon={<SiAccenture sixe="12px" />}
                colorScheme="blue"
                variant="unstyled"
              >
                <Link to={"/signup"}>Create Razer ID</Link>
              </Button>
            </Center>
            <HStack m="auto" w="380px" my={4}>
              <Divider orientation="horizontal" />
              <Text color={"#73767B"}>or</Text>
              <Divider orientation="horizontal" />
            </HStack>
            <Stack ml="20px" mt="10px" mb="50px" direction="row" spacing={4}>
              <Button
                px="45px"
                leftIcon={<BsFacebook boxSize="30" />}
                colorScheme="facebook"
                variant="solid"
                aria-label="Facebook"
              ></Button>
              <Button
                px="45px"
                leftIcon={<AiFillGoogleCircle boxSize="30" />}
                colorScheme="gray"
                variant="solid"
                aria-label="Google"
              ></Button>
              <Button
                px="45px"
                leftIcon={<BsTwitch boxSize="30" />}
                colorScheme="purple"
                variant="solid"
                title="Twitch"
              ></Button>
            </Stack>
          </form>
        </Box>
      </Center>
    </Container>
  );
}

export default Login;
