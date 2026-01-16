import Svg, { Path } from "react-native-svg";


export default function Home (props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 27 33" {...props}>
      <Path
        stroke={props.color}
        d="M24.768 32H2.232c-.327 0-.64-.131-.871-.365A1.25 1.25 0 0 1 1 30.753V12.731a1.24 1.24 0 0 1 .398-.914L12.664 1.331a1.22 1.22 0 0 1 1.667 0l11.27 10.486a1.25 1.25 0 0 1 .399.914v18.022c0 .33-.13.648-.36.882a1.23 1.23 0 0 1-.872.365m-14.165-8.82h5.8a.9.9 0 0 1 .644.274.93.93 0 0 1 .264.656V32H9.689v-7.89a.93.93 0 0 1 .266-.657.91.91 0 0 1 .648-.273"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </Svg>
  );
};
