import React, { useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const App = () => {
  const [currentArticleState, setCurrentArticleState] = useState(defaultArticleState);
  const [appliedStyles, setAppliedStyles] = useState(defaultArticleState);

  return (
    <main
      className={clsx(styles.main)}
      style={
        {
          '--font-family': appliedStyles.fontFamilyOption.value,
          '--font-size': appliedStyles.fontSizeOption.value,
          '--font-color': appliedStyles.fontColor.value,
          '--container-width': appliedStyles.contentWidth.value,
          '--bg-color': appliedStyles.backgroundColor.value,
        } as React.CSSProperties
      }>
      <ArticleParamsForm 
        currentArticleState={currentArticleState}
        setCurrentArticleState={setCurrentArticleState}
        setAppliedStyles={setAppliedStyles}
      />
      <Article />
    </main>
  );
};

export default App;
