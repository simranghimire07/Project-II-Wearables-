const axios = require('axios');

let data = {
  "token": "MNVDa7acWyWdvXf9qWVfQm",
  "amount": 10000
};

let config = {
  headers: {'Authorization': 'Key test_secret_key_03e555f4336b4f67a5b0c77395deef0c'}
};

axios.get("https://khalti.com/api/v2/payment/status", data, config)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.log(error);
});