const path = require('path');
const blanket = require('blanket');

blanket({
    pattern: [
        path.resolve(__dirname, '../../server/controller')
    ]
});
