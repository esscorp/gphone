/* eslint-env browser */
(function($) {
	'use strict';

	$.fn.phone = function(options) {

		//set defaults
		options = options || {};
		options.number = options.number || '';
		options.extension = options.extension || '';

		var input = $(this);
		var group = input.closest('.form-group');
		var name = input.attr('name');

		// setup hidden inputs
		var hidden1 = $('<input type="hidden">');
		var hidden2 = $('<input type="hidden">');
		var combine = (options.extension)
			? options.number + ' ext ' + options.extension
			: options.number;

		// setup hidden inputs
		hidden1.attr('name', name).val(options.number);
		hidden2.attr('name', name + '_ext').val(options.number);
		input.after(hidden1);
		input.after(hidden2);

		// tweak existing input
		input.prop('name', '');
		input.val(combine);

		//console.log('phone()', options);

		input.intlTelInput({
			nationalMode: true,
			preferredCountries: ['us', 'ca', 'gb']
		});

		// style
		group.find('.intl-tel-input').width('100%');

		function copyData(/*e*/) {
			var number = input.intlTelInput('getNumber');
			var extension = input.intlTelInput('getExtension');
			//console.log('copyData()', number, extension);
			hidden1.val(number);
			hidden2.val(extension);
		}
		function validate() {
			//console.log('validate()');
			if (hidden1.validate) hidden1.validate();
			if (hidden2.validate) hidden2.validate();
		}

		input.on('countrychange', function(/*e, data*/) {
			//console.log('countrychange', data);
			copyData();
			validate();
		});
		input.on('keyup change', function() {
			//console.log('keyup change');
			copyData();
			validate();
		});

		copyData();
	};

	$.fn.provePhone = function(options) {

		var input = $(this);
		var phone = input.parent().find('input[type="tel"]');
		var enabled = $('body').booleanator(options.enabled);
		var code = phone.intlTelInput('getValidationError');
		var valid = phone.intlTelInput('isValidNumber');
		var errors = {
			0: 'Valid phone number',
			1: 'Invalid country for phone number',
			2: 'Phone number is too short',
			3: 'Phone number has incorrect number of digits',
			4: 'Not a valid phone number'
		};

		var validated = (enabled && valid)? 'success' : 'danger';
		var validation = (enabled)? validated : 'reset';
		var message = (code === 0 && !valid)? 'Invalid phone number' : errors[code];

		if (options.debug) {
			console.groupCollapsed('Validator.provePhone()', options.field); /* eslint-disable indent */
				console.log('options', options);
				console.log('input', input);
				console.log('enabled', enabled);
				console.log('valid', valid);
				console.log('code', code);
				console.log('validation', validation);
				console.log('message', message);
			console.groupEnd(); /* eslint-enable indent */
		}

		return {
			field: options.field,
			validator: options.validator,
			status: 'validated',
			validation: validation,
			message: message
		};
	};

})(jQuery);
