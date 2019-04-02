import React, { Component } from 'react'
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types';

class Uploader extends Component {

  static propTypes = {
    onDrop: PropTypes.func.isRequired
  };

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.onDrop(acceptedFiles, rejectedFiles)
  }

  render() {
    return (
      <Dropzone onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive }) => {
          return (
            <div
              {...getRootProps()}
              className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
            >
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop files here...</p> :
                  <p>Try dropping some files here, or click to select files to upload.</p>
              }
            </div>
          )
        }}
      </Dropzone>
    );
  }
}

export default Uploader