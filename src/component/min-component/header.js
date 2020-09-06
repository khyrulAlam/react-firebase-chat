import React, { Component } from "react";
import { Box, Flex, Avatar, Button, Text, Stack, Menu, MenuButton, MenuList, MenuItem, Image } from "@chakra-ui/core"



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <Flex borderBottom="1px solid gray" bg="white" roundedTop="md">
                    <Box w="100%" p={4}>
                        <Stack isInline>
                            <Image
                                size="35px"
                                src="/cat.png"
                                alt="logo"
                            />
                            <Text marginTop={2} fontWeight={600} color="orange.300">
                                Cat Chat
                            </Text>
                        </Stack>
                    </Box>
                    <Box w="100%" p={4} display="flex" flexDirection="row-reverse">
                        <Menu>
                            <MenuButton as={Button} rightIcon="chevron-down" paddingLeft=".5rem">
                                <Avatar
                                    size="sm"
                                    marginRight="5px"
                                    src={this.props.profile_picture}
                                />
                                {this.props.fullName}
                            </MenuButton>
                            <MenuList onClick={this.props.logout}>
                                <MenuItem>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>
            </React.Fragment>
        )
    }
}

export default Header;