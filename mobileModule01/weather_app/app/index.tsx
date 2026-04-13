import React from 'react';
import {View, Text, Button, StyleSheet, useWindowDimensions} from 'react-native';
import { Appbar, IconButton, Searchbar } from 'react-native-paper';
import { TabBar, TabBarProps, Route, TabView, SceneMap} from 'react-native-tab-view';

const styles = StyleSheet.create({
	Searchbar: {
		margin: 15
	},
	scene: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
})

type MyRoute = {
	key: string;
	title: string;
	icon: string;
}

const AppBar = () => {
	const [searchString, setSearchString] = React.useState('');

	return (
		<View>
			<Searchbar style={styles.Searchbar}
				placeholder="Search"
				onChangeText={setSearchString}
				value={searchString}
				right={()=> (
					<IconButton
						icon="crosshairs-gps"
						onPress={() => console.log("Get Location I Guess")}
					/>
				)}
			/>
		</View>
	);
}

const Currently = () => (
  <View style={styles.scene}>
    <Text>Currently</Text>
  </View>
);

const Today = () => (
  <View style={styles.scene}>
    <Text>Today</Text>
  </View>
);

const Weekly = () => (
  <View style={styles.scene}>
    <Text>Weekly</Text>
  </View>
);

const BottomBar = (props: TabBarProps<MyRoute>) => {
	const getRoute = (route: any): MyRoute => route;
	return (
		<TabBar
			{...props}
			style={{backgroundColor: '#6200ee'}}
			indicatorStyle={{backgroundColor: 'white'}}
			renderIcon={({route, color}) => (
				<IconButton 
					icon={getRoute(route).icon}
					iconColor={color ?? 'white'}
				/>
			)}
			renderLabel={({route, color}: {route: MyRoute; color: string}) => (
				<Text style={{color, fontSize: 12}}>
					{route.title}
				</Text>
			)}
		/>
	);
}

const weatherApp = () => {

	const layout = useWindowDimensions();
	const [index, setIndex]  = React.useState(0);
	const [routes] = React.useState<MyRoute[]>([
		{ key: 'currently', title: 'Currently', icon: 'weather-partly-cloudy'},
		{ key: 'today', title: 'Today', icon: 'calendar-today' },
		{ key: 'weekly', title: 'Weekly', icon: 'calendar' },
	]);

	const renderScene = SceneMap({
		currently: Currently,
		today: Today,
		weekly: Weekly,
	});


	return (
		<View style={{flex: 1}}>
			<AppBar />
			<TabView
				navigationState={{index, routes}}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{width: layout.width}}
				tabBarPosition='bottom'
				renderTabBar={(props) => <BottomBar {...props} />}
			/>
		</View>
	);
}

export default weatherApp;
