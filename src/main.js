import EventDomain from './modules/event';

let pageEvents = new EventDomain('page');

pageEvents.create('navigate',
	resolve => {
		let data = {
			url: window.location.href,
			timestamp: Date.now()
		};

 		if (window.top == self) {
 			resolve(data);
 		}
	},
	data => {
		console.log('Data successfully published :) Hello World...', data);
	}
);

pageEvents.create('interval',
	resolve => {
		let data = {
			hello: 'world'
		};

		setInterval(() => {
			resolve(data);
		}, 5000)

 		if (window.top == self) {
 			resolve(data);
 		}
	},
	data => {
		console.log('Data successfully published :) Hello World...', data);
	}
);