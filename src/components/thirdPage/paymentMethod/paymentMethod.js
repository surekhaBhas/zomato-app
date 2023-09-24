import React from 'react'
import './paymentMethod.css';
import UseAxiosPrivate from '../../../hooks/useAxiosPrivate';
import {  useNavigate } from 'react-router-dom';
function PaymentMethod(props) {
	const {amount,orderId}=props
	const axiosPrivate=UseAxiosPrivate()
    const navigate=useNavigate();

	const cancelOrder=()=>{
          const deleteOrder=async()=>{
			try{
				const res=await axiosPrivate.delete(`/orders/${orderId}`)
				console.log(res)
                navigate('/')
			}catch(err){
                console.log(err)
			}
		  }
		  deleteOrder()
	}


    const isObj = (val) => {
        return typeof val === 'object';
    }

    const isDate = (val) => {
        return Object.prototype.toString.call(val) === '[object Date]';
    }

    const stringifyValue = (value) => {
        if (isObj(value) && !isDate(value)) {
            return JSON.stringify(value);
        } else {
            return value;
        }
    }

const  buildForm = (details) => {
	const { action, params } = details;
	const form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', action);
	Object.keys(params).forEach(key => {
		const input = document.createElement('input');
		input.setAttribute('type', 'hidden');
		input.setAttribute('name', key);
		input.setAttribute('value', stringifyValue(params[key]));
		form.appendChild(input);
	});
	return form;
}


const	postTheInformationTOPaytm = (info) => {
    
        const form = buildForm(info);

      
        document.body.appendChild(form);

       
        form.submit();

        
        form.remove();
    }

	const getCheckSum = async (data) => {
        return  await axiosPrivate.post(`paytm/payment`, {
            
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then(result => {
            return result.json();
        }).catch(err => {
            console.log(err);
        })
    }

	const makePayment=async()=>{
		const data = {
            amount: amount,
            order:orderId
        };

        getCheckSum(data)
            .then(result => {
                let information = {
                    action: 'https://securegw-stage.paytm.in/order/process',
                    params: result
                }
                postTheInformationTOPaytm(information);
            })
            .catch(err => {
                console.log(err);
            })
	}
  return (
	<div className='order-confirmation'>
	  <button className='cancelOrder' onClick={cancelOrder}>Cancel Order</button>
	  <button className='proceed' onClick={makePayment}>Proceed to Pay</button>
	</div>
  )
}

export default PaymentMethod
