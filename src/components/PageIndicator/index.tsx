import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

const PageIndicator = () => {
  const {
    firstLevel, secondLevel, thirdLevel, fourthLevel, fifthLevel
  } = useSelector((state: RootState) => state);
  const [indicator, setIndicator] = React.useState("");
  const [firstLevelLabel, setFirstLevelLabel] = React.useState("");
  const [secondLevelLabel, setSecondLevelLabel] = React.useState("");
  const [thirdLevelLabel, setThirdLevelLabel] = React.useState("");
  const [fourthLevelLabel, setFourthLevelLabel] = React.useState("");
  const [fifthLevelLabel, setFifthLevelLabel] = React.useState("");
  
  const buildIndicator = React.useCallback(() => {
    setIndicator(
      firstLevelLabel + 
      secondLevelLabel + 
      thirdLevelLabel + 
      fourthLevelLabel + 
      fifthLevelLabel
    );
  }, [firstLevelLabel, secondLevelLabel, thirdLevelLabel, fourthLevelLabel, fifthLevelLabel]);

  React.useEffect(() => {
    setFirstLevelLabel(firstLevel === 0 ? "" : `${firstLevel}`);
  }, [firstLevel]);
  React.useEffect(() => {
    setSecondLevelLabel(secondLevel > 0 ? `-${secondLevel}` : "");
  }, [secondLevel]);
  React.useEffect(() => {
    setThirdLevelLabel(thirdLevel === 0 ? "" : `-${thirdLevel}`);
  }, [thirdLevel]);
  React.useEffect(() => {
    setFourthLevelLabel(fourthLevel === 0 ? "" : `-${fourthLevel}`);
  }, [fourthLevel]);
  React.useEffect(() => {
    setFifthLevelLabel(fifthLevel === 0 ? "" : `-${fifthLevel}`);
  }, [fifthLevel]);

  React.useEffect(() => {
    buildIndicator()
  }, [
    firstLevel, secondLevel, thirdLevel,
    fourthLevel, fifthLevel, buildIndicator
  ]);
  // React.useEffect(buildIndicator);

  return (
    <h6>{indicator}</h6>
  );
}

export default PageIndicator;
