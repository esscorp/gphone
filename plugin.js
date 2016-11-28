(function($) {
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
		input.prop('id', '');
		input.val(combine);

		//console.log('phone()', options);

		input.intlTelInput({
			nationalMode: true,
			preferredCountries: ['us', 'ca', 'gb']
		});

		// style
		group.find('.intl-tel-input').width('100%');

		function copyData(e) {
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

		input.on('countrychange', function(e, data) {
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
})(jQuery)
