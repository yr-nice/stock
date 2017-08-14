/*
	Date Format 1.1
	(c) 2007 Steven Levithan <stevenlevithan.com>
	MIT license
	With code by Scott Trenda (Z and o flags, and enhanced brevity)
*/

/*** dateFormat
	Accepts a date, a mask, or a date and a mask.
	Returns a formatted version of the given date.
	The date defaults to the current date/time.
	The mask defaults ``"ddd mmm d yyyy HH:MM:ss"``.
*/
/*** Sample
	var now = new Date();

	now.format("m/dd/yy");
	// Returns, e.g., 6/09/07

	// Can also be used as a standalone function
	dateFormat(now, "dddd, mmmm d, yyyy, h:MM:ss TT");
	// Saturday, June 9, 2007, 5:46:21 PM

	// You can use one of several named masks
	now.format("isoFullDateTime");
	// 2007-06-09T17:46:21.431-0500

	// ...Or add your own
	dateFormat.masks.hammerTime = 'HH:MM! "Can\'t touch this!"';
	now.format("hammerTime");
	// 17:46! Can't touch this!

	// When using the standalone dateFormat function,
	// you can also provide the date as a string
	dateFormat("Jun 9 2007", "fullDate");
	// Saturday, June 9, 2007

	// Note that if you don't include the mask argument,
	// dateFormat.masks.default is used
	now.format();
	// Sat Jun 9 2007 17:46:21

	// And if you don't include the date argument,
	// the current date and time is used
	dateFormat();
	// Sat Jun 9 2007 17:46:22

	// Finally, you can skip the date argument (as long as your mask doesn't
	// contain any numbers), in which case the current date/time is used
	dateFormat("longTime");
	// 5:46:22 PM EST
*/

/**** special characters

	d		Day of the month as digits; no leading zero for single-digit days.
	dd 		Day of the month as digits; leading zero for single-digit days.
	ddd		Day of the week as a three-letter abbreviation.
	dddd 	Day of the week as its full name.
	m 		Month as digits; no leading zero for single-digit months.
	mm 		Month as digits; leading zero for single-digit months.
	mmm 	Month as a three-letter abbreviation.
	mmmm 	Month as its full name.
	yy 		Year as last two digits; leading zero for years less than 10.
	yyyy 	Year represented by four digits.
	h 		Hours; no leading zero for single-digit hours (12-hour clock).
	hh 		Hours; leading zero for single-digit hours (12-hour clock).
	H 		Hours; no leading zero for single-digit hours (24-hour clock).
	HH 		Hours; leading zero for single-digit hours (24-hour clock).
	M 		Minutes; no leading zero for single-digit minutes.Uppercase M unlike CF timeFormat's m to avoid conflict with months.
	MM 		Minutes; leading zero for single-digit minutes.	Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
	s 		Seconds; no leading zero for single-digit seconds.
	ss		Seconds; leading zero for single-digit seconds.
	l or L	Milliseconds. l gives 3 digits. L gives 2 digits.
	t 		Lowercase, single-character time marker string: a or p.	No equivalent in CF.
	tt 		Lowercase, two-character time marker string: am or pm.	No equivalent in CF.
	T 		Uppercase, single-character time marker string: A or P.	Uppercase T unlike CF's t to allow for user-specified casing.
	TT 		Uppercase, two-character time marker string: AM or PM. Uppercase TT unlike CF's tt to allow for user-specified casing.
	Z 		US timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset is returned, e.g. GMT-0500 	No equivalent in CF.
	o 		GMT/UTC timezone offset, e.g. -0500 or +0230. No equivalent in CF.
	'...'or "..." Literal character sequence. Surrounding quotes are removed.	No equivalent in CF.
*/

