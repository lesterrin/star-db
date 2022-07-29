import React, { Component } from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import ErrorButton from "../error-button";

const Record = ({item, field, label}) =>{

    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
}

export default class ItemDetails extends Component {

    swapiService = new SwapiService();

    state = {
        item: null,
        image: null,
        //loading: true,
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if( this.props.itemId!==prevProps.itemId ||
            this.props.getData!==prevProps.getData ||
            this.props.getImageUrl!==prevProps.getImageUrl){
            this.updateItem();
        }
    }

    updateItem(){

        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId){
            return; //разобраться в синтаксисе
        }

        getData(itemId)
            .then((item)=>{
                this.setState({
                    item,
                    image: getImageUrl(item)/*,
                    loading:false*/
                });
            });
    }

    render() {
        const { item, image } = this.state;
        if (!item) {
            return <span>Select a item from a list</span>;
        }

        const {  name } = item;

        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}
                     alt="item"/>

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        {
                            React.Children.map(this.props.children,(child, idx) =>{
                                return React.cloneElement(child,{ item });
                            })
                        }
                    </ul>
                    <ErrorButton />
                </div>
            </div>
        );
    }
}
