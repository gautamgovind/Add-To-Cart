import React, {Component} from "react";
import "./index.css";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItemCount: 0,
            cartList: props.currentList,
            cartItem: 0
        }
    }

    addItem = (product)=>{
        let newCartList = [...this.state.cartList];
        let dataArr =[];
        !newCartList.length && newCartList.push(product);
        if (newCartList.includes(product)) {
            newCartList.map((item) => {
                if (item["id"] ===  product.id ) {
                    item["cartQuantity"] +=1;
                }
            })
        } else {
            product.cartQuantity = 1;
            newCartList.push(product);
        }
        this.setState({
            cartList: newCartList
        });
        this.props.updateList(newCartList);        
    }

    removeItem = (product)=>{
        const newCartList = [...this.state.cartList];
        newCartList.map((item, i)=>{
            if (item["id"] ===  product.id ) {
                item["cartQuantity"] -=1;
            } 
            if(item["cartQuantity"]===0) {
                newCartList.splice(i,1);
            }
        })
        this.setState({
            cartList: newCartList
        });
        this.props.updateList(newCartList);
    }

    render() {
        return (
            <div className="layout-row wrap justify-content-center flex-70 app-product-list">
                {this.props.products.map((product, i) => {
                    return (
                        <section className="w-30"
                                 data-testid={'product-item-' + i}
                                 key={product.id}>
                            <div className="card ma-16">
                                <img alt="Your Cart" src={product.image}
                                     className="d-inline-block align-top product-image"/>
                                <div className="card-text pa-4">
                                    <h5 className="ma-0 text-center">{product.name}</h5>
                                    <p className="ma-0 mt-8 text-center">${product.price}</p>
                                </div>
                                <div className="card-actions justify-content-center pa-4">
                                    {product.cartQuantity===0 &&
                                    <button className="x-small outlined" data-testid="btn-item-add" 
                                        onClick={()=>this.addItem(product)} >
                                        Add To Cart
                                    </button>
                                    }
                                    {product.cartQuantity!==0 && 
                                    <div className="layout-row justify-content-between align-items-center">
                                        <button className="x-small icon-only outlined"
                                                data-testid="btn-quantity-subtract"
                                                onClick={()=>this.removeItem(product)} >
                                            <i className="material-icons">remove</i>
                                        </button>

                                        <input type="number"
                                               disabled
                                               value={product.cartQuantity}
                                               className="cart-quantity" data-testid="cart-quantity"/>

                                        <button className="x-small icon-only outlined"
                                                data-testid="btn-quantity-add"
                                                onClick={()=>this.addItem(product)} >
                                            <i className="material-icons">add</i>
                                        </button>
                                    </div>
                                    }
                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>

        );
    }
}

export const UpdateMode = {
    ADD: 1,
    SUBTRACT: 0
}
