'use strict';

var Assert = require('assert');
var Gphone = require('google-libphonenumber');
var Handlebars = require('handlebars');
var PNF = Gphone.PhoneNumberFormat;
var PhoneUtil = Gphone.PhoneNumberUtil.getInstance();


function safe(html) {
	return new Handlebars.SafeString(html);
}

function escape(str) {
	return Handlebars.Utils.escapeExpression(str);
}

function isString(str) {
	return (typeof str === 'string');
}

// parse to phone object
function parse(phone, format) {
	try {
		return PhoneUtil.parse(phone, format);
	} catch (err) {
		return null;
	}
}

// format to E164 string, e.g., "+18005550123"
function format(obj, fmt) {
	try {
		return PhoneUtil.format(obj, fmt);
	} catch (err) {
		return null;
	}
}

function _fmtCode(fmt) {
	switch (fmt) {
		case 'E164': return PNF.E164;
		case 'INTERNATIONAL': return PNF.INTERNATIONAL;
		case 'NATIONAL': return PNF.NATIONAL;
		case 'RFC3966': return PNF.RFC3966;
		default: return false;
	}
}

// parse phone string and convert to e164
exports.format = function(phone, fmt) {

	var fmtCode = _fmtCode(fmt);

	// console.log(ns + 'format()'.red);
	// console.log('* phone:', phone);
	// console.log('* format:', fmt);
	// console.log('* format code:', fmtCode);

	Assert.ok(isString(phone) || !phone, 'Param `phone` must be string, null, or undefined.');
	Assert.ok(fmtCode >= 0, 'Param `format` should be either: E164, INTERNATIONAL, NATIONAL, RFC3966');

	if (!phone) return null;

	// parse obj => format str
	// todo: what happens if both parses fail?
	var obj = parse(phone);
	if (!obj) obj = parse(phone, 'US');
	// var countryCode = obj.getCountryCode();
	var str = format(obj, fmtCode);

	// console.log('* country:', countryCode);
	// console.log('* str:', str);

	// For E164 return a correctly formated number or return null.
	// For all others return a correctly formatted number or return original string.
	return (fmt === 'E164')? str : str || phone;
};

// http://stackoverflow.com/a/1467262
exports.dialer = function(phone, ext) {

	if (!phone) return safe('');

	if (!isString(ext)) ext = null;

	phone = escape(phone);
	ext = escape(ext);

	var e164 = exports.format(phone, 'E164');
	var intl = exports.format(phone, 'INTERNATIONAL');
	var html = '<a href="tel:' + e164 + '">' + intl + '</a>';

	if (ext) html += ' ext ' + ext;

	return safe(html);
};

exports.viewer = function(phone, ext) {

	if (!phone) return '';

	if (!isString(ext)) ext = null;

	phone = escape(phone);
	ext = escape(ext);

	var intl = exports.format(phone, 'INTERNATIONAL');
	var text = intl;
	if (ext) text += ' ext ' + ext;

	return text;
};
