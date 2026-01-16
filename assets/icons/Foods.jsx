import Svg, { Path } from "react-native-svg";

export default function Foods(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 18 30" {...props}>
      <Path
        stroke={props.color}
        d="M1.847 1.824.85 10.887a3.65 3.65 0 0 0 2.265 3.365l-.69 12.303a2.03 2.03 0 0 0 1.965 2.079 2.03 2.03 0 0 0 1.966-2.08l-.47-12.302a3.65 3.65 0 0 0 2.265-3.365l-.81-9.063m-2.85.306v9.358m11.59 2.594a1.31 1.31 0 0 0-1.133 1.37l.624 11.109a2.03 2.03 0 0 1-1.966 2.078 2.03 2.03 0 0 1-1.966-2.078l.436-11.63a1.63 1.63 0 0 0-.436-1.172V.849s6.486.272 4.424 13.233z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.699"
      />
    </Svg>
  );
};
