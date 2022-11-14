import React from 'react';
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

export default class TextAttributes extends React.PureComponent<Props, State> {
  render() {
    const { cssCategory, attributeData, selection, selectAttributeHandler } =
      this.props;

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
                selectAttributeHandler(element.id);
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
