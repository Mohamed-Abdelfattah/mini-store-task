import React, { Component } from 'react';
import classes from './SwatchAttributes.module.css';

type Props = {
  attributeData: {
    name: string;
    items: { id: string; value: string; displayValue: string }[];
  };
  selection?: any;
  selectAttributeHandler: (id: string) => void;
};

type State = { selected: { id?: string | null } };

export default class SwatchAttributes extends Component<Props, State> {
  //   state = { selected: { id: this.props.selection[this.props.attributeData.name] } };

  selectAttributeHandler = (newID: string) => {
    console.log(newID);
    this.setState({ selected: { id: newID } });
  };

  render() {
    console.log(
      '---rendering swatch---',
      this.props.attributeData.items,
      this.state
    );
    return (
      <div>
        <label>{this.props.attributeData.name.toUpperCase()}:</label>
        <div className={classes.container}>
          {this.props.attributeData.items.map((element) => (
            <div key={element.id} className={classes.dd}>
              <div
                className={`${classes.outerBox} ${
                  this.props.selection[this.props.attributeData.name] ===
                  element.id
                    ? classes.selected
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
                  className={classes.box}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
