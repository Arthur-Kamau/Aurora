# Genrate Dummy Json



Genrate Dummy Json  is a  utility that allows you to generate random JSON data using Handlebars templates. It comes with a built-in collection of Handlebars helpers that return common data values, such as names, numbers, dates, and also allows you to write your own.
It comes with a built-in collection of Handlebars helpers that return common data values, such as names, numbers, dates.



## Example

The folowing input generates the son shown below
```javascript
{
  "users": [
    {{#repeat 2}}
    {
      "id": {{@index}},
      "name": "{{firstName}} {{lastName}}",
      "work": "{{company}}",
      "email": "{{email}}",
      "dob": "{{date '1900' '2000' 'YYYY'}}",
      "address": "{{int 1 100}} {{street}}",
      "city": "{{city}}",
      "optedin": {{boolean}}
    }
    {{/repeat}}
  ],
  "images": [
    {{#repeat 3}}
    "img{{@index}}.png"
    {{/repeat}}
  ],
  "coordinates": {
    "x": {{float -50 50 '0.00'}},
    "y": {{float -25 25 '0.00'}}
  },
  "price": "${{int 0 99999 '0,0'}}"
}
```
generates the folowing json

```json
{
  "users": [
    {
      "id": 0,
      "name": "Adam Carter",
      "work": "Unilogic",
      "email": "adam.carter@unilogic.com",
      "dob": "1978",
      "address": "83 Warner Street",
      "city": "Boston",
      "optedin": true
    },
    {
      "id": 1,
      "name": "Leanne Brier",
      "work": "Connic",
      "email": "leanne.brier@connic.org",
      "dob": "13/05/1987",
      "address": "9 Coleman Avenue",
      "city": "Toronto",
      "optedin": false
    }
  ],
  "images": [
    "img0.png",
    "img1.png",
    "img2.png"
  ],
  "coordinates": {
  	"x": 35.12,
  	"y": -21.49
  },
  "price": "$59,395"
}

```

#### Generate JSON string

```js
var dummyjson = require('dummy-json');
var template = '{\
	"name": {{firstName}},\
	"age": {{int 18 65}}\
  }';
var result = dummyjson.parse(template); // Returns a string
```

Note: if you're using ES6 you can write multi-line strings using [template strings](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/template_strings).

#### Generate from a file

Instead of writing multi-line strings in Javascript you can load the template from a file using Node's `fs` utility:

```js
var fs = require('fs');
var dummyjson = require('./dummy-json');

var template = fs.readFileSync('template.hbs', {encoding: 'utf8'});
var result = dummyjson.parse(template);
```

#### Converting to JavaScript object

If the output string is properly formatted it can be parsed into a JavaScript object:

```js
var result = dummyjson.parse(template);
var obj = JSON.parse(result);
```

#### Using with a HTTP response

A common use of Dummy JSON is to create a mock API service that returns random data. Here's a quick example using Express:

```js
var fs = require('fs');
var express = require('express');
var dummyjson = require('./dummy-json');

var template = fs.readFileSync('template.hbs', {encoding: 'utf8'});
var app = express();

app.get('/people', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(dummyjson.parse(template));
});

app.listen(3000);
```

#### Command line iterface

If you install the utility globally with `npm install -g dummy-json` you can use it from the command line to parse files:

	dummyjson template.hbs > output.json

## Available helpers

### Repeat

`{{#repeat count [comma=true]}} ... {{/repeat}}`

* `count` The number of times to repeat the content (required)
* `comma` Adds or removes the separating comma between blocks of content (optional, default is true)

Repeats blocks of content, similar to Handlebars' built-in `each`. Can be used anywhere in your template, not just inside arrays. Automatically adds a comma and line break between blocks.

```js
// Repeat the block 3 times, automatically adding a comma between blocks
var messages = [
  {{#repeat 3}}
  "hello"
  {{/repeat}}
];

// Output
var messages = [
  "hello",
  "hello",
  "hello"
];
```

You can omit the comma and line break by using `comma=false`, for example:

```js
{{#repeat 3 comma=false}}hello{{/repeat}} // hellohellohello
```

You can get the iteration position using the standard Handlebars variables `@index`, `@first`, `@last`. The total number of iterations is available using `@total`.

