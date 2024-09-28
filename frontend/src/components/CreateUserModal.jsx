import {
    Button,
    Flex,
    FormControl,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    FormLabel,
    useDisclosure,
    Textarea,
    Radio,
    RadioGroup,
    ModalFooter,
    useToast
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModal = ({ setUsers }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",
        gender: "",
    });
    const toast = useToast();
    useEffect(() => {
        console.log("Current users:", setUsers);
    }, [setUsers]);
    const handleCreateUser = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch(BASE_URL + "friends", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputs),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }
            toast({
                status: 'success',
                title: 'Yayy! 🎉',
                description: "Friend Created Successfully",
                duration: 2000,
                position: "top-center",
            });
            onClose();
            setUsers(prevUsers => [...prevUsers, data]);
            setInputs({
                name: "",
                role: "",
                description: "",
                gender: "",
            });
        } catch (error) {
            toast({
                status: 'error',
                title: 'Got An Error Bro',
                description: error.message,
                duration: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader>Create User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                                    />

                                </FormControl>
                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input
                                        placeholder="Software Engineer"
                                        value={inputs.role}
                                        onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
                                    />
                                </FormControl>
                            </Flex>
                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    resize={"none"}
                                    overflow={"hidden"}
                                    placeholder="He is My Best Friend..."
                                    value={inputs.description}
                                    onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                                />
                            </FormControl>
                            <RadioGroup>
                                <Flex gap={5} mt={4}>
                                    <Radio value="male" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                                        Male
                                    </Radio>
                                    <Radio value="female" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                                        Female
                                    </Radio>
                                </Flex>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoading}>
                                Add
                            </Button>
                            <Button onClick={onClose} mr={3}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default CreateUserModal;
