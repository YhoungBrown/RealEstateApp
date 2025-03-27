import { Image, Text, View } from "react-native";

import icons from "@/constants/icons";
import { Models } from "react-native-appwrite";
import { s } from "react-native-wind";

interface Props {
  item: Models.Document;
}

const Comment = ({ item }: Props) => {
  return (
    <View style={s`flex flex-col items-start`}>
      <View style={s`flex flex-row items-center`}>
        <Image source={{ uri: item.avatar }} style={s`h-14 w-14 rounded-full`} />
        <Text style={s`text-base text-black-300 text-start font-rubik-bold ml-3`}>
          {item.name}
        </Text>
      </View>

      <Text style={s`text-black-200 text-base font-rubik mt-2`}>
        {item.review}
      </Text>

      <View style={s`flex flex-row items-center w-full justify-between mt-4`}>
        <View style={s`flex flex-row items-center`}>
          <Image
            source={icons.heart}
            style={s`h-5 w-5`}
            tintColor={"#0061FF"}
          />
          <Text style={s`text-black-300 text-sm font-rubik-medium ml-2`}>
            120
          </Text>
        </View>
        <Text style={s`text-black-100 text-sm font-rubik`}>
          {new Date(item.$createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );
};

export default Comment;
