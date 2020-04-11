import React, { Component } from 'react'

export interface HomePageProps {
    
}
 

export interface HomePageState {
    
}
 

class HomePage extends React.Component<HomePageProps, HomePageState> {
    constructor(props: HomePageProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( <h1>Home page</h1>  );
    }
}
 

export default HomePage;