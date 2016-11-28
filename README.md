# wphone

`gphone` is a wrapper around the following:
* https://www.npmjs.com/package/google-libphonenumber - phone number validator and formatter.
* https://github.com/jackocnr/intl-tel-input - jQuery phone number input plugin.
* https://github.com/provejs/jquery-prove - custom phone number validator for jQuery provejs.

It exposes the following:
* 3 view helpers to format and display phone numbers.
	* **format** - which formats phone numbers in either E164 or INTERNATIONAL format.
	* **viewer** - which converts from E164 to INTERNATIONAL format.
	* **dialer** - which converts from E164 to INTERNATIONAL format and wraps in a link.
* 1 jQuery plugin `$.fn.phone()` to simplify the inputting of phone numbers.
* 1 jQuery plugin `$.fn.provePhone` to validate phone numbers using the jQuery provejs.

`gphone` does not include `google-libphonenumber`, `intl-tel-input`, or `jquery-prove`. It is expected that you will include these dependencies in your build process.

# Introduction

Regarding the storage and transport of phone numbers:
* We want to store all phone numbers in E164 format in the database.
* Convert to E164 format as early as possible.
* Convert away from E164 as late as possible.
* The phone number and phone extension are stored in separate columns.
* Phone numbers should be displayed to users in international format.

## View Helpers

Use format to format phone numbers.
```handlebars
{{format phone 'E164'}} //+15124510100
{{format phone 'INTERNATIONAL'}} //+1 512-451-0100
```
Use dialer for users who need to dial numbers.
```handlebars
{{dialer phone extension}}
```
Use viewer for users who don't need to dial their own number
```handlebars
{{viewer phone extension}}
```

Note: is expected that when integrating these view helpers with Handlebars you will namespace them as:
* {{phoneformat ...}}
* {{phoneViewer ...}}
* {{phoneDialer ...}}

You can also use the helpers in Node.js code:
```js
var Phone = require('@esscorp/gphone');
var e164 = Phone.format(data.phone, 'E164');
var intl = Phone.format(data.phone, 'INTERNATIONAL');
```

## jQuery Plugin

Regarding the input of phone numbers by users:
* Display in international formation `+1 512-451-0100`
* Use `$.fn.phone()` phone number picker which helps select country code and phone extension.

```javascript
// We store phone number in E164, but just incase convert again to E164
// because the phone plugin will error if phone number is not in E164.
telphone.phone({
  number: '{{phoneFormat user.phone 'E164'}}',
  extension: '{{user.phone_ext}}'
});
```

## todo
Code `telphone.phone('destroy')`
Remove Handlebars dependencies.
