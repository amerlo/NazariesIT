/* Util inspired in CORS Anywhere (https://github.com/Rob--W/cors-anywhere/)
 * to avoid the cross domain error */
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

function doCORSRequest(url, callback) {
	var request = new XMLHttpRequest();
	
	request.open('GET', cors_api_url + url);
	request.onload = request.onerror = function() {
		callback(request.responseText);
	};
	
	request.send();
}


$(function() {
	var pricing = [];
	doCORSRequest('https://www.port-monitor.com/plans-and-pricing/', pricingParse);	
	
	function pricingParse (data) {
		$.each($(data).find('.product'), function (index, product) {
			var features = $(product).find('dl > dd');
			var regexInt = /\d+/g;
			var regexFloat = /\d*\.\d*/g
			
			var monitors = $(product).find('h2').text();
			var check_rate = $(features[0]).text().match(regexInt)[0];
			var history = $(features[1]).text().match(regexInt)[0];
			var multiple_notifications = $(features[2]).text();
			var push_notifications = $(features[3]).text();
			var price = $(product).find('p > a.btn-large').text().match(regexFloat)[0];
			
			product_pricing = {
				monitors: parseInt(monitors),
				check_rate: parseInt(check_rate),
				history: parseInt(history),
				multiple_notifications: multiple_notifications == 'Yes' ? true : false,
				push_notifications: push_notifications == 'Yes' ? true : false,
				price: parseFloat(price)
			};
			
			pricing.push(product_pricing);
		});
		
		$('#pricing-parsed').html(JSON.stringify(pricing));
	}
});