import Svg, { Path, G } from "react-native-svg";

export default function Profile(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 24 29" {...props}>
        <G
            stroke={props.color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
        >
        <Path d="M1.769 19.329a10.6 10.6 0 0 0-.766 4.202c0 5.959 21.983 5.959 21.994 0a10.6 10.6 0 0 0-.765-4.202 10.8 10.8 0 0 0-2.368-3.583 11 11 0 0 0-3.598-2.401 11.18 11.18 0 0 0-8.532 0 11 11 0 0 0-3.598 2.401 10.8 10.8 0 0 0-2.367 3.583M11.992 9.663c2.438 0 4.415-1.94 4.415-4.332S14.43 1 11.992 1C9.553 1 7.577 2.94 7.577 5.331s1.976 4.332 4.415 4.332" />
        </G>
    </Svg>
  );
};
