import { Platform, Text, View } from "react-native";
import {Button, Alert} from 'react-native';


export default function text() {
const text = "My Drunk Talks will get me arrested for sure some Day T-T";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{text}</Text>
	  <Button
	  	title = "Press me for now ig"
		onPress = {() => console.log("Button pressed")}	
		/>
    </View>
  );
}
