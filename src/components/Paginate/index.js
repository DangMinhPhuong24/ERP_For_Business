// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack'
import { PaginationItem } from '@mui/material'
import Button from '@mui/material/Button'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import { useTranslation } from 'react-i18next'
import colors from '../../constants/colors'

function PaginationComponent({ totalPages, handlePageChange, reset, isShowMobile, currentPage }) {
  const { t } = useTranslation()
  const [currentPageHover, setCurrentPageHover] = useState(1)

  const handleChange = (event, page) => {
    setCurrentPageHover(page)
    handlePageChange(event, page)
  }

  useEffect(() => {
    setCurrentPageHover(1)
  }, [totalPages, reset])

  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ display: !totalPages || totalPages <= 1 ? 'none' : 'flex' }}
    >
      {isShowMobile ? (
        <Pagination
          siblingCount={0}
          boundaryCount={0}
          count={totalPages}
          page={currentPageHover}
          onChange={handleChange}
          size="large"
          renderItem={(item) => (
            <PaginationItem
              sx={{ color: colors.sapphireblueColor }}
              component={(props) => (
                <Button
                  sx={{ textTransform: 'none' }}
                  {...props}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick()
                    }
                  }}
                >
                  {item.type === 'previous' ? (
                    <>
                      <NavigateBeforeOutlinedIcon />
                      <span>{t('previousButton')}</span>
                    </>
                  ) : item.type === 'next' ? (
                    <>
                      <span>{t('nextButton')}</span>
                      <NavigateNextOutlinedIcon />
                    </>
                  ) : (
                    item.page
                  )}
                </Button>
              )}
              {...item}
            />
          )}
        />
      ) : (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChange}
          size="large"
          renderItem={(item) => (
            <PaginationItem
              sx={{ color: colors.sapphireblueColor }}
              component={(props) => (
                <Button
                  sx={{ textTransform: 'none' }}
                  {...props}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick()
                    }
                  }}
                >
                  {item.type === 'previous' ? (
                    <>
                      <NavigateBeforeOutlinedIcon />
                      <span>{t('previousButton')}</span>
                    </>
                  ) : item.type === 'next' ? (
                    <>
                      <span>{t('nextButton')}</span>
                      <NavigateNextOutlinedIcon />
                    </>
                  ) : (
                    item.page
                  )}
                </Button>
              )}
              {...item}
            />
          )}
        />
      )}
    </Stack>
  )
}

export default PaginationComponent
