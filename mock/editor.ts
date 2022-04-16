import { success } from './_utils/result';

export const html = `
    <h1>这是一份报告 H1</h1>
    <h2>👋系统分析 H2</h2>
    <h3>👋系统分析 H3</h3>
    <h4>👋系统分析 H4</h4>
    <h5>👋系统分析 H5</h5>
    <h6>👋系统分析 H6</h6>
    <p>入律划者管年新采消基使统。好清路形动效改内却教来水好。格连话区全多三以着达五地细。节现七价即将强很事调及然。劳用明满管强温类后关圆别保有。一始江指报分派清于速况温适水。马等离持农历照却打节包做快等话同。</p>
    <p>力记自内音边江现列大着近已油空际么不。接酸加根走已加公天细北方万教层机。常见北何百克技采往果性查本但根件。表车期把业选石入消四个其非家。到示备界已不完种大便太究光。律市最率当写关何目音四加报决相没。因节光引至什真开度问族广再十都问。</p>
    <p>要小员支取给金称位是称思周马解。土加话再步技圆技都教来同高定已由。克备备史队进清严年和只大去状满本。作南管统且总一主律完农圆米能改共。效只型龙更于连活而形比商府变应龙选年。</p>
          <blockquote>
            期们则合备只办分发风信头金几过时铁。示报市分周在包我日却上亲应去且人院。
            <br />
            — Mom
          </blockquote>
    <p>空书代导现低文边之片报日原积。开此自动龙又压实历龙光复心连效方。</p>
    <h2>给老场圆正行号复照特九市口。</h2>
    <p>开却划因须学为新经八你备影。步得位品六政料学验收从值。你各数等层时同今且并流常而个电院装。<a href='https://www.baidu.com'>引用地址</a></p>
    <a href='https://www.baidu.com'>文章地址</a>
     <p>推荐颜色 #FB5151</p>
     <ul data-type='taskList'><li data-checked='false'><label contenteditable='false'><input type='checkbox'><span></span></label><div><p>任务1</p></div></li><li data-checked='false'><label contenteditable='false'><input type='checkbox'><span></span></label><div><p>任务2</p></div></li></ul>
      <p><img src='https://source.unsplash.com/8xznAGy4HcY/800x400' width='100' height='50'/></p>
        <table style='width:100%'>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
      <th>Age</th>
    </tr>
    <tr>
      <td>Jill</td>
      <td>Smith</td>
      <td>50</td>
    </tr>
    <tr>
      <td>Eve</td>
      <td>Jackson</td>
      <td>94</td>
    </tr>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>80</td>
    </tr>
  </table>
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class='language-css'>body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `;
// http://mockjs.com/examples.html
export default {
  'GET /api/rcm/doc/:id': (req: any, res: any) =>
    res.json(
      success({
        id: req.params.id,
        description: '测试文档',
        content: html,
      }),
    ),
  'GET /api/rcm/doc/:id/content': (req: any, res: any) =>
    res.json(
      success({
        id: req.params.id,
        contentId: 666,
        description: '测试文档',
        content: html,
      }),
    ),
  'POST /api/rcm/doc/:id/content': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/:id/publish': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/:id/history': (req: any, res: any) =>
    res.json(
      success([
        {
          id: req.params.id,
          draft: true,
          title: '测试版本名称',
          createdAt: '测试文档内容',
        },
        {
          id: req.params.id,
          draft: false,
          title: '测试版本名称',
          createdAt: '测试文档内容',
        },
      ]),
    ),
  'POST /api/rcm/doc/:id/rollback': (req: any, res: any) => res.json(success()),
  'POST /api/rcm/doc/version/:contentId/name': (req: any, res: any) =>
    res.json(success()),
};
