import Prismjs from 'prismjs';

export class PrismjsLowlight {
  listLanguages(): string[] {
    return Object.keys(Prismjs.languages);
  }

  highlight(language: string, textContent: string): any {
    let tokens = Prismjs.tokenize(textContent, Prismjs.languages[language]);
    console.log(tokens);
    return {
      children: tokens.map((item: any) => {
        if (!item?.content) {
          return { properties: { className: [] }, value: item };
        }
        let { content, type } = item;
        return { properties: { className: ['token', type] }, value: content };
      }),
    };
  }

  highlightAuto(textContent: string): any {
    return this.highlight('javascript', textContent);
  }
}
