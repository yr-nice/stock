var pm = new Object();
pm.regxExcludeMatch = function (src, includePtn, excludePtn)
{
	var arr = src.match(includePtn);
	fflog(arr.length);
	fflog(arr);

}


pm.removeNode = function (obj, tagname, attrname, attrvalue)
{
	if(getType(attrname)=="String" && getType(attrvalue)=="String")
	{
		var arr = obj.childNodes;
		//for()
		/*for(i in attrname)
			fflog(i+":"+attrname[i]);
			*/
	}

}


/*****************************************************************************************************************/

//util functions
function minMatch(str, ptn)
{
	var re = null;
	while(1)
	{
		var section = str.slice(0, str.length/2);
		var tmp = section.match(ptn);
		if(tmp)
			re = tmp;
		else
		{
			section = str.slice(str.length/2);
			tmp = section.match(ptn);
			if(tmp)
				re = tmp;
			else break;
		}
		str = re[0];
		//alert(str);
	}

	re? str = re[0]:"";
	while(1)
	{
		var tmp = str.match(ptn)
		if(tmp)
			re=tmp
		else break;
		//alert(str);
		str = re[0].slice(1)
	}
	re? str = re[0]:"";
	while(1)
	{
		var tmp = str.match(ptn)
		if(tmp)
			re=tmp
		else break;
		//alert(str);
		str = re[0].slice(0,-1);
	}
	return re;
}

String.format = function( text )
{
    //check if there are two arguments in the arguments list
    if ( arguments.length <= 1 )
    {
        //if there are not 2 or more arguments there's nothing to replace
        //just return the original text
        return text;
    }
    //decrement to move to the second argument in the array
    for( var token = 1; token <arguments.length; token++ )
    {
        //iterate through the tokens and replace their placeholders from the original text in order
        text = text.replace( /%s/i, arguments[ token ] );
    }
    return text;
};




function getParNode(obj, attrs, values)
{
	var re = null;
	if(!attrs || !values)
		re =  obj.parentNode;
	else if(getType(attrs)=="String" && getType(values)=="String")
		while(obj.parentNode)
		{
			if(obj.parentNode[attrs] && obj.parentNode[attrs].toLowerCase()== values.toLowerCase())
			{
				re = obj.parentNode;
				break;
			}
			obj = obj.parentNode
		}
	else if(getType(attrs)=="Array" && getType(values)=="Array")
		while(obj.parentNode)
		{
			fflog(obj.parentNode);
			//fflog(obj.parentNode[ "name" ]);
			var match = true;
			for(var i=0; i<attrs.length; i++)
			{
				//fflog(obj.parentNode[ attrs[i] ]);
				if(!obj.parentNode[ attrs[i] ] || obj.parentNode[ attrs[i] ].toLowerCase() != values[i].toLowerCase())
				{
					match=false;
					break;
				}
			}
			if(match)
			{
				re = obj.parentNode;
				break;
			}
			obj = obj.parentNode
		}
	return re;

}

