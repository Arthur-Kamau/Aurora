import * as React from 'react';
import { Component } from 'react';

export interface StopDumpServerComponentProps {
    
}
 
export interface StopDumpServerComponentState {
    
}
 
class StopDumpServerComponent extends React.Component<StopDumpServerComponentProps, StopDumpServerComponentState> {
    constructor(props: StopDumpServerComponentProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( <h1>Stop server</h1> );
    }
}
 
export default StopDumpServerComponent;