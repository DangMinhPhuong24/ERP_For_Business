import React, {useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { Button } from '@mui/base';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

    useEffect(() => {
        handleChange('vi');
    }, []);

  const handleChange = (lang) => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang).then(() => {
        localStorage.setItem('react-app-lang', lang);
      });
    }
  };

  return (
    <Box display="none" alignItems="center">
        <Button
            className={`btn ${i18n.language === 'vi' ? 'btn-active' : 'btn-inactive'}`}
            onClick={() => handleChange('vi')}
        >
            Vie
        </Button>
        <Button
            className={`btn ${i18n.language === 'en' ? 'btn-active' : 'btn-inactive'}`}
            onClick={() => handleChange('en')}
        >
            Eng
        </Button>
    </Box>
  );
}

export default LanguageSwitcher;