function getType(obj)
{
	//fflog(obj.constructor.toString());
	var arr = obj.constructor.toString().match(/function *(.*)\(.*\{/i);
	if(arr[1] != null)
		return arr[1];
	else
		return "Unknown Type!";
}

fflog = function (src)
{
	if(window.console)
		window.console.info(src);
}

function stopBubble(e)
{
	// If an event object is provided, then this is a non-IE browser
	if ( e && e.stopPropagation )
	// and therefore it supports the W3C stopPropagation() method
		e.stopPropagation();
	else
	// Otherwise, we need to use the Internet Explorer
	// way of cancelling event bubbling
		window.event.cancelBubble = true;
}

function stopDefault( e )
{
	// Prevent the default browser action (W3C)
	if ( e && e.preventDefault )
		e.preventDefault();
	// A shortcut for stoping the browser action in IE
	else
		window.event.returnValue = false;
	return false;
}

// Find the X (Horizontal, Left) position of an element
function pageX(elem)
{
	// See if we're at the root element, or not
	return elem.offsetParent ?
	// If we can still go up, add the current offset and recurse upwards
	elem.offsetLeft + pageX( elem.offsetParent ) :
	// Otherwise, just get the current offset
	elem.offsetLeft;
}
// Find the Y (Vertical, Top) position of an element
function pageY(elem)
{
	// See if we're at the root element, or not
	return elem.offsetParent ?
	// If we can still go up, add the current offset and recurse upwards
	elem.offsetTop + pageY( elem.offsetParent ) :
	// Otherwise, just get the current offset
	elem.offsetTop;
}

// Find the horizontal positioing of an element within its parent
function parentX(elem)
{
	// If the offsetParent is the element's parent, break early
	return elem.parentNode == elem.offsetParent ?
		elem.offsetLeft :
		// Otherwise, we need to find the position relative to the entire
		// page for both elements, and find the difference
		pageX( elem ) - pageX( elem.parentNode );
}
// Find the vertical positioning of an element within its parent
function parentY(elem)
{
	// If the offsetParent is the element's parent, break early
	return elem.parentNode == elem.offsetParent ?
		elem.offsetTop :
		// Otherwise, we need to find the position relative to the entire
		// page for both elements, and find the difference
		pageY( elem ) - pageY( elem.parentNode );
}

function setOpacity( elem, level )
{
	// If filters exist, then this is IE, so set the Alpha filter
	if ( elem.filters )
		elem.style.filters = 'alpha(opacity=' + level + ')';
	// Otherwise use the W3C opacity property
	else
		elem.style.opacity = level / 100;
}

function slideDown( elem )
{
	// Start the slide down at 0
	elem.style.height = '0px';
	// Show the element (but you can see it, since the height is 0)
	show( elem );
	// Find the full, potential, height of the element
	var h = fullHeight( elem );
	// We're going to do a 20 'frame' animation that takes
	// place over one second
	for ( var i = 0; i <= 100; i += 5 )
	{
		// A closure to make sure that we have the right 'i'
		(function()
		{
			var pos = i;
			// Set the timeout to occur at the specified time in the future
			setTimeout(function()
			{
				// Set the new height of the element
				elem.style.height = (( pos / 100 ) * h ) + "px";
			}, ( pos + 1 ) * 10 );
		})();
	}
}

function fadeIn( elem )
{
	// Start the opacity at 0
	setOpacity( elem, 0 );
	// Show the element (but you cant see it, since the opacity is 0)
	show( elem );
	// We're going to do a 20 'frame' animation that takes
	// place over one second
	for ( var i = 0; i <= 100; i += 5 )
	{
		// A closure to make sure that we have the right 'i'
		(function()
		{
			var pos = i;
			// Set the timeout to occur at the specified time in the future
			setTimeout(function()
			{
				// Set the new opacity of the element
				setOpacity( elem, pos );
			}, ( pos + 1 ) * 10 );
		})();
	}
}

// Find the horizontal position of the cursor
function getX(e)
{
	// Normalize the event object
	e = e || window.event;
	// Check for the non-IE position, then the IE position
	return e.pageX || e.clientX + document.body.scrollLeft;
}


// Find the vertical position of the cursor
function getY(e)
{
	// Normalize the event object
	e = e || window.event;
	// Check for the non-IE position, then the IE position
	return e.pageY || e.clientY + document.body.scrollTop;
}

// Get the X position of the mouse relative to the element target
// used in event object 'e'
function getElementX( e )
{
	// Find the appropriate element offset
	return ( e && e.layerX ) || window.event.offsetX;
}

// Get the Y position of the mouse relative to the element target
// used in event object 'e'
function getElementY( e )
{
	// Find the appropriate element offset
	return ( e && e.layerY ) || window.event.offsetY;
}

// Returns the height of the web page
// (could change if new content is added to the page)
function pageHeight()
{
	return document.body.scrollHeight;
}
// Returns the width of the web page
function pageWidth()
{
	return document.body.scrollWidth;
}

// A function for determining how far horizontally the browser is scrolled
function scrollX()
{
	// A shortcut, in case we're using Internet Explorer 6 in Strict Mode
	var de = document.documentElement;
	// If the pageXOffset of the browser is available, use that
	return self.pageXOffset ||
	//CHAPTER 7 n JAVASCRIPT AND CSS 155
	// Otherwise, try to get the scroll left off of the root node
	( de && de.scrollLeft ) ||
	// Finally, try to get the scroll left off of the body element
	document.body.scrollLeft;
}

// A function for determining how far vertically the browser is scrolled
function scrollY()
{
	// A shortcut, in case we're using Internet Explorer 6 in Strict Mode
	var de = document.documentElement;
	// If the pageYOffset of the browser is available, use that
	return self.pageYOffset ||
	// Otherwise, try to get the scroll top off of the root node
	( de && de.scrollTop ) ||
	// Finally, try to get the scroll top off of the body element
	document.body.scrollTop;
}