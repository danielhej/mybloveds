import { Button, Flex, FormControl, Input, Modal, ModalCloseButton, ModalContent, ModalOverlay, ModalHeader, ModalBody, FormLabel, useDisclosure, Textarea, Radio, RadioGroup, ModalFooter } from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";


const CreateUserModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <>
        <Button onClick={onOpen}>
            <BiAddToQueue size={20} />
        </Button>

        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create User</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex alignItems={"center"} gap={4}>
                        {/* Left */}
                        <FormControl>
                            <FormLabel>Full Name</FormLabel>
                            <Input placeholder="John Doe" />
                        </FormControl>
                        {/* Right */}
                        <FormControl>
                            <FormLabel>Role</FormLabel>
                            <Input placeholder="Software Enginear" />
                        </FormControl>
                    </Flex>
                    <FormControl mt={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            resize={"none"}
                            overflow={"hidden"}
                            placeholder="He is My Best Friend..." />
                    </FormControl>
                    <RadioGroup>
                        <Flex gap={5} mt={4}>
                            <Radio value="male">male</Radio>
                            <Radio value="female">female</Radio>
                        </Flex>
                    </RadioGroup>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                        Add
                    </Button>
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
}

export default CreateUserModal