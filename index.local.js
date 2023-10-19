// @ts-nocheck
'use strict';
require('dotenv').config()

const {app} = require('./functions/mailer.js');
app.listen(3000, () => console.log('Local app listening on http://localhost:3000'));
