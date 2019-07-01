import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
const dotenv = require("dotenv");
dotenv.config()


const CLOUDINARY_UPLOAD_PRESET = 'ml_default';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;

export default class DropzoneJ extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          uploadedFileCloudinaryUrl: ''
        };
      }

      onImageDrop(files) {
        this.setState({
          uploadedFile: files[0]
        });
    
        this.handleImageUpload(files[0]);
      }

      handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset',CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);
    
        upload.end((err, response) => {
          if (err) {
            console.error(err);
          }
    
          if (response.body.secure_url !== '') {
            this.setState({
              uploadedFileCloudinaryUrl: response.body.secure_url
            });
          }
        });
      }

  
    render() {
        
        
            return (
                <>
                <Dropzone
                onDrop={this.onImageDrop.bind(this)}
                accept="image/*"
                multiple={false}>
                  {({getRootProps, getInputProps}) => {
                    return (
                      <div
                        {...getRootProps()}
                      >
                        <input {...getInputProps()} />
                        {
                        <p>Try dropping some files here, or click to select files to upload.</p>
                        }
                      </div>
                    )
                }}
              </Dropzone>
              <div>
      <div className="FileUpload">
        ...
      </div>

      <div>
        {this.state.uploadedFileCloudinaryUrl === '' ? null :
        <div>
          <p>{this.state.uploadedFile.name}</p>
          <img alt="" src={this.state.uploadedFileCloudinaryUrl} />
        </div>}
      </div>
    </div>
              </>
            )
}
}