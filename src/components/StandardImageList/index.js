import React, { useState } from 'react'
import ImageList from '@mui/material/ImageList'
import InputLabel from '@mui/material/InputLabel'
import ImageListItem from '@mui/material/ImageListItem'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '../../asset/icon/Delete.svg'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import './style.css'
import { useTranslation } from 'react-i18next'

export default function StandardImageList({ imagesData, handleDelete, isVisible=false }) {
  const { t } = useTranslation()
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
    setOpenDialog(true)
  }

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < imagesData.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  const handlePrevImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  return (
    <div>
      {imagesData.length === 0 ? (
        <InputLabel className="inputLabel-handbook-view">{t('noData')}</InputLabel>
      ) : (
        <ImageList className="customer-handbook-image-list" sx={{ width: 365 }} cols={4} rowHeight={100}>
          {imagesData.map((item, index) => (
            <ImageListItem className="customer-handbook-image-item" key={index} onClick={() => handleImageClick(index)}>
              {isVisible && (
                <IconButton
                  style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      padding: '4px',
                      color: "#FFFFFF",
                  }}
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(index)
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <img className="customer-handbook-image" src={item.path} loading="lazy" alt={`Image ${index}`} />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          {selectedImageIndex !== null && (
            <div style={{ position: 'relative' }}>
              <img
                className="customer-handbook-image-detail"
                src={imagesData[selectedImageIndex].path}
                alt={`Image ${selectedImageIndex}`}
              />
              <IconButton className="previous-button" aria-label="previous" onClick={handlePrevImage}>
                <ChevronLeftIcon style={{ color: 'black' }} />
              </IconButton>
              <IconButton className="next-button" aria-label="next" onClick={handleNextImage}>
                <ChevronRightIcon style={{ color: 'black' }} />
              </IconButton>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
