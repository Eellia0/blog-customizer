import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { OptionType, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState, FontFamiliesClasses } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useState } from 'react';

export const ArticleParamsForm = () => {
  const [isFormOpen, setFormOpen] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<OptionType>(defaultArticleState.fontFamilyOption);
  const [selectedFontColor, setSelectedFontColor] = useState<OptionType>(defaultArticleState.fontColor);
  const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<OptionType>(defaultArticleState.backgroundColor);
  const [selectedContentWidth, setSelectedContentWidth] = useState<OptionType>(defaultArticleState.contentWidth);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const htmlElement = document.querySelector('html');
    const mainElement = document.querySelector('main');
    if (htmlElement && mainElement) {
      mainElement.style.setProperty('--font-size', selectedFontSize.value);
      mainElement.style.setProperty('--font-family', selectedFont.value);
      mainElement.style.setProperty('--font-color', selectedFontColor.value);
      mainElement.style.setProperty('--container-width', selectedContentWidth.value);
      mainElement.style.maxWidth = selectedContentWidth.value;
      mainElement.style.margin = '0 auto';
      mainElement.style.backgroundColor = selectedBackgroundColor.value;
      htmlElement.style.backgroundColor = selectedBackgroundColor.value;
    }
  };

  const handleFormReset = () => {
    const htmlElement = document.querySelector('html');
    const mainElement = document.querySelector('main');
    if (htmlElement && mainElement) {
      mainElement.style.removeProperty('--font-size');
      mainElement.style.removeProperty('--font-family');
      mainElement.style.removeProperty('--font-color');
      mainElement.style.removeProperty('--container-width');
      mainElement.style.maxWidth = '';
      mainElement.style.margin = '';
      mainElement.style.backgroundColor = '';
      htmlElement.style.backgroundColor = '';
    }
    setSelectedFont(defaultArticleState.fontFamilyOption);
    setSelectedFontColor(defaultArticleState.fontColor);
    setSelectedFontSize(defaultArticleState.fontSizeOption);
    setSelectedBackgroundColor(defaultArticleState.backgroundColor);
    setSelectedContentWidth(defaultArticleState.contentWidth);
  };

  return (
    <>
      <ArrowButton
        isOpen={isFormOpen}
        onClick={() => {
          setFormOpen(!isFormOpen);
        }}
      />
      <aside
        className={`${styles.container} ${isFormOpen ? styles.container_open : ''}`}
        style={{ overflow: 'hidden' }}
      >
        <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
          <Select
            selected={selectedFont}
            onChange={setSelectedFont}
            options={fontFamilyOptions}
            title="Выберите шрифт"
            placeholder="Выберите шрифт"
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={selectedFontSize || { title: '', value: '', className: '' }}
            onChange={setSelectedFontSize}
            title="Размер шрифта"
          />
          <Select
            selected={selectedFontColor}
            onChange={setSelectedFontColor}
            options={fontColors}
            title="Цвет шрифта"
            placeholder="Цвет шрифта"
          />
          <Separator />
          <Select
            selected={selectedBackgroundColor}
            onChange={setSelectedBackgroundColor}
            options={backgroundColors}
            title="Цвет фона"
            placeholder="Цвет фона"
          />
          <Select
            selected={selectedContentWidth}
            onChange={setSelectedContentWidth}
            options={contentWidthArr}
            title="Ширина контента"
            placeholder="Ширина контента"
          />
          <div className={styles.bottomContainer}>
            <Button title='Сбросить' htmlType='reset' type='clear' />
            <Button title='Применить' htmlType='submit' type='apply' />
          </div>
        </form>
      </aside>
    </>
  );
};
