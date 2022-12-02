import React from 'react';
import {Box, Text, Pressable, useContrastText} from 'native-base';

const props = {
  title: String,
  color: String,
  press: String,
};

export default function ButtonPerson({title, color, press}: props) {
  const textColor = useContrastText(color);
  return (
    <Box _text={{color: textColor}}>
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
