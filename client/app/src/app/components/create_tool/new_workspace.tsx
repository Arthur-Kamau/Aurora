import React, { Component } from 'react'

export interface NewWorkSpacePageProps {
    
}
 
export interface NewWorkSpacePageState {
    
}
 
class NewWorkSpacePage extends React.Component<NewWorkSpacePageProps, NewWorkSpacePageState> {
    constructor(props: NewWorkSpacePageProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( <h1>New workspace</h1> );
    }
}
 
export default NewWorkSpacePage;