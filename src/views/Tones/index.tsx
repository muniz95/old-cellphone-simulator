import React from "react";
import Ringtone from "../../utils/ringtone";

const Tones = () => {
  const ringtone = new Ringtone();
  React.useEffect(() => {
    ringtone.play('2#a1 2f1 4- 8#a1 8c2 8d2 8#d2 2f2 2- 4f2 4f2 8#f2 8#g2 2#a2 2- 4#a2 8#a2 8- 8#g2 8#f2 4#g2 8#f2 2f2 2- 2f2 4#d2 8#d2 8f2 2#f2 2- 4f2 4#d2 4#c2 8#c2 8#d2 2f2 2- 4#d2 4#c2 4c2 8c2 8d2 2e2 2- 2g2 1f2', 200);
    return () => ringtone.stop()
  }, [ringtone]);
  return (
    <div className="home">
      Tones View
      <div>

      </div>
    </div>
  )
}

export default Tones;
