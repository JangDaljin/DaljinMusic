import React , { Component } from 'react'
import { List } from 'immutable'


import classNames from 'classnames/bind'
import styles from './adminView.css'
const cn = classNames.bind(styles)


export default class adminView extends Component {
   
   constructor(props) {
        super(props)

        this.state = {
            fileList : [],
            checked : List([])
        }
        
   }

   fileUpload = (e) => {
        const newFileList = []
        Array.prototype.push.apply(newFileList , e.target.files)
        
        this.setState({
            'fileList' : newFileList,
            'checked' : this.state.checked.push(false)
        })
   }


   
   render() {
        return (
            <div className={cn('adminview')}>
                <div className={cn('upload-wrap')}>
                    <input className={cn('upload-files')} type="file" onChange={this.fileUpload} multiple />
                    <input className={cn('upload-button')} type="button" value="업로드" />
                </div>
                <div className={cn('upload-info-wrap')}>
                    {
                        this.state.fileList.map(
                            (value , index) => {

                                const splitFileName = value.name.substr(0 , value.name.lastIndexOf('.')).split('-')
                                const singer = splitFileName[0]
                                const song = splitFileName[1]
                                const album = splitFileName[2]

                                return (
                                <div className="upload-info" key={index}>
                                    <input type="text" placeholder="가수" defaultValue={singer} readOnly={this.state.checked.get(index)}/>
                                    
                                    <input type="text" placeholder="제목" defaultValue={song} readOnly={this.state.checked.get(index)} />
                                    
                                    <input type="text" placeholder="앨범" defaultValue={album} readOnly={this.state.checked.get(index)} />

                                    <input type="button" value="저장" onClick={(e) => {
                                        this.setState({'checked' : this.state.checked.set(index , !this.state.checked.get(index))})
                                    }} />
                                </div>
                                )
                            }
                        )
                    }
                </div>
            </div>
        )
   } 
}