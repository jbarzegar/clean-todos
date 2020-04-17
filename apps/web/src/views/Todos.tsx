import React from "react";
import { useQuery, useMutation, queryCache } from "react-query";
import { Flex, Checkbox, Text, Icon, Heading, Skeleton } from "@chakra-ui/core";

import { TodoEntity } from "domain-todo/entities";

import { todos } from "api";

import { Container } from "components";

type TodoItemProps = TodoEntity;
let TodoItem = ({ id, title, completed }: TodoItemProps) => {
  let [mutateItem] = useMutation(
    ({ id, ...data }: TodoEntity) => todos.update(id, data),
    {
      onSuccess: (data) => {
        queryCache.setQueryData("allTodos", (prev: TodoEntity[]) => {
          let todos = [...prev];
          let index = todos.findIndex((x) => x.id === data.id);
          todos[index] = data;

          return todos;
        });
      },
    }
  );

  return (
    <Flex
      my="20px"
      px={6}
      py={2}
      justify="space-between"
      align="center"
      bg="gray.700"
    >
      <Checkbox
        variantColor="black"
        defaultIsChecked={completed}
        onChange={(e) =>
          mutateItem({ id, title, completed: e.currentTarget.checked })
        }
      />
      <Text
        textDecor={completed ? "line-through" : "none"}
        fontSize="lg"
        fontWeight="bold"
        color="white"
      >
        {title}
      </Text>
      <Icon name="delete" size="24px" color="red.500" />
    </Flex>
  );
};

let Todos = () => {
  let { data = [], status } = useQuery("allTodos", todos.getAll);

  return (
    <Container>
      <Heading as="h2">Todos</Heading>

      {status === "loading" &&
        new Array(10)
          .fill(undefined)
          .map((_, i) => <Skeleton key={i} height="60px" my="20px" />)}

      {status === "error" && <Text color="red">What</Text>}

      {status === "success" && (
        <Flex direction="column" justify="center" borderRadius="3px">
          {data.map((t) => (
            <TodoItem key={t.id} {...t} />
          ))}
        </Flex>
      )}
    </Container>
  );
};

export default Todos;
