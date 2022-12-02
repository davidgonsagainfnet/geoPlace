import React from 'react';
import {Box, Text, Pressable} from 'native-base';

const props = {
  title: String,
  color: String,
  textColor: String,
  press: String,
};

export default function ButtonPerson({title, color, textColor, press}: props) {
  return (
    <Box>
      <Pressable
        style={{
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
          borderRadius: 8,
          marginBottom: 5,
        }}
        onPress={press}>
        <Text color={textColor} fontSize="lg" bold>
          {title}
        </Text>
      </Pressable>
    </Box>
  );
}
