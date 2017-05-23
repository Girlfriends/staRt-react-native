/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  AppRegistry,
  StatusBar
} from 'react-native';
import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
} from 'react-navigation';

const BaseScreen = ({ navigation, banner }) => (
  <ScrollView>
    <View style={styles.header}>
      <Text style={[styles.titleText, styles.baseText]}>{banner.toUpperCase()}</Text>
    </View>
  </ScrollView>
);

const ProfilesScreen = ({ navigation }) => (
  <BaseScreen banner="PROFILES" navigation={navigation} />
);

const TutorialScreen = ({ navigation }) => (
  <BaseScreen banner="Tutorial Screen" navigation={navigation} />
);

const TestScreen = ({ navigation }) => (
  <BaseScreen banner="TEst Screen" navigation={navigation} />
);

const FreePlayScreen = ({ navigation }) => (
  <BaseScreen banner="Free Play Screen" navigation={navigation} />
);

const WordsScreen = ({ navigation }) => (
  <BaseScreen banner="Words Screen" navigation={navigation} />
);

const ResourcesScreen = ({ navigation }) => (
  <BaseScreen banner="Resources Screen" navigation={navigation} />
);

class NavButton extends Component {
  constructor(props) {
    super(props); 
  }

  go = () => {
    const {navigation, routeName} = this.props;
    navigation.navigate(routeName);
  }

  render() {
    const {label, active, img, imgB} = this.props; 

    return (
      <TouchableOpacity
        onPress={this.go}
        style={[styles.tab, {backgroundColor: active ? '#F0F9FC' : bg}]}
      >
        <Image
          source={active ? imgB : img}
          style={{height: tabWidth-40, width: tabWidth-40, marginBottom: 10}}
        />
        <Text style={{color: active ? bg : 'white'}}>{label.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
};

const TabView = ({ router, navigation }) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.statusBar}></View>
      <View style={styles.innerContainer}>
        <View style={styles.tabContainer}>
          <NavButton active={index==0} navigation={navigation} label="Profiles" routeName="Profiles" img={require('./assets/images/nav/profiles.png')} imgB={require('./assets/images/nav/profiles-b.png')} />
          <NavButton active={index==1} navigation={navigation} label="Tutorial" routeName="Tutorial" img={require('./assets/images/nav/tutorial.png')} imgB={require('./assets/images/nav/tutorial-b.png')} />
          <NavButton active={index==2} navigation={navigation} label="Test" routeName="Test" img={require('./assets/images/nav/auto.png')} imgB={require('./assets/images/nav/auto-b.png')} />
          <NavButton active={index==3} navigation={navigation} label="Free Play" routeName="FreePlay" img={require('./assets/images/nav/free-play.png')} imgB={require('./assets/images/nav/free-play-b.png')} />
          <NavButton active={index==4} navigation={navigation} label="Words" routeName="Words" img={require('./assets/images/nav/words.png')} imgB={require('./assets/images/nav/words-b.png')} />
          <NavButton active={index==5} navigation={navigation} label="Resources" routeName="Resources" img={require('./assets/images/nav/resources.png')} imgB={require('./assets/images/nav/resources-b.png')} />
        </View>
        <View style={styles.screenContainer}>
          <ActiveScreen
            navigation={addNavigationHelpers({
              ...navigation,
              state: routes[index],
            })}
          />
        </View>
      </View>
    </View>
  );
};

const Router = TabRouter(
  {
    Profiles: {
      screen: ProfilesScreen,
      path: 'profiles',
    },
    Tutorial: {
      screen: TutorialScreen,
      path: 'tutorial',
    },
    Test: {
      screen: TestScreen,
      path: 'test',
    },
    FreePlay: {
      screen: FreePlayScreen,
      path: 'freeplay',
    },
    Words: {
      screen: WordsScreen,
      path: 'words',
    },
    Resources: {
      screen: ResourcesScreen,
      path: 'resources',
    },
  },
  {
    // Change this to start on a different tab
    initialRouteName: 'Profiles',
  }
);

const stArtNav = createNavigationContainer(
  createNavigator(Router)(TabView)
);

const bg = '#53c8e9';
const bgLight = '#c5f3ff';
const tabWidth = 120;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  appContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? 20 : 0,
    backgroundColor: bg
  },
  screenContainer: {
    flex: 1 ,
  },
  baseText: {
    fontFamily: 'Quicksand'
  },
  header: {
    backgroundColor: bgLight,
    padding: 15,
  },
  titleText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: bg
  },
  tabContainer: {
    flexDirection: 'column',
    width: tabWidth,
    backgroundColor: bg
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('staRt', () => stArtNav);
