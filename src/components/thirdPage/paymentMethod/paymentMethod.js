
import React from "react";
import axios from '../../../Api/axios'
import {useLocation} from 'react-router-dom'
import "./paymentMethod.css";

function PaymentMethod(){
  const location=useLocation()
  const searchParams = new URLSearchParams(location.search);
  
  let cost=searchParams.get('cost')
	function isDate(val) {
		// Cross realm comptatible
		return Object.prototype.toString.call(val) === "[object Date]";
	}

	function isObj(val) {
		return typeof val === "object";
	}

	function stringifyValue(val) {
		if (isObj(val) && !isDate(val)) {
			return JSON.stringify(val);
		} else {
			return val;
		}
	}
	function buildForm({ action, params }) {
		const form = document.createElement("form");
		form.setAttribute("method", "post");
		form.setAttribute("action", action);

		Object.keys(params).forEach((key) => {
			const input = document.createElement("input");
			input.setAttribute("type", "hidden");
			input.setAttribute("name", key);
			input.setAttribute("value", stringifyValue(params[key]));
			form.appendChild(input);
		});

		return form;
	}

	function createFormAndSubmit(details) {
		const form = buildForm(details);
		document.body.appendChild(form);
		form.submit();
		form.remove();
	}

	const startPayment = () => {
		// call an api for payment
		axios.post("/payment/paynow", {
  amount: cost, 
}, {
    headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
   })
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				let information = {
					action: "https://securegw-stage.paytm.in/order/process",
					params: data,
				};
				createFormAndSubmit(information);
			})
			.catch((err) => {
				console.log("something went wrong while initiating the payment ! please try again");
			});
	};
	return (
		<div className="card-container">
			<button onClick={startPayment} className='pay' >paynow</button>
		</div>
	);
};
export default PaymentMethod

 
 