import React, { Component } from 'react';
import classes from './SwatchAttributes.module.css';

type Props = {
  attributeData: {
    name: string;
    items: { id: string; value: string; displayValue: string }[];
  };
  selection?: any;
  selectAttributeHandler: (id: string) => void;
  cssCategory?: string;
};

type State = { selected: { id?: string | null } };

export default class SwatchAttributes extends Component<Props, State> {
  //   state = { selected: { id: this.props.selection[this.props.attributeData.name] } };

  selectAttributeHandler = (newID: string) => {
    // console.log(newID);
    this.setState({ selected: { id: newID } });
  };

  render() {
    const { cssCategory, attributeData, selection } = this.props;

    return (
      <div className={classes[cssCategory + '-general']}>
        <label>{attributeData.name.toUpperCase()}:</label>
        <div className={classes[cssCategory + '-container']}>
          {attributeData.items.map((element) => (
            <div key={element.id} className={classes[cssCategory + '-dd']}>
              <div
                className={`${classes[cssCategory + '-outerBox']} ${
                  selection[attributeData.name] === element.id
                    ? classes[cssCategory + '-selected']
                    : ''
                }`}
                onClick={() => {
                  this.props.selectAttributeHandler(element.id);
                }}
              >
                <div
                  id={element.id}
                  style={{
                    backgroundColor: element.value,
                    border:
                      element.displayValue === 'White'
                        ? '1px solid black'
                        : 'none',
                  }}
                  className={classes[cssCategory + '-box']}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
