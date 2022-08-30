import React, { Component } from 'react';
import classes from './TextAttributes.module.css';

type Props = {
  attributeData: {
    name: string;
    items: { id: string; value: string; displayValue: string }[];
  };
  selection?: any;
  selectAttributeHandler: (id: string) => void;
};

type State = {};

export default class TextAttributes extends Component<Props, State> {
  render() {
    return (
      <div>
        <label>{this.props.attributeData.name.toUpperCase()}:</label>
        <div className={classes.container}>
          {this.props.attributeData.items.map((element) => (
            <div
              key={element.id}
              className={`${classes.box} ${
                this.props.selection[this.props.attributeData.name] ===
                element.id
                  ? classes.selected
                  : ''
              }`}
              onClick={() => {
                this.props.selectAttributeHandler(element.id);
              }}
            >
              {element.displayValue}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
