import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, List, ListItem, Text, useToast, IconButton, Editable, EditableInput, EditablePreview, Select } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [coffeeType, setCoffeeType] = useState("espresso");
  const toast = useToast();

  const handleAddCoffee = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Error",
        description: "Coffee entry can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newEntry = {
      id: Date.now(),
      text: inputValue,
      type: coffeeType,
      timestamp: new Date().toLocaleTimeString(),
    };
    setCoffeeList([...coffeeList, newEntry]);
    setInputValue("");
  };

  const handleDeleteCoffee = (id) => {
    setCoffeeList(coffeeList.filter((entry) => entry.id !== id));
  };

  const handleEditCoffee = (id, newText) => {
    const updatedList = coffeeList.map((entry) => {
      if (entry.id === id) {
        return { ...entry, text: newText };
      }
      return entry;
    });
    setCoffeeList(updatedList);
  };

  return (
    <Container maxW="container.md" py={5}>
      <Heading mb={4}>Daily Coffee Tracker</Heading>
      <Flex mb={4}>
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Add a coffee entry" mr={2} />
        <Select value={coffeeType} onChange={(e) => setCoffeeType(e.target.value)} placeholder="Select type" mr={2}>
          <option value="espresso">Espresso</option>
          <option value="cappuccino">Cappuccino</option>
        </Select>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddCoffee}>
          Add
        </Button>
      </Flex>
      <List spacing={3}>
        {coffeeList.map((entry) => (
          <ListItem key={entry.id} p={3} shadow="md" borderWidth="1px">
            <Flex justify="space-between" align="center">
              <Editable defaultValue={`${entry.text} (${entry.type})`} onSubmit={(newText) => handleEditCoffee(entry.id, newText)}>
                <EditablePreview />
                <EditableInput />
              </Editable>
              <Text fontSize="sm" color="gray.500">
                {entry.timestamp}
              </Text>
              <IconButton icon={<FaTrash />} aria-label="Delete coffee entry" colorScheme="red" onClick={() => handleDeleteCoffee(entry.id)} />
            </Flex>
          </ListItem>
        ))}
      </List>
      <Box mt={4}>
        <Text fontSize="xl">Total Coffees Today: {coffeeList.length}</Text>
      </Box>
    </Container>
  );
};

export default Index;
