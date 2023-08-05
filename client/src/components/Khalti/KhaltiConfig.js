import myKey from "../Khalti/KhaltiKey";
import axios from "axios";
let config = {
  // replace this key with yours
  publicKey: myKey.publicTestKey,
  productIdentity: "123766",
  productName: "Wearables",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      // hit merchant api for initiating verfication
      console.log(payload);
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      let config = {
        headers: 
        {'Authorization': `Key ${myKey.secretKey}`},
        'Access-Control-Allow-Origin': '*'
      };

      axios.post("https://khalti.com/api/v2/payment/verify", data, config)
      .then(response => {
        alert("Success");
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;
