// @ts-nocheck
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
import LinearProgress from '@mui/material/LinearProgress'
import Typography from "@mui/material/Typography"
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import '../StandardImageList/style.css'

export default function MultimediaList(props) {
  const { imagesData, handleDelete, isVisible = false, fieldPath, isDetail, uploadProgress, isUploading, imageOnly } = props
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

  const getFileType = (path) => {
    const lowerCasePath = path.toLowerCase()

    if (
      lowerCasePath.endsWith('.jpg') ||
      lowerCasePath.endsWith('.jpeg') ||
      lowerCasePath.endsWith('.png') ||
      lowerCasePath.endsWith('.gif') ||
      lowerCasePath.endsWith('.bmp') ||
      lowerCasePath.endsWith('.webp')
    ) {
      return 'image'
    } else if (
      lowerCasePath.endsWith('.mp4') ||
      lowerCasePath.endsWith('.avi') ||
      lowerCasePath.endsWith('.mov') ||
      lowerCasePath.endsWith('.wmv') ||
      lowerCasePath.endsWith('.flv') ||
      lowerCasePath.endsWith('.mkv') ||
      lowerCasePath.endsWith('.webm')
    ) {
      return 'video'
    } else {
      return 'unknown'
    }
  }

  return (
    <div>
      {imagesData.length === 0 && !isUploading && (
        isDetail ? (
          <Typography component="p">{t('noImageOrVideo')}</Typography>
        ) : (
          imageOnly ? (
            <InputLabel className="inputLabel-handbook-view">{t('noImage')}</InputLabel>
          ) : (
            <InputLabel className="inputLabel-handbook-view">{t('noImageOrVideo')}</InputLabel>
          )
        )
      )}
        <ImageList className="customer-handbook-image-list" cols={5} rowHeight={100}>
          {imagesData.map((item, index) => {
            const fileType = getFileType(item[fieldPath]);
            return (
              <ImageListItem
                className="customer-handbook-image-item"
                key={index}
                onClick={() => handleImageClick(index)}
              >
                {isVisible && (
                  <IconButton
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      padding: '4px',
                      color: '#FFFFFF',
                      zIndex: '10'
                    }}
                    aria-label="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
                {fileType === 'image' ? (
                  <img className="customer-handbook-image" src={item[fieldPath]} loading="lazy" />
                ) : fileType === 'video' ? (
                  <ReactPlayer url={item[fieldPath]} className="react-player" width="100%" height="100%" />
                ) : null}
              </ImageListItem>
            );
          })}
        </ImageList>
      {isUploading && (
        <div style={{ marginBottom: '16px' }}>
          <LinearProgress
            variant="determinate"
            value={uploadProgress}
            style={{ marginTop: '8px' }}
          />
          <Typography variant="caption" color="textSecondary">
            {uploadProgress}%
          </Typography>
        </div>
      )
      }

      {openDialog && (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogContent>
            {selectedImageIndex !== null && (
              <div style={{ position: 'relative' }}>
                {getFileType(imagesData[selectedImageIndex][fieldPath]) === 'image' ? (
                  <img
                    className="customer-handbook-image-detail"
                    src={imagesData[selectedImageIndex][fieldPath]}
                    alt={`Image ${selectedImageIndex}`}
                  />
                ) : getFileType(imagesData[selectedImageIndex][fieldPath]) === 'video' ? (
                  <ReactPlayer
                    url={imagesData[selectedImageIndex][fieldPath]}
                    className="react-player"
                    controls
                    width="100%"
                    height="100%"
                  />
                ) : null}
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
      )}
    </div>
  );
}
