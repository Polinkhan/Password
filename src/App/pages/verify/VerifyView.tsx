import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  Center,
  HStack,
  PinInput,
  PinInputField,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { getDoc } from "firebase/firestore";
import { authRef, dynamic_authRef } from "../../db/db.init";
import { useRef, useState } from "react";
import { fetcher } from "../../helper/api";
import { useAuthContext } from "../../context/auth-context";

const VerifyView = () => {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");

  const toast = useToast();
  const ref = useRef(null);

  const { setCurrentUser } = useAuthContext();

  const handleError = () => {
    setCode("");
    toast(invalidPinToast);
    setLoading(false);
    // @ts-ignore
    ref.current.focus();
  };

  const handleSuccess = async (ip_list: string[]) => {
    const { ip }: any = await fetcher("https://api.ipify.org", {
      format: "json",
    });

    if (ip_list.includes(ip)) {
      const ipRef = dynamic_authRef(ip);
      const p1 = getDoc(ipRef);
      const p2 = fetcher("http://ip-api.com/json/" + ip);
      const [snap, geo]: any = await Promise.all([p1, p2]);

      setCurrentUser({ ...snap.data(), ...geo });
    } else {
      setLoading(false);
      toast(notAllowedToast);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { pin, ip_list }: any = (await getDoc(authRef)).data();
    if (pin === code) handleSuccess(ip_list);
    else handleError();
  };

  return (
    <Center h={"full"}>
      <Card as={"form"} p={4} px={10} gap={4} onSubmit={handleSubmit}>
        <Text py={2}>Enter Pin Code</Text>
        <HStack>
          <PinInput
            otp
            autoFocus
            size={"lg"}
            value={code}
            onChange={(e) => setCode(e)}
          >
            <PinInputField ref={ref} />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <HStack justifyContent={"end"} gap={0}>
          <Button
            p={0}
            rounded={999}
            type="submit"
            color={"#66666b"}
            variant={""}
            rightIcon={loading ? <Spinner size={"sm"} /> : <ArrowForwardIcon />}
          >
            Next
          </Button>
        </HStack>
      </Card>
    </Center>
  );
};

const invalidPinToast: any = {
  title: "Invalid Pin",
  description: "Please enter correct pin.",
  status: "error",
  duration: 3000,
  isClosable: true,
};

const notAllowedToast: any = {
  title: "You are not allowed",
  description: "You are not allowed to access this site.",
  status: "error",
  duration: 3000,
  isClosable: true,
};

export default VerifyView;

// http://ip-api.com/json/24.48.0.1?fields=status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query
