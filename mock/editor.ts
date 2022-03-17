import { success } from './_utils/result';

const html = `
      <a href='https://www.baidu.com'>ksjdkHi</a>
      #FB5151
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
