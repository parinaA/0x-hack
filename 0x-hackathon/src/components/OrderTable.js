import React from 'react';
import { timeConverter } from '../utils';

export default class OrderTable extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <tr>
                <th scope="row">{this.props.index+1 }</th>
                <td>{this.props.record.order.baseToken}</td>
                <td>{this.props.record.order.quoteToken}</td>
                <td>{this.props.record.order.strikePrice}</td>
                <td>{timeConverter(this.props.record.order.expirationTimeSeconds)}</td>
                <td>{this.props.record.order.numberOfBaseToken}</td>
                <td>{this.props.record.order.premium}</td>
            </tr>
        )
    }
}