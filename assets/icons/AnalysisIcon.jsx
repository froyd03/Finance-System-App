import Svg, { Path } from "react-native-svg";

export default function AnalysisIcon(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 33 32" {...props}>
      <Path
        stroke={props.color}
        d="M25.765 24.967 32 31M7.451 9.296v11.48m3.956 0v-5.315m8.134 5.315v-2.655m-4.177 2.656V9.296m8.199 11.48v-7.092m6.445 1.351c0 7.752-6.493 14.037-14.504 14.037S1 22.788 1 15.036 7.494 1 15.504 1s14.504 6.284 14.504 14.036"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
};
