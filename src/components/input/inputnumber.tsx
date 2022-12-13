import React from 'react';
import {Box, Text, Input} from 'native-base';
import {useAppSelector} from '../../app/appStore';

export default function InputNumber(props) {
  const isDarkTheme = useAppSelector(state => state.app.isDarkTheme);
  const colorTheme = isDarkTheme !== true ? '#000' : '#fff';
  return (
    <Box>
      <Text fontSize={20} marginTop={15} color={props.colortext} bold>
        {props.title}
      </Text>
      <Input
        variant="rounded"
        size="xl"
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.ChangeText}
        style={{color: colorTheme}}
        keyboardType="numeric"
      />
    </Box>
  );
}
