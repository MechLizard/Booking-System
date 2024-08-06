export default {
    spec: 'test/test.js',
    require: [
        'chai/register-expect',
        'chai/register-should',
        'chai/register-assert'
    ],
    'node-option': [
        'experimental-specifier-resolution=node', // For resolving module specifiers
    ]
};