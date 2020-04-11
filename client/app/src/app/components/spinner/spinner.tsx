import * as React from 'react';
import { Component } from 'react';

export interface SpinnerProps {
    
}
 
export interface SpinnerState {
    
}
 
class Spinner extends React.Component<SpinnerProps, SpinnerState> {
    constructor(props: SpinnerProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return (
            <div>
              <div className="spinner-wrapper">
                <div className="donut"></div>
              </div>
            </div>
          )
    }
}
 
export default Spinner;