import Svg, { Path } from "react-native-svg";


export default function Gifts(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 51 53" {...props}>
      <Path
        stroke={props.color}
        d="M44.414 28.965v18.902a3.28 3.28 0 0 1-3.281 3.281H9.264a3.28 3.28 0 0 1-3.281-3.281V28.965m19.215-11.99s11.954-.687 14.922-3.003a6.815 6.815 0 0 0 1.194-9.53 6.83 6.83 0 0 0-9.554-1.206c-2.943 2.316-6.562 13.74-6.562 13.74m0 0s-11.954-.687-14.921-3.003a6.803 6.803 0 0 1 3.345-12.109 6.82 6.82 0 0 1 5.026 1.373c2.932 2.316 6.55 13.74 6.55 13.74m0 0v34.173M4.85 16.975h40.71a3.04 3.04 0 0 1 3.04 3.04v4.511a3.04 3.04 0 0 1-3.04 3.04H4.85a3.04 3.04 0 0 1-3.04-3.04v-4.511a3.04 3.04 0 0 1 3.04-3.04"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.619"
      />
    </Svg>
  );
};
