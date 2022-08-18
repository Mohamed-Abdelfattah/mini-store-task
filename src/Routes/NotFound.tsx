import React from 'react';

type NotFoundProps = {
  children?: React.ReactNode;
};

export default class NotFound extends React.Component<NotFoundProps> {
  render(): React.ReactNode {
    return (
      <>
        <p>There's nothing here</p>;{this.props.children}
        <p>you will be redirected in 3</p>
      </>
    );
  }
}
