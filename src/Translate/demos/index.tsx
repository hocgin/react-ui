/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Translate } from '@hocgin/ui';

export default () => {
  return (
    <div>
      <Translate />

      <h1>Demo:</h1>
      <div>
        Recently I had occasion to implement something similar with an SVG
        Element. My goal was for a certain circumstance to display an SVG line
        on the HTML page. I did this by creating an SVG line on my HTML page
        with a class “invisible” The invisibility I set in css like so
        .invisible Easy peasy, I thought I could use my usual strategy (see
        above) to wipe out the invisible class and therefore show the SVG line.
        In other words, I thought this would work:
      </div>
    </div>
  );
};
