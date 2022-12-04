import React, {useContext} from 'react';
import {Box, Text, Input} from 'native-base';
import {AppContext} from '../../app/AppContext';

export default function InputText(props) {
  const {appState, setAppState} = useContext(AppContext);
  const colorTheme = appState.isDarkTheme !== true ? '#000' : '#fff';
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
      />
    </Box>
  );
}
