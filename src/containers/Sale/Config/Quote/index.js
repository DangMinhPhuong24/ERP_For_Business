import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import QuoteModal from '../../../../components/Modal/Config/Quote'
import QuoteTable from '../../../../components/Table/ConfigTable/Quote/index'
import colors from '../../../../constants/colors'
import {
  getListProductAction,
  getQuoteListAction,
  removeMessageErrorAction,
  updateQuoteAction
} from '../../../../redux/config/config.actions'
import {
  errorsMessageUpdateQuoteState,
  productListState,
  quoteListState,
  totalPagesQuoteState,
  updateQuoteSuccessFlagState
} from '../../../../redux/config/config.selectors'
import SearchBar from '../../../../components/Buttons/Search'

function QuotePage() {
  const { t } = useTranslation()
  const listQuote = useSelector(quoteListState)
  const totalPages = useSelector(totalPagesQuoteState)
  const productData = useSelector(productListState)
  const updateQuoteSuccessFlag = useSelector(updateQuoteSuccessFlagState)
  const errorsMessageUpdateQuote = useSelector(errorsMessageUpdateQuoteState)
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPageDebtAge, setCurrentPageDebtAge] = useState(1)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getQuoteListAction())
    dispatch(getListProductAction())
  }, [dispatch])

  useEffect(() => {
    if (updateQuoteSuccessFlag) {
      setIsOpenUpdateModal(false)
      removeMessageError()
      refreshData()
    }
  }, [updateQuoteSuccessFlag])

  const refreshData = useCallback((params) => {
    setLoading(true)
    setCurrentPageDebtAge(1)
    dispatch(getQuoteListAction({ params })).then(() => {
      setLoading(false)
    })
    dispatch(getListProductAction())
  }, [])

  const updateQuote = useCallback((value) => {
    dispatch(updateQuoteAction(value))
  }, [])

  const handleCloseUpdateModal = useCallback(() => {
    setIsOpenUpdateModal(false)
    removeMessageError()
  }, [])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handleDetailQuote = useCallback((quoteData) => {
    setSelectedQuote(quoteData)
    setIsOpenUpdateModal(true)
  }, [])

  const handlePageChange = (event, page) => {
    setCurrentPageDebtAge(page)
    setLoading(true)
    if (searchValue) {
      dispatch(getQuoteListAction({ search_quotation: searchValue, page })).then(() => {
        setLoading(false)
      })
    } else {
      dispatch(getQuoteListAction({ page })).then(() => {
        setLoading(false)
      })
    }
  }

  const handleSearch = () => {
    setLoading(true)
    dispatch(getQuoteListAction({ search_quotation: searchValue })).then(() => {
      setLoading(false)
    })
  }

  const handleClearSearch = useCallback(() => {
    setSearchValue('')
    setLoading(true)
    dispatch(getQuoteListAction({ search_quotation: '' })).then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <Box
      sx={{
        bgcolor: colors.lilywhiteColor,
        borderRadius: '10px',
        padding: '10px',
        position: 'relative',
        width: 'auto',
        height: '451px'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '32px', color: colors.indigoColor }}>
            {t('quotes')}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <SearchBar
            searchValue={searchValue}
            handleOnChangeValue={(e) => setSearchValue(e.target.value)}
            handleSearch={handleSearch}
            handleClearSearch={handleClearSearch}
            placeholderText="enterProductNameAndProductCode"
            buttonText="find"
          />
        </Box>
      </Box>
      <div style={{ marginTop: '5px' }}>
        <QuoteTable
          data={listQuote}
          handlerUpdate={handleDetailQuote}
          loading={loading}
          handlePageChange={handlePageChange}
          currentPagePagination={currentPageDebtAge}
          totalPages={totalPages}
        />
      </div>
      {isOpenUpdateModal && (
        <QuoteModal
          nameTitle={t('updateQuotation')}
          handleDetailQuote={handleDetailQuote}
          dataProduct={productData}
          handleUpdateQuote={updateQuote}
          errorsMessage={errorsMessageUpdateQuote}
          successFlag={updateQuoteSuccessFlag}
          closeModalAction={() => {
            setSelectedQuote(null)
          }}
          quoteData={selectedQuote}
          isEdit={true}
          open={isOpenUpdateModal}
          handleClose={handleCloseUpdateModal}
        />
      )}
    </Box>
  )
}

export default QuotePage
