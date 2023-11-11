import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useAuthContext } from "../context/auth-context";
import Sidebar from "../components/sidebar/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../db/db.init";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuthContext();
  const [sideBarList, setSideBarList] = useState();
  const { regionName, city, zip, country, query, isp } = currentUser;

  console.log(currentUser);

  useEffect(() => {
    (async () => {
      const temp: any = [];
      const querySnapshot = await getDocs(collection(db, "Data"));
      querySnapshot.forEach((doc) => temp.push(doc.id));
      setSideBarList(temp);
    })();
  }, []);

  if (!sideBarList)
    return (
      <Center h={"100vh"} bgColor={"#f8fafc"}>
        <Spinner />
      </Center>
    );

  return (
    <Stack height={"100vh"} overflow={"auto"} bgColor={"#f8fafc"} p={4}>
      <Flex direction={"column"} gap={4}>
        <HStack justifyContent={"space-between"}>
          <Text fontSize={24} fontWeight={"bold"}>
            Password Manager
          </Text>
          <HStack alignItems={"start"} minW={500}>
            <Stack flex={5}>
              <Text>ISP</Text>
              <Text>Login ip</Text>
              <Text>Location</Text>
            </Stack>

            <Stack flex={2}>
              <Text>:</Text>
              <Text>:</Text>
              <Text>:</Text>
            </Stack>

            <Stack flex={20}>
              <Text>{isp}</Text>
              <Text>{query}</Text>
              <Text>
                {regionName}, {city}-({zip}), {country}
              </Text>
            </Stack>
          </HStack>
        </HStack>
        <Divider />
      </Flex>

      <Flex direction={"row"} flex={1}>
        <Sidebar sideBarList={sideBarList} />
        <Box flex={1} px={4} py={2}>
          {children}
        </Box>
      </Flex>
    </Stack>
  );
};

export default MainLayout;
