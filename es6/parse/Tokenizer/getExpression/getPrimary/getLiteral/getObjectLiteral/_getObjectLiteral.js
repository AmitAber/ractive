import types from 'config/types';
import getKeyValuePairs from 'parse/Tokenizer/getExpression/getPrimary/getLiteral/getObjectLiteral/getKeyValuePairs';

export default function ( tokenizer ) {
    var start, keyValuePairs;

    start = tokenizer.pos;

    // allow whitespace
    tokenizer.allowWhitespace();

    if ( !tokenizer.getStringMatch( '{' ) ) {
        tokenizer.pos = start;
        return null;
    }

    keyValuePairs = getKeyValuePairs( tokenizer );

    // allow whitespace between final value and '}'
    tokenizer.allowWhitespace();

    if ( !tokenizer.getStringMatch( '}' ) ) {
        tokenizer.pos = start;
        return null;
    }

    return {
        t: types.OBJECT_LITERAL,
        m: keyValuePairs
    };
};
