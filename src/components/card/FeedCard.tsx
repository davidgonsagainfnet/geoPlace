import {Box, Image, Text, AspectRatio, Divider} from 'native-base';

export type FeedCardProps = {
  imageSrc: string;
  colorText: string;
  descricao: string;
  data: string;
  cidade: string;
};

export function FeedCard({
  imageSrc,
  colorText,
  descricao,
  data,
  cidade,
}: FeedCardProps) {
  const loremIpsum = require('lorem-ipsum-react-native');
  const output = loremIpsum();

  function dataAtualFormatada() {
    var data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? '0' + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? '0' + mes : mes,
      anoF = data.getFullYear(),
      hora = data.getHours().toString(),
      minutos = data.getMinutes().toString(),
      segundos = data.getSeconds().toString();
    return (
      diaF +
      '/' +
      mesF +
      '/' +
      anoF +
      ' ' +
      hora +
      ':' +
      minutos +
      ':' +
      segundos
    );
  }

  return (
    <Box
      overflow="hidden"
      borderWidth="1"
      borderColor="dark.300"
      borderRadius="md"
      marginX="4"
      marginBottom="4">
      <AspectRatio ratio={320 / 160} width="full">
        <Image src={imageSrc} alt="" resizeMode="cover" />
      </AspectRatio>
      <Box padding="4">
        <Text color={colorText}>{cidade}</Text>
        <Divider />
        <Text color={colorText}>{descricao}</Text>
        <Divider />
        <Text color={colorText} textAlign="right">
          {dataAtualFormatada(data)}
        </Text>
      </Box>
    </Box>
  );
}
