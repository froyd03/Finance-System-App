import Svg, { Path } from "react-native-svg";


export default function Rent(props) {
  return (
    <Svg width={props.size} height={props.size} fill="none" viewBox="0 0 29 25" {...props}>
      <Path
        stroke={props.color}
        d="M11.81 17.866h5.665A1.97 1.97 0 0 0 19.44 15.9a1.97 1.97 0 0 0-1.965-1.96h-3.591a8.1 8.1 0 0 1-2.374-.385c-1.422-.306-3.721-.323-4.775 2.345H4.47m14.943 0 5.098-3.002a1.966 1.966 0 0 1 2.696.657 1.97 1.97 0 0 1-.651 2.696l-6.667 5.019a6.85 6.85 0 0 1-4.124 1.376H4.435M17.52 7.013l-1.388 1.393a.09.09 0 0 1-.13 0l-.855-1.4h-3.739a4.532 4.532 0 1 1 0-3.256h8.333l2.13 1.807-2.833 2.928-1.518-1.444M4.447 14.898a.306.306 0 0 0-.306-.306H1.156a.306.306 0 0 0-.306.306v8.74a.306.306 0 0 0 .306.306H4.14a.306.306 0 0 0 .306-.306z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.699"
      />
    </Svg>
  );
};
