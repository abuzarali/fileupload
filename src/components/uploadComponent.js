import React, { Component } from 'react';
import axios from 'axios';
import { FileDrop } from 'react-file-drop';

export default class uploadComponent extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      csvCollection: '',
      dragCollection: '',
    };
  }

  onFileChange(e) {
    this.setState({ csvCollection: e.target.files });
  }
  onFileDragChange(e) {
    this.setState({ csvCollection: e });
  }

  onSubmit(e) {
    e.preventDefault();

    var formData = new FormData();
    if (this.state.csvCollection !== '' || this.state.dragCollection !== '') {
      for (const key of Object.keys(this.state.csvCollection)) {
        formData.append('csvCollection', this.state.csvCollection[key]);
      }
      for (const key of Object.keys(this.state.dragCollection)) {
        formData.append('csvCollection', this.state.dragCollection[key]);
      }
      axios
        .post('http://localhost:4000/api/uploadFiles', formData, {})
        .then((res) => {
          alert(res.data.message);
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data);

          window.location.reload();
        });
    } else {
      alert('Empty! Please add some files');
    }
  }

  render() {
    const styles = {
      border: '1px solid black',
      width: 600,
      color: 'black',
      padding: 20,
      margin: '20px auto',
    };
    return (
      <div className='row'>
        <form onSubmit={this.onSubmit}>
          <h3 style={{ paddingTop: '20px' }}>File Upload</h3>
          <div className='form-group'>
            <div style={styles}>
              <FileDrop
                onDrop={(files, event) => {
                  this.setState({ dragCollection: files });
                }}>
                {this.state.dragCollection === ''
                  ? 'Drag some CSV Files'
                  : this.state.dragCollection.length + ' File Added!'}
              </FileDrop>
            </div>
            <div>
              <h4>OR</h4>
            </div>
            <input
              type='file'
              name='csvCollection'
              onChange={this.onFileChange}
              multiple
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-success' type='submit'>
              Upload
            </button>
          </div>
        </form>
      </div>
    );
  }
}
