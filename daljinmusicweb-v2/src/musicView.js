import React , {Component} from 'react'
import ListView from './listView'

class MusicView extends Component {



    render () {
        return (
        <div>
            <table>
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
            
        </div>
        )
    }

}

export default MusicView;