```js
// Repeat the block 3 times using @index to modify the filename
{{#repeat 3}}
"img{{@index}}.png"
{{/repeat}}

// Output
"img0.png",
"img1.png",
"img2.png"
```

### Integer

`{{int min max [format] [round=1]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)
* `round` Rounds to the nearest multiple of the given value (optional, default is null - no rounding)

Generates a random integer from `min` (inclusive) up to and including `max` (inclusive). The optional `round` parameter will round the number to the nearest multiple of the given value.

The output can be formatted using a numeric format string, provided by numbro. For a complete list of formatting options see [http://numbrojs.com/format.html](http://numbrojs.com/format.html).

```js
// Generates a random integer between 0 and 100
{{int 0 100}} // 43

// Rounds the random integer to the nearest multiple of 5
{{int 0 100 round=5}} // 65

// Formats the random integer using numbro
{{int 10000 50000 '0,0.00'}} // 23,462.00
```

### Float

`{{float min max [format] [round=1]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)
* `round` Rounds to the nearest multiple of the given value (optional, default is null - no rounding)

Generates a random floating point number from `min` (inclusive) up to but excluding `max` (exclusive). The optional `round` parameter will round the number to the nearest multiple of the given value.

The output can be formatted using a numeric format string, provided by numbro. For a complete list of formatting options see [http://numbrojs.com/format.html](http://numbrojs.com/format.html).

```js
// Generates a random float between 0 and 1
{{float 0 1}} // 0.4319351462490857

// Rounds the random float to the nearest multiple of 0.1
{{float 0 1 round=0.1}} // 0.4

// Formats the random float using numbro
{{float 10000 50000 '0,0.00'}} // 33,127.39
```

### Date

`{{date min max [format]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)

Generates a random date between the two values. Both `min` and `max` can be represented by any string that the [Date.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse) method accepts.

By default the output uses [Date.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toString). Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random date between midnight 2010-01-01 and midnight 2015-01-01
{{date '2010' '2015'}} // Thu Jan 26 2012 03:04:15 GMT+0000 (GMT)

// Generate a random date between more specific values
{{date '2015-06-01' '2015-06-30'}} // Mon Jun 22 2015 01:02:36 GMT+0100 (BST)

// Generate a random date between even more specific values (inc. time)
{{date '2015-06-01T09:00' '2015-06-30T17:30'}} // Sun Jun 07 2015 23:55:16 GMT+0100 (BST)

// Format the date using fecha
{{date '2010' '2015' 'DD/MM/YYYY'}} // 16/06/2012

// Format the date using a unix timestamp
{{date '2010' '2015' 'unix'}} // 1340417344
```

### Time

`{{time min max [format]}}`

* `min` Minimum value (required)
* `max` Maximum value (required)
* `format` Formatting string (optional, default is null)

This is a shorthand helper for generating the time portion of a date, without needing to put the full date into the min and max values. Both `min` and `max` can be represented by any string in the 24h format `HH:mm:ss`, for example `17:48:34.`, or if you want to ignore seconds: `17:48`

By default the output uses `HH:mm`. Alternatively the output can be formatted using a format string provided by fecha. For a complete list of formatting options see [https://github.com/taylorhakes/fecha](https://github.com/taylorhakes/fecha)

```js
// Generate a random time
{{time '09:00' '17:30'}} // 14:08

// Format the time using fecha
{{time '09:00' '17:30' 'h:mm a'}} // 2:08 pm
```

### Boolean

`{{boolean}}`

Generates a random `true` or `false` value.

### Title

`{{title}}`

Generates a random title prefix, from a predefined list, such as "Mr", "Mrs", "Dr", etc.

### First name

`{{firstName}}`

Generates a random first name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Last name

`{{lastName}}`

Generates a random last name, from a predefined list. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Company

`{{company}}`

Generates a random company name, from a predefined list. This helper is kept in sync with the email and domain helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Domain

`{{domain}}`

Generates a random domain name in the format "domain.tld", from a predefined list. This helper is kept in sync with the company and email helpers - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### TLD

`{{tld}}`

Generates a random top-level domain name, from a predefined list. This helper is kept in sync with the email helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Email

`{{email}}`

Generates a random email address. This helper is kept in sync with other name-related helpers, such as username and email - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

### Street

`{{street}}`

Generates a random street name, from a predefined list.

### City

`{{city}}`

Generates a random city name, from a predefined list.

### Country

`{{country}}`

Generates a random country name, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country code helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countries}}
"name": "{{this}}"
{{/each}}
```

### Country code

`{{countryCode}}`

Generates a random 2-character country code, from a predefined list based on [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1). This helper is kept in sync with the country helper - see the section on [Synchronized helpers](#synchronized-helpers) for more information.

If you want to export the entire list then you can use the following snippet in your template:

```js
{{#each countryCodes}}
"code": "{{this}}"
{{/each}}
```
### Zipcode

`{{zipcode}}`

Generates a random US-style 5 digit zipcode.

### Postcode

`{{postcode}}`

Generates a random UK-style postcode in the format `AA9 9AA`.

### Latitude

`{{lat}}`

Generates a random latitude from -90 to +90, to 6 decimal places (roughly 10cm of precision).

### Longitude

`{{long}}`

Generates a random longitude from -180 to +180, to 6 decimal places (roughly 10cm of precision).

### Phone number

`{{phone [format]}}`

* `format` Formatting string (optional, default is `xxx-xxx-xxxx`)

Generates a random phone number in the format `xxx-xxx-xxxx`, for example "123-456-7890". To use a different format pass a string to the `format` parameter containing a series of lowercase "x" characters for each random integer.

```js
// Generate a random phone number in the default format
{{phone}} // 445-295-1044

// Generate a random phone number with a custom format
{{phone "+64 (x) xxx xxxx"}} // +64 (5) 883 4711
```

### Color

`{{color}}`

Generates a random CSS color name, from a predefined list, such as "forestgreen", "black", etc

### Hex color

`{{hexColor [websafe=false]}}`

* `websafe` Generates a websafe color if true (optional, default is false)

Generates a random hexadecimal color value with leading hash symbol.

```js
// Generates a hex color with leading hash symbol
{{hexColor}} // #34D92C

// Generates a websafe hex color
{{hexColor websafe=true}} // #33CC99
```

### GUID

`{{guid}}`

Generates a random 32 digit GUID.

### IPv4 address

`{{ipv4}}`

Generates a random IPv4 address.

### IPv6 address

`{{ipv6}}`

Generates a random IPv6 address.

### Lorem ipsum

`{{lorem [wordCount]}}`

* `wordcount` Number of words to generate (optional, default is 25)

Generates random sentences of lorem ipsum text, with occasional punctuation (commas and periods/full-stops).

```js
// Generates 25 words of lorem ipsum
{{lorem}} // Amet vel aliquam laoreet accumsan adipiscing velit... etc...

// Generates 5 words of lorem ipsum
{{lorem 5}} //  Orci nisi laoreet maximus dictum.
```

### Lowercase

`{{lowercase (helper)}}`

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to lowercase. This uses the Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to lowercase
{{lowercase (firstName)}} // ivan

// Change city to lowercase
{{lowercase (city)}} // boston
```

### Uppercase

`{{uppercase (helper)}}`

* `helper` Any helper that returns a string (required)

Converts the output of any string-based helper to uppercase. This uses the Handlebars' [subexpression syntax](http://handlebarsjs.com/expressions.html#subexpressions).

```js
// Change firstName to uppercase
{{uppercase (firstName)}} // IVAN

// Change city to uppercase
{{uppercase (city)}} // BOSTON
```

## Synchronized helpers

Several helpers, such as name and email, are linked together in order to synchronize their values. This gives the random data some continuity. Synchronization happens automatically and doesn't require any additional work, for example:

```js
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // michael.turner@unilogic.com
```

The helpers can be placed in any order and will still synchronize:

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
```

The synchronization is reset whenever the same helper is used twice, or in each iteration of a repeat block:

```js
"email": "{{email}}"          // michael.turner@unilogic.com
"firstName": "{{firstName}}", // Michael
"lastName": "{{lastName}}",   // Turner
"email": "{{email}}"          // grace.chapman@westgate.org (Note: syncing is reset here)
"firstName": "{{firstName}}", // Grace
"lastName": "{{lastName}}",   // Chapman
```

The following helpers synchronize their values:

* `firstName`, `lastName`, `username`, `company`, `domain`, `tld`, `email`
* `country`, `countryCode`

