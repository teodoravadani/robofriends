import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';

class App extends React.Component {
        constructor () {
            super()
            this.state = {
                robots: [],
                searchfield: ''
            }
        }

        componentDidMount() {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => { return response.json(); })
            .then(users => { this.setState({ robots: users }) })
        }

        onSearchChange = (event) => {
            this.setState ({searchfield: event.target.value})
        }

        render () {
            const { robots, searchfield } = this.state;
            const filteredRobot = robots.filter (robot => {
                return robot.name.toLowerCase().includes(searchfield.toLowerCase());
            }) 

        if (!robots.length)
        {
            return <h1>Loading</h1>
        } else {
            return (
                <div className='tc'>
                <h1 className='f2'>ROBOFRIENDS</h1>
                <SearchBox searchChange = {this.onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots = { filteredRobot } />
                    </ErrorBoundry>
                </Scroll>
                </div>
            );
        }
    }
}

export default App;