var request = require('request');
var options = {
  'method': 'POST',
  'url': 'http://127.0.0.1:3002/lab/addlab',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'lab_code': 's',
    'year': '3030',
    'lab_name': 'st',
    'student_ids': ['3','4'],
    'staff_ids': ['1','2']
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
