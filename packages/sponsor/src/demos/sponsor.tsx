import React from 'react';
import GinSponsor from '@hocgin/gin-sponsor';

export default () => {
  let styles = {
    width: '100%',
    margin: '0 auto',
    'text-align': 'center',
  };

  return (
    <div style={styles}>
      <GinSponsor />
    </div>
  );
};
