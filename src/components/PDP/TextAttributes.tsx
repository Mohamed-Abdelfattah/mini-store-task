import React, { Component } from 'react';
import classes from './TextAttributes.module.css';

type Props = {
  attributeData: {
    name: string;
    items: { id: string; value: string; displayValue: string }[];
  };
  selection?: any;
  selectAttributeHandler: (id: string) => void;
  cssCategory?: string;
};

type State = {};

export default class TextAttributes extends Component<Props, State> {
  render() {
    const { cssCategory, attributeData, selection } = this.props;
    console.log('-----@@@ cssCategory =', cssCategory);

    return (
      <div className={classes[cssCategory + '-general']}>
        <label>{attributeData.name.toUpperCase()}:</label>
        <div className={classes[cssCategory + '-container']}>
          {attributeData.items.map((element) => (
            <div
              key={element.id}
              className={`${classes[cssCategory + '-box']} ${
                selection[attributeData.name] === element.id
                  ? classes[cssCategory + '-selected']
                  : ''
              }`}
              onClick={() => {
                this.props.selectAttributeHandler(element.id);
              }}
            >
              {element.value}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
