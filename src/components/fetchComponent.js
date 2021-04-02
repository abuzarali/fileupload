import React, { Component } from 'react';
import axios from 'axios';
import { FileDrop } from 'react-file-drop';

export default class fetchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    axios.get('http://localhost:4000/api/getFiles').then((result) => {
      this.setState({
        items: result.data,
        isLoaded: true,
      });
    });
  }

  render() {
    const { items } = this.state;
    if (!this.state.isLoaded) {
      return <div>Loading ... </div>;
    } else {
      return (
        <div>
          <h3 className='h3S'>List of files in server, ready to be parsed</h3>
          <div className='row'>
            <ul className='list-unstyled listt'>
              {items.data.length > 0
                ? items.data.map((item) => (
                    <li>
                      <p className='items'>{item}</p>
                      <button className='btn btn-success'>Parse!</button>
                    </li>
                  ))
                : 'No files yet, please add some !'}
            </ul>
          </div>
        </div>
      );
    }
  }
}
