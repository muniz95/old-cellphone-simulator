import * as React from "react";
import '../styles/Home.scss';

class Calculator extends React.Component {
    public render() {
        return (
            <div className="home">
                <textarea name="calculator" id="" cols={30} rows={10} />
            </div>
        )
    }
}

export default Calculator;
