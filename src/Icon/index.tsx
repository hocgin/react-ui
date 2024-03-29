import classnames from 'classnames';
import React from 'react';
import './style';

export default {
  Geist: ({ className }) => {
    return (
      <i className={classnames(className)}>
        <svg
          fill="none"
          shapeRendering="geometricPrecision"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          style={{ width: 15, height: 15 }}
        >
          <path d="M16.88 3.549L7.12 20.451"></path>
        </svg>
      </i>
    );
  },
  Arrow: ({ className, fill }) => {
    return (
      <i className={classnames(className)}>
        <svg aria-hidden="true" height="7" viewBox="0 0 6 6" width="7">
          <path
            d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
            fill={fill}
          ></path>
        </svg>
      </i>
    );
  },
  WeiboFilled: ({ className }) => (
    <i className={classnames(className)}>
      <svg
        width="18px"
        height="18px"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Sina Weibo icon</title>
        <path
          fill="currentColor"
          d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"
        />
      </svg>
    </i>
  ),
  GitHubFilled: ({ className }) => (
    <i className={classnames(className)}>
      <svg
        width="18px"
        height="18px"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>GitHub icon</title>
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    </i>
  ),
  HeartFilled: ({ className }) => (
    <i className={classnames(className)}>
      <svg
        width="16px"
        height="16px"
        role="img"
        viewBox="0 0 1205 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M602.435622 1023.943683C598.795944 1023.943683 595.131449 1022.95075 591.903993 1020.929079 47.519856 679.58468 5.380932 420.335577 2.465054 371.820963 0.82582 358.316528 0 345.270684 0 333.126883 0 149.439827 148.111451 0 330.140841 0 439.560038 0 541.067068 54.667767 602.306026 144.623896 663.56015 54.669143 765.093376 0 874.486378 0 1056.541963 0 1204.639627 149.439827 1204.639627 333.126883 1204.639627 344.838258 1203.955807 356.834703 1202.549572 369.803423 1200.340946 419.61257 1160.861473 675.83054 613.01826 1020.901537 609.792181 1022.938357 606.127689 1023.943683 602.435622 1023.943683ZM327.191473 242.513144 327.191473 236.782124C327.191473 211.325797 311.27445 189.453118 288.817787 180.695944 219.824883 195.615991 165.502589 249.936508 150.579953 318.928447 159.321083 341.343772 181.136255 357.308937 206.664661 357.308937L210.040872 357.308937C222.388624 302.009319 268.071576 257.714282 327.191473 242.513144L327.191473 242.513144Z"
        />
      </svg>
    </i>
  ),
  LikeFilled: ({ className }) => (
    <i className={classnames(className)}>
      <svg viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
        <g
          className={'Group'}
          fill="none"
          fillRule="evenodd"
          transform="translate(467 392)"
        >
          <path
            className={'heart'}
            d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
            fill="#AAB8C2"
          />
          <circle
            className={'mainCirc'}
            fill="#E2264D"
            opacity="0"
            cx="29.5"
            cy="29.5"
            r="1.5"
          />

          <g className={'grp7'} opacity="0" transform="translate(7 6)">
            <circle className={'oval1'} fill="#9CD8C3" cx="2" cy="6" r="2" />
            <circle className={'oval2'} fill="#8CE8C3" cx="5" cy="2" r="2" />
          </g>

          <g className={'grp6'} opacity="0" transform="translate(0 28)">
            <circle className={'oval1'} fill="#CC8EF5" cx="2" cy="7" r="2" />
            <circle className={'oval2'} fill="#91D2FA" cx="3" cy="2" r="2" />
          </g>

          <g className={'grp3'} opacity="0" transform="translate(52 28)">
            <circle className={'oval2'} fill="#9CD8C3" cx="2" cy="7" r="2" />
            <circle className={'oval1'} fill="#8CE8C3" cx="4" cy="2" r="2" />
          </g>

          <g className={'grp2'} opacity="0" transform="translate(44 6)">
            <circle className={'oval2'} fill="#CC8EF5" cx="5" cy="6" r="2" />
            <circle className={'oval1'} fill="#CC8EF5" cx="2" cy="2" r="2" />
          </g>

          <g className={'grp5'} opacity="0" transform="translate(14 50)">
            <circle className={'oval1'} fill="#91D2FA" cx="6" cy="5" r="2" />
            <circle className={'oval2'} fill="#91D2FA" cx="2" cy="2" r="2" />
          </g>

          <g className={'grp4'} opacity="0" transform="translate(35 50)">
            <circle className={'oval1'} fill="#F48EA7" cx="6" cy="5" r="2" />
            <circle className={'oval2'} fill="#F48EA7" cx="2" cy="2" r="2" />
          </g>

          <g className={'grp1'} opacity="0" transform="translate(24)">
            <circle className={'oval1'} fill="#9FC7FA" cx="2.5" cy="3" r="2" />
            <circle className={'oval2'} fill="#9FC7FA" cx="7.5" cy="2" r="2" />
          </g>
        </g>
      </svg>
    </i>
  ),
  TplFilled: ({ className }) => (
    <i className={classnames(className)}>{/*..*/}</i>
  ),
} as {
  WeiboFilled: React.FC<{ className?: string }>;
  GitHubFilled: React.FC<{ className?: string }>;
  HeartFilled: React.FC<{ className?: string }>;
  LikeFilled: React.FC<{ className?: string }>;
  TplFilled: React.FC<{ className?: string }>;
  Geist: React.FC<{ className?: string }>;
  Arrow: React.FC<{ className?: string; fill?: string }>;
};
