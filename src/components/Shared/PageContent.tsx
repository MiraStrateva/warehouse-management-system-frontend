import React, { PropsWithChildren } from 'react';
import classes from './PageContent.module.css';

const PageContent: React.FC<PropsWithChildren<{title: string}>> = (props) => {
  return (
    <div className={classes.content}>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
}

export default PageContent;
