import React from 'react';
import { connect } from 'react-redux';
import {toDecimal} from '../utils/common';
import {REMOVE_PRODUCT, SET_CART} from '../actions/cartActions';
import _ from 'lodash';

class Cart extends React.Component {

   get groupByProductName() {
      const d = _.chain(this.props.cart)
      .groupBy("name")
      .map((value, key) => ({ name: key, price:value[0].price, products: value }))
      .value();
      return d;
    }

    removeClick = (e, p) => {
      e.stopPropagation(); //stop init adding item
      this.props.removeProduct(p);
    }

    componentDidUpdate() {
      localStorage.setItem('cart', JSON.stringify(this.props.cart));
    }

    render() {
        return (
            <div className="container">
                <h4 className="align-content-center">Cart</h4>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Total</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.groupByProductName.map((p, i) => {
                        return (
                          <tr key={i}>
                          <th scope="row">{i}</th>
                          <td>{p.name}</td>
                          <td>{toDecimal(p.price)}</td>
                          <td>{p.products.length}</td>
                          <td>{toDecimal(_.sumBy(p.products,'price'))}</td>
                          <td> <button className="btn btn-sm" onClick={(e) => this.removeClick(e,p)}>Remove</button></td>
                        </tr>
                        )
                      })
                    }
                  <tr>
                    <td colSpan="5"><div className="float-right">Total:</div></td>
                    <td>{toDecimal(_.sumBy(this.props.cart,'price'))}</td>
                  </tr>
                    </tbody>
                  </table>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return {...state}
}

const mapDispatchToProps = dispatch => {
  return {
    removeProduct: (p) =>{ 
      dispatch({ type: REMOVE_PRODUCT, product: p })
    },
    setCart:(cart)=>{
      dispatch({ type: SET_CART, cart })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);