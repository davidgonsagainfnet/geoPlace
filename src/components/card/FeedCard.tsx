import {Box, Image, Text, AspectRatio, Divider} from 'native-base';

export type FeedCardProps = {
  imageSrc: string;
  lat: string;
  long: string;
  colorText: string;
};

export function FeedCard({imageSrc, colorText}: FeedCardProps) {
  const loremIpsum = require('lorem-ipsum-react-native');
  const output = loremIpsum();

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
        <Divider />
        <Text color={colorText}>{output}</Text>
      </Box>
    </Box>
  );
}
