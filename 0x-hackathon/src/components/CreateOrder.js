import React from 'react';
import DateTime from 'react-datetime';
import { createOrderFunc ,sendDataToContract} from '../utils';

export default class CreateOrder extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmitOrder = this.handleSubmitOrder.bind(this);
        this.handleBaseTokenChange = this.handleBaseTokenChange.bind(this);
        this.dateChange = this.dateChange.bind(this);

        this.state = {
            baseTokenValue: 'ZRX',
            quoteTokenValue: 'WETH',
            unixDate: undefined
        }
    }

    handleBaseTokenChange(event) {
        this.setState({ baseTokenValue: event.target.value });
    }

    handleQuoteTokenChange(event) {
        this.setState({ quoteTokenValue: event.target.value });
    }

    validDate(current) {
        var yesterday = DateTime.moment().subtract(1, 'day');
        return current.isAfter(yesterday);
    }

    dateChange(date) {
        console.log(date.unix());
        this.setState({
            unixDate:date.unix()
        })
    }

    async handleSubmitOrder(e) {
        e.preventDefault();
        const strikePrie = e.target.elements.strikePrice.value.trim();
        const numOfTokens = e.target.elements.numofbasetokens.value.trim();
        const premium = e.target.elements.premium.value.trim();
        // const optionTokenAddress =  await 
        createOrderFunc(this.state.baseTokenValue,this.state.quoteTokenValue,strikePrie,numOfTokens,premium,this.state.unixDate);   
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmitOrder}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Base Token</label>
                            <select value={this.state.baseTokenValue} onChange={this.handleBaseTokenChange} name="baseToken" className="form-control form-control-lg dropdown">
                                <option value="ZRX">ZRX</option>
                                <option value="WETH">WETH</option>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label>Quote Token</label>
                            <select value={this.state.quoteTokenValue} onChange={this.handleQuoteTokenChange} name="baseToken" className="form-control form-control-lg dropdown">
                                <option value="WETH">WETH</option>
                                <option value="ZRX">ZRX</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="strikePrice">Strike Price</label>
                        <input type="number" className="form-control form-control-lg" name="strikePrice" placeholder="Price in quote token"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="numOfTokens">Number of base tokens</label>
                        <input type="number" className="form-control form-control-lg" name="numofbasetokens" placeholder="Base tokens"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="premium">Premium</label>
                        <input type="number" className="form-control form-control-lg" name="premium" placeholder="Premium Amount"></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expiryTime">Expiry Date and Time</label>
                        <DateTime isValidDate={this.validDate} onChange={this.dateChange} />
                    </div>
                    <button className="button btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}