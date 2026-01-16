import Svg, { Path } from "react-native-svg";


export default function TransactionIcon(props){
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 35 27" {...props}>
      <Path
        stroke={props.color}
        d="M14.78 13.506h9.28v5.034L34 9.77 24.06 1v5.034h-9.28m5.44 7.46h-9.28V8.461L1 17.23 10.94 26v-5.034h9.28"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
};
