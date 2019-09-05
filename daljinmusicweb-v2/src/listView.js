import React , { Component } from 'react'
import './listView.css'
class ListView extends Component {

    constructor (props) {
        super(props)


    }


    render () {

        return(
            <div className="topdiv">
                <div className="albumlistdiv">
                    <ul className="albumlist">
                        <li>Album1</li>
                        <li>Album2</li>
                        <li>Album3</li>
                    </ul>
                </div>

                <div className="hidescroll">
                    <div className="musiclistdiv scrollable">
                        <ul className="musiclist">
                            <li>list1</li>
                            <li>list2</li>
                            <li>list3</li>
                            <li>list4</li>
                            <li>list5</li>
                        </ul>
                    </div>
                </div>

                <div className="menulistdiv">
                    <ul className="menulist">
                        <li>button1</li>
                        <li>button2</li>
                        <li>button3</li>
                    </ul>
                </div>
            </div>

        )

    }



}

export default ListView;