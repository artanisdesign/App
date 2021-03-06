function AppWindow() {
	//load dependencies
	var _ = require('/lib/underscore'),
		theme = require('/ui/theme'),
		ui = require('/ui/components'),
		TabStripView = require('/ui/TabStripView'),
		StreamView = require('/ui/StreamView'),
		GroupsView = require('/ui/GroupsView'),
		LeadersView = require('/ui/LeadersView'),
		EventsView = require('/ui/EventsView');
	
	//create base proxy object
	var self = new ui.Window({
		navBarHidden:true,
		exitOnClose:true,
		backgroundImage:'/images/back.png'
	});
	self.orientationModes = [Ti.UI.PORTRAIT];
	
	var header = new ui.View({
		backgroundColor:theme.appcRed,
		height:44,
		top:0
	});
	self.add(header);
	
	var logo = new ui.ImageView('/images/appc_white.png', {
		left:5
	});
	header.add(logo);
	
	var checkinLabel = new ui.Label('Check In', {
		color:'#ffffff',
		right:5,
		font: {
			fontWeight:'bold'
		}
	});
	header.add(checkinLabel);
	
	var tabs = new TabStripView({
		viewArgs: {
			top:44
		},
		tabs: {
			stream: {
				title:L('updates', 'Stream'),
				icon:'/images/tabs/chat_white.png'
			},
			groups: {
				title:L('groups', 'Groups'),
				icon:'/images/tabs/group_white.png'
			},
			events: {
				title:L('events', 'Events'),
				icon:'/images/tabs/calendar_white.png'
			},
			leaders: {
				title:L('leaders', 'Leaders'),
				icon:'/images/tabs/badge_white.png'
			}
		}
	});
	self.add(tabs.viewProxy);
	
	var scroller = Ti.UI.createScrollableView({
		top:100,
		left:0,
		right:0,
		bottom:0,
		views:[new StreamView(), new GroupsView(), new EventsView(), new LeadersView()],
		showPagingControl:false
	});
	self.add(scroller);
	
	scroller.addEventListener('scroll', function(e) {
		tabs.selectIndex(e.currentPage);
	});
	
	/*
	tabs.addEventListener('selected', function(e) {
		scroller.scrollToView(e.index);
	});
	*/
	
	checkinLabel.addEventListener('click', function() {
		var CheckinWindow = require('/ui/CheckinWindow');
		var w = new CheckinWindow();
		w.open();
	});
	
	return self;
}

module.exports = AppWindow;