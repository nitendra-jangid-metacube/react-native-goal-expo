import { Image, Text, TouchableOpacity } from "react-native";

const CustomButtonIcon = ({
  image,
  handlePress
}) => {
  return (
    <TouchableOpacity
      style={{width:10, height:10, marginEnd: 15, alignItems:'flex-end', alignSelf: 'flex-end'}}
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-sm flex flex-row justify-center`}
    >
      <Image
          source={image}
      />
    </TouchableOpacity>
  );
};

export default CustomButtonIcon;
