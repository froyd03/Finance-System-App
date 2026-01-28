import Svg, { Path, G } from "react-native-svg";


export default function Group(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 32 26" {...props}>
      <G stroke={props.color} strokeLinecap="round" strokeWidth="2">
        <Path d="M5.5 9.25S1.643 10.75 1 16m25.5-6.75s3.857 1.5 4.5 6.75M11.5 9.25s3.6.875 4.5 5.25c.9-4.375 4.5-5.25 4.5-5.25M13 20.5s-3.15.563-4.5 4.5M19 20.5s3.15.563 4.5 4.5" />
        <Path
          d="M16 22a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5M23.5 10a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9M8.5 10a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};