import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { OptionType, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions, defaultArticleState } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import React, { useEffect, useRef, useCallback } from 'react';

interface ArticleParamsFormProps {
  currentArticleState: typeof defaultArticleState;
  setCurrentArticleState: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
  setAppliedStyles: React.Dispatch<React.SetStateAction<typeof defaultArticleState>>;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ currentArticleState, setCurrentArticleState, setAppliedStyles }) => {
  const [isFormOpen, setFormOpen] = React.useState<boolean>(false);
  const formRef = useRef<HTMLDivElement>(null);

  const closeForm = useCallback(() => setFormOpen(false), []);

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      closeForm();
    }
  };

  const handleEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeForm();
    }
  }, [closeForm]);

  useEffect(() => {
    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isFormOpen, handleEscape]);

  const handleChange = (field: keyof typeof defaultArticleState) => (value: OptionType) => {
    setCurrentArticleState((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setAppliedStyles(currentArticleState);
  };

  const handleFormReset = () => {
    setCurrentArticleState(defaultArticleState);
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
        ref={formRef}
        className={`${styles.container} ${isFormOpen ? styles.container_open : ''}`}
        style={{ overflow: 'hidden' }}
      >
        <form className={styles.form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
          <Select
            selected={currentArticleState.fontFamilyOption}
            onChange={handleChange('fontFamilyOption')}
            options={fontFamilyOptions}
            title="Выберите шрифт"
            placeholder="Выберите шрифт"
          />
          <RadioGroup
            name="fontSize"
            options={fontSizeOptions}
            selected={currentArticleState.fontSizeOption || { title: '', value: '', className: '' }}
            onChange={handleChange('fontSizeOption')}
            title="Размер шрифта"
          />
          <Select
            selected={currentArticleState.fontColor}
            onChange={handleChange('fontColor')}
            options={fontColors}
            title="Цвет шрифта"
            placeholder="Цвет шрифта"
          />
          <Separator />
          <Select
            selected={currentArticleState.backgroundColor}
            onChange={handleChange('backgroundColor')}
            options={backgroundColors}
            title="Цвет фона"
            placeholder="Цвет фона"
          />
          <Select
            selected={currentArticleState.contentWidth}
            onChange={handleChange('contentWidth')}
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
