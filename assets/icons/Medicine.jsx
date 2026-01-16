import Svg, { Path } from "react-native-svg";

export default function Medicine(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 39 50" {...props}>
      <Path
        stroke={props.color}
        d="m7.723 21.222 17.226 6.73m2.568-4.038a11.696 11.696 0 0 1 9.603 10.667 11.72 11.72 0 0 1-8.2 11.978 11.6 11.6 0 0 1-9.74-1.324m16.277-15.224L20.04 40.496m5.036-38.16c4.755 1.86 7.101 7.226 5.24 11.985L19.557 41.813c-1.862 4.758-7.227 7.107-11.982 5.246C2.82 45.2.474 39.832 2.336 35.074L13.093 7.582C14.955 2.823 20.32.474 25.076 2.335"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3.393"
      />
    </Svg>
  );
};
