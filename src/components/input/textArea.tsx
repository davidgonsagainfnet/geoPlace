import React from 'react';
import {Box, Text, Input} from 'native-base';

const props = {
  title: String,
  placeholder: String,
  ChangeText: String,
  value: String,
  colortext: String,
};

export default function TextArea({
  title,
  placeholder,
  ChangeText,
  value,
  colortext,
}: props) {
  return (
    <Box>
      <Text marginTop={15} fontSize={'xl'} color={colortext} bold>
        {title}
      </Text>
      <Input
        variant="outline"
        marginTop={5}
        margin={3}
        padding={10}
        placeholder={placeholder}
        multiline
        numberOfLines={4}
        onChangeText={ChangeText}
        value={value}
        style={{color: colortext}}
      />
    </Box>
  );
}
