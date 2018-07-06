import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as faker from 'faker';

class App extends Component {
  dropdownEl = null;
  constructor(props) {
    super(props);
    this.state = { data: [], selected: {} };
  }
  createData(numItems) {
    const dropdownData = [];
    for (let i = 0; i < numItems; i++) {
      dropdownData.push({
        image: 'https://picsum.photos/720?' + i,
        description: faker.lorem.sentences(1,3)
      });
    }
    this.setState({ data: dropdownData });
  }
  componentDidMount() {
    this.dropdownEl = document.querySelector('ui-dropdown#uniqueDropdown');
    this.dropdownEl.addEventListener('onClickCallback', (event) => {console.log(event)});
    this.createData(3);
  }
  toggleDropdown(index) {
    this.setState({ selected: this.state.data[index] });
    this.dropdownEl.toggleDropdown();
  }
  render() {
    return (
      <div className="demo-wrapper" style={this.state.selected.image && (
        {background: 'url('+this.state.selected.image+') no-repeat center center fixed'}
      )}>
        <img src={logo} className="App-logo" alt="logo" />
          <ui-dropdown label="My React Dropdown" id="uniqueDropdown">
            <ul>
              {
                this.state.data
                  .map( (o, i) =>
                    <li key={i} onClick={ () => this.toggleDropdown(i) }>
                      <img alt="cat" src={ o.image }/>
                      <div>{ o.description }</div>
                    </li>
                  )
              }
            </ul>
          </ui-dropdown>
          {
            this.state.selected.image && (
              <div className="dropdown-description">{ this.state.selected.description }</div>
            )
          }
      </div>
    );
  }
}

export default App;
