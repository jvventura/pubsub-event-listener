/**
* This is a PubSub constructor utility module.
* Suggested use: import into another wrapper and use a utility, e.g. a constructor that requires event delegation.
* It is expected to have multiple instantiated PubSub objects throughout an app.
*/
class PubSub {

	/**
	* Create a PubSub object.
	*/
	constructor() {
		this.topics = {};
	}

	/**
	* Subscribe a listener to a topic.
	* @param {string} topic - input a topic name.
	* @param {Function} listener - input a linstener function to call in event of a publish to the topic.
	* @returns {Object} object with remove method.
	*/
	subscribe(topic, listener) {

		// Check parameters.
		// Expect String topic, Function listener.
		if (typeof topic !== 'string' || typeof listener !== 'function') {
			throw new Error('PubSub - Subscribe Error: Invalid parameters.');
		}

		// If new topic, create new topic property in topics with value array.
		if (!this.topics.hasOwnProperty(topic)) {
			this.topics[topic] = [];
		}

		// Add listener to topic and store index.
		// Return removal function.
		const index = this.topics[topic].push(listener) - 1;
		const remove = (function() {
			delete this.topics[topic];
		}).bind(this);

		return {
			remove
		}

	}

	/**
	* Publish data to a topic.
	* @param {string} topic - input a topic name.
	* @param {Object} data - input an data object to publish to the topic listeners.
	*/
	publish(topic, data) {

		// Check parameters.
		// Expect String topic, Object data.
		if (typeof topic !== 'string' && typeof data !== 'object') {
			throw new Error('PubSub - Publish Error: Invalid parameters.');
		}

		// If topic does not exist, return false.
		if (!this.topics.hasOwnProperty(topic)) {
			return false;
		}

		// Fire all listeners.
		this.topics[topic].forEach(listener => {
			listener(data != undefined ? data : {});
		});
	}
}

export default PubSub;