import React , {Component} from 'react'
import ListView from './listView'
import './musicView.css'

import { connect } from 'react-redux'


class MusicView extends Component {

    render () {
        return (
        <div className="musictopdiv">
            <table className="musicListLayoutTable">
                <tbody>
                    <tr>
                        <td>
                            <ListView />
                        </td>
                        <td>

                        </td>
                        <td>
                            <ListView />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="musicPlayer">
                <h1>TEST</h1>
            </div>
        </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        isAuthenticated : state.login.isAuthenticated
    }
}


export default connect(mapStateToProps)(MusicView);