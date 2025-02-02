import { Box, Button, Container, Flex, Img, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModal from "./CreateUserModal";
import { useState } from "react";

const Navbar = ({ setUsers }) => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
                <Flex h={16} align={"center"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={3} display={{ base: "none", sm: "flex" }}>
                        <Img src="/react.png" alt="react logo" width={50} height={50} />
                        <Text fontSize={"40px"}>+</Text>
                        <Img src="/python.png" alt="react logo" width={50} height={50} />
                        <Text fontSize={"40px"}>=</Text>
                        <Img src="/explode.png" alt="react logo" width={45} height={45} />
                    </Flex>
                    <Flex gap={3} alignItems={"center"}>
                        <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", sm: "flex" }}>Home</Text>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
                        </Button>
                        <CreateUserModal setUsers={setUsers} />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};

export default Navbar;
