'use strict';

var test = require('tape').test;
var filter = require('./');

test('degenerate', function(t) {
    t.equal(filter()(), true);
    t.equal(filter(undefined)(), true);
    t.equal(filter(null)(), true);
    t.end();
});

test('==, string', function(t) {
    var f = filter(['==', 'foo', 'bar']);
    t.equal(f({tags: {foo: 'bar'}}), true);
    t.equal(f({tags: {foo: 'baz'}}), false);
    t.end();
});

test('==, number', function(t) {
    var f = filter(['==', 'foo', 0]);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('==, null', function(t) {
    var f = filter(['==', 'foo', null]);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('==, $type', function(t) {
    var f = filter(['==', '$type', 'LineString']);
    t.equal(f({type: 1}), false);
    t.equal(f({type: 2}), true);
    t.end();
});

test('==, $id', function(t) {
    var f = filter(['==', '$id', 1234]);

    t.equal(f({id: 1234}), true);
    t.equal(f({id: '1234'}), false);
    t.equal(f({tags: {id: 1234}}), false);

    t.end();
});

test('!=, string', function(t) {
    var f = filter(['!=', 'foo', 'bar']);
    t.equal(f({tags: {foo: 'bar'}}), false);
    t.equal(f({tags: {foo: 'baz'}}), true);
    t.end();
});

test('!=, number', function(t) {
    var f = filter(['!=', 'foo', 0]);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: true}}), true);
    t.equal(f({tags: {foo: false}}), true);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), true);
    t.equal(f({tags: {}}), true);
    t.end();
});

test('!=, null', function(t) {
    var f = filter(['!=', 'foo', null]);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: true}}), true);
    t.equal(f({tags: {foo: false}}), true);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), true);
    t.equal(f({tags: {}}), true);
    t.end();
});

test('!=, $type', function(t) {
    var f = filter(['!=', '$type', 'LineString']);
    t.equal(f({type: 1}), true);
    t.equal(f({type: 2}), false);
    t.end();
});

test('<, number', function(t) {
    var f = filter(['<', 'foo', 0]);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: -1}}), true);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('<, string', function(t) {
    var f = filter(['<', 'foo', '0']);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), true);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('<=, number', function(t) {
    var f = filter(['<=', 'foo', 0]);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: -1}}), true);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('<=, string', function(t) {
    var f = filter(['<=', 'foo', '0']);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: '-1'}}), true);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('>, number', function(t) {
    var f = filter(['>', 'foo', 0]);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('>, string', function(t) {
    var f = filter(['>', 'foo', '0']);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '1'}}), true);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('>=, number', function(t) {
    var f = filter(['>=', 'foo', 0]);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: '1'}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('>=, string', function(t) {
    var f = filter(['>=', 'foo', '0']);
    t.equal(f({tags: {foo: -1}}), false);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '1'}}), true);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: '-1'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('in, degenerate', function(t) {
    var f = filter(['in', 'foo']);
    t.equal(f({tags: {foo: 1}}), false);
    t.end();
});

test('in, string', function(t) {
    var f = filter(['in', 'foo', '0']);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('in, number', function(t) {
    var f = filter(['in', 'foo', 0]);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('in, null', function(t) {
    var f = filter(['in', 'foo', null]);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: true}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), false);
    t.end();
});

test('in, multiple', function(t) {
    var f = filter(['in', 'foo', 0, 1]);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: 3}}), false);
    t.end();
});

test('in, large_multiple', function(t) {
    var f = filter(['in', 'foo'].concat(Array.apply(null, {length: 2000}).map(Number.call, Number)));
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: 1999}}), true);
    t.equal(f({tags: {foo: 2000}}), false);
    t.end();
});

test('in, $type', function(t) {
    var f = filter(['in', '$type', 'LineString', 'Polygon']);
    t.equal(f({type: 1}), false);
    t.equal(f({type: 2}), true);
    t.equal(f({type: 3}), true);

    var f1 = filter(['in', '$type', 'Polygon', 'LineString', 'Point']);
    t.equal(f1({type: 1}), true);
    t.equal(f1({type: 2}), true);
    t.equal(f1({type: 3}), true);

    t.end();
});

