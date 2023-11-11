import {
  Card,
  Center,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Stack,
  StackProps,
  Text,
  TextProps,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../db/db.init";

const HomeView = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    (async () => {
      const snapshot = await getDoc(doc(db, "Data", "All"));
      setData(snapshot.data());
    })();
  }, []);

  if (!data)
    return (
      <Center height={"full"}>
        <Spinner />
      </Center>
    );

  const Lists = Object.keys(data);

  return (
    <Stack h={"full"} gap={8}>
      {Lists.map((list, i) => (
        <Stack key={i} gap={2}>
          <Text fontWeight={"bold"}>{list}</Text>
          <Divider />
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {data[list].map((val: any, i: number) => (
              <Item key={i} data={val} />
            ))}
          </Grid>
        </Stack>
      ))}
    </Stack>
  );
};

const Item = ({ data }: any) => {
  const toast = useToast();

  const defaultStackValue: StackProps = {
    whiteSpace: "nowrap",
    overflow: "hidden",
  };

  const defaultTextValue: TextProps = {
    cursor: "pointer",
    _hover: { fontWeight: 500 },
  };

  const handleClick = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      duration: 1500,
      position: "bottom-left",
    });
  };

  return (
    <GridItem minWidth={0}>
      <Card
        direction={"row"}
        h={"full"}
        p={5}
        rounded={16}
        justifyContent={"center"}
      >
        <Stack flex={5}>
          <Text>Name</Text>
          <Text>User</Text>
          <Text>Pass</Text>
        </Stack>

        <Stack flex={2}>
          <Text>:</Text>
          <Text>:</Text>
          <Text>:</Text>
        </Stack>

        <Stack flex={20} {...defaultStackValue}>
          <Text>{data.name}</Text>
          <Text {...defaultTextValue} onClick={() => handleClick(data.user)}>
            {data.user}
          </Text>
          <Text {...defaultTextValue} onClick={() => handleClick(data.pass)}>
            {data.pass}
          </Text>
        </Stack>
      </Card>
    </GridItem>
  );
};

export default HomeView;
