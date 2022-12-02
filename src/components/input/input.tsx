import React from 'react';
import {Box, Text, Input} from 'native-base';

export default function InputText(props) {
  return (
    <Box>
      <Text fontSize={20} marginTop={15} bold>
        {props.title}
      </Text>
      <Input
        variant="rounded"
        size="xl"
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.ChangeText}
      />
    </Box>
  );
}
