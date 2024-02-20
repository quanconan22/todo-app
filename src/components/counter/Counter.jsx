import { useState } from 'react';
import CounterButton from './CounterButton';

export default function Counter(){
    const [count, setCount] = useState(0);

    function incrementParent(by){
        setCount(count + by);
    }

    function decrementParent(by){
        setCount(count - by);
    }

    function resetFunc(){
        setCount(0);
    }

    return (
        <div>
          <span className="totalCount"> {count} </span>
          <CounterButton by={1} inCrementMethod={incrementParent} decrementMethod={decrementParent}/>
          <CounterButton by={2} inCrementMethod={incrementParent} decrementMethod={decrementParent}/>
          <CounterButton by={3} inCrementMethod={incrementParent} decrementMethod={decrementParent}/>
          <button className="resetButton" onClick={resetFunc}>Reset</button>
        </div>
      );
}