/***** named masks provided by default
	default 			ddd mmm d yyyy HH:MM:ss 	Sat Jun 9 2007 17:46:21
	shortDate 			m/d/yy 						6/9/07
	mediumDate 			mmm d, yyyy 				Jun 9, 2007
	longDate 			mmmm d, yyyy 				June 9, 2007
	fullDate 			dddd, mmmm d, yyyy 			Saturday, June 9, 2007
	shortTime 			h:MM TT 					5:46 PM
	mediumTime 			h:MM:ss TT 					5:46:21 PM
	longTime 			h:MM:ss TT Z 				5:46:21 PM EST
	isoDate 			yyyy-mm-dd 					2007-06-09
	isoTime 			HH:MM:ss 					17:46:21
	isoDateTime 		yyyy-mm-dd'T'HH:MM:ss 		2007-06-09T17:46:21
	isoFullDateTime 	yyyy-mm-dd'T'HH:MM:ss.lo 	2007-06-09T17:46:21.431-0500
*/

var dateFormat = function ()
{
	var	token        = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloZ]|"[^"]*"|'[^']*'/g,    //"
		timezone     = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (value, length)
		{
			value = String(value);
			length = parseInt(length) || 2;
			while (value.length < length)
				value = "0" + value;
			return value;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask)
	{
		// Treat the first argument as a mask if it doesn't contain any numbers
		if (arguments.length == 1 &&(typeof date == "string" || date instanceof String) && !/\d/.test(date))
		{
			mask = date;
			date = undefined;
		}

		date = date ? new Date(date) : new Date();
		if (isNaN(date))
			throw "invalid date";

		var dF = dateFormat;
		mask   = String(dF.masks[mask] || mask || dF.masks["default"]);

		var	d = date.getDate(),
			D = date.getDay(),
			m = date.getMonth(),
			y = date.getFullYear(),
			H = date.getHours(),
			M = date.getMinutes(),
			s = date.getSeconds(),
			L = date.getMilliseconds(),
			o = date.getTimezoneOffset(),
			flags =
			{
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4)
			};

		return mask.replace(token,
								function ($0)
								{
									return ($0 in flags) ? flags[$0] : $0.slice(1, $0.length - 1);
								}
						   );
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":       "ddd mmm d yyyy HH:MM:ss",
	shortDate:       "m/d/yy",
	mediumDate:      "mmm d, yyyy",
	longDate:        "mmmm d, yyyy",
	fullDate:        "dddd, mmmm d, yyyy",
	shortTime:       "h:MM TT",
	mediumTime:      "h:MM:ss TT",
	longTime:        "h:MM:ss TT Z",
	isoDate:         "yyyy-mm-dd",
	isoTime:         "HH:MM:ss",
	isoDateTime:     "yyyy-mm-dd'T'HH:MM:ss",
	isoFullDateTime: "yyyy-mm-dd'T'HH:MM:ss.lo"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

// convert String to Date
dateFormat.toDate = function (date, pattern)
{
	regxPtn={
				dd: {name:"day", ptn:"([0-9]{2})"},
				d: {name:"day", ptn:"([0-9]{1,2})"},
				mm: {name:"month", ptn:"([0-9]{2})"},
				m: {name:"month", ptn:"([0-9]{1,2})"},
				yyyy: {name:"year", ptn:"([0-9]{4})"},
				yy: {name:"year", ptn:"([0-9]{2})"}
			};

	var	token   = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloZ]|"[^"]*"|'[^']*'/g;    //"
	var nameArr = [""];
	pattern=pattern.replace(token,
								function ($0)
								{
									//alert($0);
									if($0 in regxPtn)
									{
										nameArr.push(regxPtn[$0].name);
										return regxPtn[$0].ptn;
									}
									else
										return $0.slice(1, $0.length - 1);								}
						   );
	//alert(pattern)
	//alert("/" + pattern +"/");
	var pt = eval("/" + pattern +"/");
	var arr = pt.exec(date);

	var outobj={};
	for(i=1; i<nameArr.length; i++)
	{
		outobj[ nameArr[i] ] = parseInt(arr[i]);
	}
	//alert(outobj.year);

	return new Date(outobj.year, outobj.month-1, outobj.day);

}

// For convenience...
Date.prototype.format = function (mask)
{
	return dateFormat(this, mask);
}
