import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  ButtonGroup,
  InputRightElement,
  Input,
  FormLabel,
  InputGroup,
  Box,
  FormControl,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

function CreateNotes(props) {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = (e) =>{
    e.preventDefault()
  }
  return (
    <Box bg="#262626">
      <Text
        color="#888888"
        fontSize="xl"
        _hover={{ color: "gold", cursor: "pointer" }}
        onClick={onOpen}
      >
        Create Notes
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <form onSubmit={handleSubmit} style={{ color: "white" }}>
          <FormControl>
            <FormLabel mb={"5px"}> Email </FormLabel>
            <Input
              id="email"
              mb={"10px"}
              type="email"
              placeholder="Email"
              focusBorderColor="yellow.600"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />

            <FormLabel mb={"5px"}> Password </FormLabel>
              <Textarea
                id="description"
                placeholder="Enter description"
                focusBorderColor="yellow.600"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

            <br />
            <br />
            <Box
              className="item_display_corner"
              mb={"10px"}
              fontSize={{ base: "sm", sm: "md" }}
            >
            </Box>
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button type="submit" className="btn" colorScheme="yellow">
                {loading ? "Creating..." : "Create"}
              </Button>
            </ButtonGroup>

            <br />
            <br />
            <ButtonGroup variant="outline" width="100%">
              <Button
                // onClick={() => navigate("/signup")}
                className="btn"
                colorScheme="yellow"
              >
                Don't have an Account
              </Button>
            </ButtonGroup>
          </FormControl>
        </form>
          </ModalBody>

          <ModalFooter>
            <Button
              className="btn"
              colorScheme="yellow"
              mr={3}
              onClick={onClose}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateNotes;
