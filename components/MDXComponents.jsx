import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const CodeBlock = ({ children, className }) => {
  // 从className中提取语言
  const language = className ? className.replace(/language-/, '') : '';
  
  return (
    <Highlight
      {...defaultProps}
      code={children.trim()}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px', borderRadius: '5px', overflow: 'auto' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span style={{ display: 'inline-block', width: '2em', userSelect: 'none', opacity: 0.5 }}>
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

const MDXComponents = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  // 其他MDX组件覆盖
};

export default MDXComponents;