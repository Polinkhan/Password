import { Stack, FlexProps, Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Sidebar = ({ sideBarList }: any) => {
  return (
    <Stack
      borderRight="1px"
      borderRightColor={"gray.200"}
      w={60}
      h={"full"}
      pr={4}
      py={2}
    >
      {sideBarList.map((id: any) => (
        <NavItem key={id}>{id}</NavItem>
      ))}
    </Stack>
  );
};

const NavItem = ({ children, ...rest }: FlexProps) => {
  return (
    <Link to={"#"} style={{ textDecoration: "none" }}>
      <Box>
        <Flex
          align="center"
          p="4"
          borderRadius="lg"
          cursor="pointer"
          bgColor={"gray.200"}
          _hover={{ pl: 8, "& .bar": { w: 4 } }}
          transition={"0.2s"}
          position={"relative"}
          overflow={"hidden"}
          {...rest}
        >
          <Box
            className="bar"
            w={0}
            h={"full"}
            bgColor={"blue.200"}
            position={"absolute"}
            top={0}
            left={0}
            transition={"0.2s"}
          />
          {children}
        </Flex>
      </Box>
    </Link>
  );
};

export default Sidebar;
