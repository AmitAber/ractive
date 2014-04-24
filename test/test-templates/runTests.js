(function () {

	'use strict';

	var isBuild, config, i, prefixedModules = [];

	System.paths['*'] = '../<%= levels %>es6/*.js';

	System.paths['modules/*'] = '../modules/*.js';
	System.paths['samples/*'] = '../samples/*.js';
	System.paths['vendor/*'] = '../vendor/*.js';

	if ( /build=true/.test( window.location.search ) || /phantomjs/i.test( window.navigator.userAgent ) ) {
		isBuild = true;
		QUnit.config.autostart = false;
		System.paths['ractive'] = '../tmp/ractive-legacy';
	}

	// can't use .map() because of IE...
	i = _modules.length;
	while ( i-- ) {
		prefixedModules[i] = 'modules/' + _modules[i];
	}

	Promise.all(
		[ 'ractive' ].concat( prefixedModules ).map( function ( id ) {
			return System.import( id );
		})
	).then( function ( deps ) {
		var Ractive = window.Ractive = deps.shift().default;

		console.log( deps );

		Ractive.defaults.magic = /magic=true/.test( window.location.search );

		deps.forEach( function ( testSet ) {
			testSet();
		});

		if ( isBuild ) {
			QUnit.start();
		}
	}).catch( function ( err ) {
		setTimeout( function () { throw err; });
	});

}());