test('!in, degenerate', function(t) {
    var f = filter(['!in', 'foo']);
    t.equal(f({tags: {foo: 1}}), true);
    t.end();
});

test('!in, string', function(t) {
    var f = filter(['!in', 'foo', '0']);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), true);
    t.equal(f({tags: {}}), true);
    t.end();
});

test('!in, number', function(t) {
    var f = filter(['!in', 'foo', 0]);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), true);
    t.end();
});

test('!in, null', function(t) {
    var f = filter(['!in', 'foo', null]);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), true);
    t.end();
});

test('!in, multiple', function(t) {
    var f = filter(['!in', 'foo', 0, 1]);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: 3}}), true);
    t.end();
});

test('!in, large_multiple', function(t) {
    var f = filter(['!in', 'foo'].concat(Array.apply(null, {length: 2000}).map(Number.call, Number)));
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: 1999}}), false);
    t.equal(f({tags: {foo: 2000}}), true);
    t.end();
});

test('!in, $type', function(t) {
    var f = filter(['!in', '$type', 'LineString', 'Polygon']);
    t.equal(f({type: 1}), true);
    t.equal(f({type: 2}), false);
    t.equal(f({type: 3}), false);
    t.end();
});

test('any', function(t) {
    var f1 = filter(['any']);
    t.equal(f1({tags: {foo: 1}}), false);

    var f2 = filter(['any', ['==', 'foo', 1]]);
    t.equal(f2({tags: {foo: 1}}), true);

    var f3 = filter(['any', ['==', 'foo', 0]]);
    t.equal(f3({tags: {foo: 1}}), false);

    var f4 = filter(['any', ['==', 'foo', 0], ['==', 'foo', 1]]);
    t.equal(f4({tags: {foo: 1}}), true);

    t.end();
});

test('all', function(t) {
    var f1 = filter(['all']);
    t.equal(f1({tags: {foo: 1}}), true);

    var f2 = filter(['all', ['==', 'foo', 1]]);
    t.equal(f2({tags: {foo: 1}}), true);

    var f3 = filter(['all', ['==', 'foo', 0]]);
    t.equal(f3({tags: {foo: 1}}), false);

    var f4 = filter(['all', ['==', 'foo', 0], ['==', 'foo', 1]]);
    t.equal(f4({tags: {foo: 1}}), false);

    t.end();
});

test('none', function(t) {
    var f1 = filter(['none']);
    t.equal(f1({tags: {foo: 1}}), true);

    var f2 = filter(['none', ['==', 'foo', 1]]);
    t.equal(f2({tags: {foo: 1}}), false);

    var f3 = filter(['none', ['==', 'foo', 0]]);
    t.equal(f3({tags: {foo: 1}}), true);

    var f4 = filter(['none', ['==', 'foo', 0], ['==', 'foo', 1]]);
    t.equal(f4({tags: {foo: 1}}), false);

    t.end();
});

test('has', function(t) {
    var f = filter(['has', 'foo']);
    t.equal(f({tags: {foo: 0}}), true);
    t.equal(f({tags: {foo: 1}}), true);
    t.equal(f({tags: {foo: '0'}}), true);
    t.equal(f({tags: {foo: true}}), true);
    t.equal(f({tags: {foo: false}}), true);
    t.equal(f({tags: {foo: null}}), true);
    t.equal(f({tags: {foo: undefined}}), true);
    t.equal(f({tags: {}}), false);
    t.end();
});

test('!has', function(t) {
    var f = filter(['!has', 'foo']);
    t.equal(f({tags: {foo: 0}}), false);
    t.equal(f({tags: {foo: 1}}), false);
    t.equal(f({tags: {foo: '0'}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: false}}), false);
    t.equal(f({tags: {foo: null}}), false);
    t.equal(f({tags: {foo: undefined}}), false);
    t.equal(f({tags: {}}), true);
    t.end();
});
