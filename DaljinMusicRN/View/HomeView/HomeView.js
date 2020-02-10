import React, { Component , useEffect } from 'react'
import { ScrollView , Text, StyleSheet, View, ToastAndroid} from 'react-native'
import { withNavigationFocus } from 'react-navigation'

import TodaysLive from './TodaysLive'
import SuggestMusicsView from './SuggestMusicsView'
import HotAndNewMusicsView from './HotAndNewMusicsView'
import Top10View from './Top10View'
import LoadingView from '../LoadingView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as TodaysLiveActions from '../../Reducers/todaysLive'
import * as SuggestMusicsActions from '../../Reducers/suggestMusics'
import * as HotAndNewMusicsActions from '../../Reducers/hotAndNewMusics'
import * as Top100MusicsActions from '../../Reducers/top100Musics'


class HomeView extends Component {


    componentDidMount() {
        this.dataUpdate()
    }

    componentDidUpdate(prevProps , prevState) {
        if(prevProps !== this.props) {
            if(!prevProps.isFocused && this.props.isFocused) {
                this.dataUpdate()
            }
        }
    }

    dataUpdate() {
        this.props.TodaysLiveActions.fetchTodaysLive()
        this.props.SuggestMusicsActions.fetchSuggestMusics({ userId : this.props.userId , musicCount : 5})
        this.props.HotAndNewMusicsActions.fetchHotAndNewMusics()
        this.props.Top100MusicsActions.fetchTop100Musics({from : 1 , to : 10 , init : true})
    }

    render () {
        return (
                this.props.todaysLiveLoading && 
                this.props.suggestMusicsLoading &&
                this.props.hotAndNewMusicsLoading &&
                this.props.top100MusicsLoading 
                ?
                <LoadingView />
                :
                <ScrollView style={styles.container}>
                    <TodaysLive music={this.props.todaysLiveMusic} />
                    <SuggestMusicsView musics={this.props.suggestMusics} />
                    <HotAndNewMusicsView musics={this.props.hotAndNewMusics} />
                    <Top10View musics={this.props.top100Musics} />
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container : {
        flex : 1,
    },


})

export default connect(
    (state) => ({
        todaysLiveMusic : state.todaysLive.music,
        todaysLiveLoading : state.todaysLive.isLoading,

        suggestMusics : state.suggestMusics.musics,
        suggestMusicsLoading : state.suggestMusics.isLoading,

        hotAndNewMusics : state.hotAndNewMusics.musics,
        hotAndNewMusicsLoading : state.hotAndNewMusics.isLoading,

        top100Musics : state.top100Musics.musics,
        top100MusicsLoading : state.top100Musics.isLoading,

        userId : state.auth.userId,

    }),
    (dispatch) => ({
        TodaysLiveActions : bindActionCreators(TodaysLiveActions , dispatch),
        SuggestMusicsActions : bindActionCreators(SuggestMusicsActions , dispatch),
        HotAndNewMusicsActions : bindActionCreators(HotAndNewMusicsActions , dispatch),
        Top100MusicsActions : bindActionCreators(Top100MusicsActions , dispatch)
    })
)(withNavigationFocus(HomeView));