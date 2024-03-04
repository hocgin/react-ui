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

      <h1>Demo(en-US):</h1>
      <div>
        Recently I had occasion to implement something similar with an SVG
        Element. My goal was for a certain circumstance to display an SVG line
        on the HTML page. I did this by creating an SVG line on my HTML page
        with a class “invisible” The invisibility I set in css like so
        .invisible Easy peasy, I thought I could use my usual strategy (see
        above) to wipe out the invisible class and therefore show the SVG line.
        In other words, I thought this would work:
      </div>
      <h1>Demo(zh-CN):</h1>
      <div>
        最近，我有机会用SVG实现类似的东西 元素。我的目标是在某种情况下显示 SVG
        线 在 HTML 页面上。我通过在我的 HTML 页面上创建一个 SVG 行来做到这一点
        用一个类“invisible”我在css中设置的不可见性是这样的 .invisible
        简单易行，我以为我可以使用我通常的策略（参见
        above）来擦除不可见的类，从而显示 SVG 行。 换句话说，我认为这会起作用：
      </div>
    </div>
  );
};
