import React from 'react';
import {Box, Text, Pressable, Image} from 'native-base';

const props = {
  local: String,
  cidade: String,
  descricao: String,
  cor: String,
  eventDelete: String,
  eventEdit: String,
};

export default function Card({
  local,
  cidade,
  descricao,
  cor,
  eventDelete,
  eventEdit,
}: props) {
  return (
    <Box backgroundColor={cor} rounded="lg" p="2">
      <Text fontSize={25} bold>
        {local}
      </Text>
      <Text fontSize={20} marginBottom={2}>
        {cidade}
      </Text>
      <Text fontSize={17}>{descricao}</Text>
      <Box alignItems={'flex-end'}>
        <Box style={{flexDirection: 'row', marginEnd: 15}}>
          <Pressable onPress={eventEdit}>
            <Image source={require('../../assets/edit.png')} />
          </Pressable>
          <Pressable onPress={eventDelete}>
            <Image source={require('../../assets/lixeira.png')} />
          </Pressable>
        </Box>
      </Box>
    </Box>
  );
}
