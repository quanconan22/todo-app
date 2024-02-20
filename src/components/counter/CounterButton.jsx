import './Counter.css'
import {PropTypes} from 'prop-types'

export default function CounterButton({by, inCrementMethod, decrementMethod}){

   

    return (
        <div className="Counter">
            <div>
                <button className="counterButton" onClick={() => inCrementMethod(by)}>+{by}</button>
                <button className="counterButton" onClick={() => decrementMethod(by)}>-{by}</button>
            </div>        
        </div>
    );
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}