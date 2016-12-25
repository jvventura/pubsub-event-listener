import PubSub from './utils/pubsub';
import checkTypes from './utils/check_types'

/**
* This is an EventDomain constructor module that acts as a wrapper for event handling.
* Suggested use: import into a script that handles a specific event domain (e.g. page events) and use to instantiate new events.
*/

class EventDomain {

	/**
	* Create an EventDomain object.
	*/
	constructor(domain) {
		if (!checkTypes(arguments, [String])) {
			throw new Error('EventDomain - Instantiation Error: Expected string for domain parameter.');
		} else if (/[^a-z0-9]/i.test(domain)) {
			throw new Error('EventDomain - Instantiation Error: Expected only a-z, A-Z, and 0-9 characters for domain parameter.')
		}
		this.domain = domain;
		this.events = {};
		this.pubsub = new PubSub();
	}

	/**
	* Create a new event watcher.
	* @param {string} name - input an event name.
	* @param {Function} watcher - input a watcher function to call immediately, with resolve function to pass data out to pubsub.
	* @param {Function} listener - input a listener function to pass to the pubsub.
	* @returns {Object} object with event details as confirmation.
	*/
	create(name, watcher, listener) {
		if (!checkTypes(arguments, [String, Function, Function])) {
			throw new Error('EventDomain - Create Error: Invalid parameters.');
		}

		if (!!this.events[name]) {
			throw new Error('EventDomain - Create Error: Event with name already exists.');
		}

		let event = {};
		event.name = name;
		event.watcher = watcher;
		event.listener = listener;

		this.events[name] = event;

		this.pubsub.subscribe(this.domain + '|' + event.name, event.listener);

		event.watcher.call(null, resolve.bind(this));

		function resolve(data) {
			this.pubsub.publish(this.domain + '|' + event.name, data);
		}

		return event;
	}

	/**
	* Delete an event watcher.
	* @param {string} name - input an event name.
	*/
	destroy(name) {
		delete this.events[name];
	}

}

export default EventDomain;