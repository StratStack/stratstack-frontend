import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import cardsStyle from 'assets/jss/material-kit-pro-react/views/presentationSections/cardsStyle.js';

import cardsTest from 'assets/img/assets-for-demo/card2.png';

const useStyles = makeStyles(cardsStyle);

export default function SectionCards() {
  const classes = useStyles();
  return (
    <div className={classNames(classes.section, classes.sectionDark)}>
      <div className={classes.container}>
        <GridContainer justify='center'>
          <GridItem md={7} sm={7}>
            <div className={classes.imageContainer}>
              <img src={cardsTest} alt='views' />
            </div>
          </GridItem>
          <GridItem md={4} sm={5} className={classes.mlAuto}>
            <div className={classes.sectionDescription}>
              <h3 className={classes.title}>An online local community</h3>
              <h6 className={classes.description}>
                We make sure your community finds you
              </h6>
              <h5 className={classes.description}>
                We understand that you're worried about the future of your
                business and we are here to help. We build online communities to
                help you build stronger connections with your customers.
              </h5>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
