define( function () {

	'use strict';

	return (
		typeof document !== 'undefined' &&
		document.implementation.hasFeature( 'http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1' )
	);

});
