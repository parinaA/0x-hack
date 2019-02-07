import React from 'react';
import axios from 'axios';
import Header from './Header';
import OrderTable from './OrderTable';

export default class OrderBook extends React.Component{
    constructor(props) {
		super(props)
		this.state = {
			data: undefined
        }
		
	}

    componentDidMount() {
        axios.get('http://10.60.58.211:3000/v2/orders').then(response => {
            console.log(response.data);
            this.setState ({
                data:response.data
            })
        })
    }
    
    render()
    {
        return(
            <div>
            <Header/>
            <table className="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Base Token</th>
                <th scopr="col">Quote Token</th>
                <th scope="col">Strike Price</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">No. of Base Tokens</th>
                <th scope="col">Premium</th>
                </tr>
            </thead>
            <tbody>
            {
                this.state.data && this.state.data.records.map((record, index ) => (
                        <OrderTable key={index} record={record} index={index} />
                )
                )
            }
            </tbody>
            </table>
            </div>
        )
    }
}