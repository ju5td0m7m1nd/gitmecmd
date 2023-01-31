import { Box, Button, CircularProgress, Code, Flex, Input, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");


  const prompt =
   `Give me the git command to achieve following: ${question}`
 ;

  const fetchAnswer = async (e: any) => {
    e.preventDefault();
    setAnswer("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setAnswer((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  return (
    <Flex flexDir="column" maxW="5xl" mx="auto" alignItems="center" py={2} h="100vh">
      <Head>
        <title>Git me cmd</title>
        <meta
          property="og:image"
          content="https://gitmecmd.xyz/api/ogImage"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex 
        as="main" w="full" flex={1} flexDir="column" alignItems="center"
        textAlign="center"
        px={4}
        h="fit-content"
        mt={{base: 12, md: 24}}
       >
        <Text as="h1"
          fontSize={{base: '6xl', md: '4xl'}}
          maxW="2xl"
          fontWeight="bold"
          color="black"
         >
          Git Me Cmd
        </Text>
        <Flex gap={4} flexDir="column" alignItems="center" mt={12} w="full" maxW="xl">
          <Text textAlign="left" w="full" fontWeight="bold" color="blackAlpha.700">
            Give me the git command to:
          </Text>
            <Flex as="form" onSubmit={fetchAnswer} 
            w="full" gap={4} flexWrap={{base: 'wrap', md: 'unset'}}
            >
            <Input
            value={question}
            w={{base: 'full', md: '80%'}}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={"list all the authors who touched this file"}
          />
         
            <Button
            type="submit"
              colorScheme="blackAlpha"
              backgroundColor="black"
              isDisabled={loading}
            >
              {
                !loading ? `Get command`: <CircularProgress isIndeterminate color="white" size="4" />
              }
            </Button>
            </Flex>
        </Flex>
          <Box w="full">
          <AnimatePresence mode="wait">
            <motion.div>
              {answer && (
                <Code p={4} w="full" mt={12}>
                  {answer}
                </Code>
              )}
            </motion.div>
          </AnimatePresence>
          </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Home;
