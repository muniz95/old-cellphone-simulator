import S from "./styled";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";

const Startup = () => {
  const { color } = useSelector((state: RootState) => state);
  
  return (
    <S.StartupContainer color={color} >
      Startup
    </S.StartupContainer>
  )
};

export default Startup;
