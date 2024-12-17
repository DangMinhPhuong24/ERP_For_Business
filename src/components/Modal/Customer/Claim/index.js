// @ts-nocheck
import React, { useState, useEffect, useRef, useMemo } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import commons from '../../../../constants/common'
import {generateUniqueFileName, renderUploadMessage} from '../../../../common/common'
import colors from '../../../../constants/colors'
import '../../../../resource/style/ModalClaimStyle.css'
import Autocomplete from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { listAllClaimStatusState } from '../../../../redux/customer/customer.selectors'
import {getAllClaimStatusAction } from '../../../../redux/customer/customer.actions'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import statusClaimId from '../../../../constants/statusClaimId'
import { departmentAllState } from '../../../../redux/account/account.selectors'
import { getAllDepartmentAction } from '../../../../redux/account/account.actions'
import MultimediaList from '../../../MultimediaList'
import { s3 } from '../../../../utils/settingS3';
import {toast} from "react-toastify";

const ClaimInfo = ({ title, value }) => (
  <Box mb={2}>
    <Typography component="p" fontWeight="bold">
      {title}
    </Typography>
    <Typography ml={2} component="p">
      {value}
    </Typography>
  </Box>
)

export default function ClaimModal(props) {
  const {
    isCreateById,
    isCreate,
    isView,
    isEdit,
    open,
    nameTitle,
    dataCustomer,
    dataClaim,
    handleCloseModal,
    dataCustomerDetail,
    dataClaimProblem,
    customerId,
    handleSubmitAction,
    successFlag
  } = props

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '620px',
    maxWidth: '660px',
    maxHeight: '94vh',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto'
  }
  const { t } = useTranslation()
  const [customer, setCustomer] = useState('')
  const [description, setDescription] = useState('')
  const [typeProblemId, setTypeProblemId] = useState('')
  const [reason, setReason] = useState('')
  const [departments, setDepartments] = useState([])
  const [solution, setSolution] = useState('')
  const [errorMessageCustomerName, setErrorMessageCustomerName] = useState('')
  const [errorMessageDescription, setErrorMessageDescription] = useState('')
  const [errorMessageTypeProblem, setErrorMessageTypeProblem] = useState('')
  const listAllClaimStatus = useSelector(listAllClaimStatusState)
  const departmentAll = useSelector(departmentAllState)
  const [claimStatusId, setClaimStatusId] = useState('')
  const [selectedFile, setSelectedFile] = useState([])
  const fileInputRef = useRef(null)
  const [uploadProgress, setUploadProgress] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllClaimStatusAction())
    dispatch(getAllDepartmentAction())
  }, [])

  useEffect(() => {
    if (isCreateById) {
      setCustomer(customerId)
      setDescription('')
      setTypeProblemId('')
      setReason('')
      setDepartments([])
      setSelectedFile([])
      setSolution('')
      setClaimStatusId('')
    } else if (dataClaim && !isCreate) {
      setCustomer(dataClaim.customer?.id || '')
      setDescription(dataClaim.description || '')
      setTypeProblemId(dataClaim.claim_problem?.id || '')
      setReason(dataClaim.cause || '')
      setSolution(dataClaim.solution || '')
      setClaimStatusId(dataClaim.claim_status?.id || '')
      if (dataClaim.image_videos) {
        setSelectedFile(dataClaim.image_videos)
      }
      const departmentIds = dataClaim.departments ? dataClaim.departments.map((dep) => dep.id) : []
      setDepartments(departmentIds)
    }
  }, [dataClaim, isCreateById, isCreate])

  useEffect(() => {
    if (reason === '' && solution === '') {
      setClaimStatusId(statusClaimId.pendingClaim)
    } else if (reason !== '' && solution === '') {
      setClaimStatusId(statusClaimId.causeHasBeenDetermined)
    } else if (reason !== '' && solution !== '') {
      setClaimStatusId(statusClaimId.solved)
    }
  }, [reason, solution])

  useEffect(() => {
    if (successFlag) {
      handleClose()
    }
  }, [successFlag])

  const handleSubmit = () => {
    let claim = {}

    if (isCreate) {
      claim = {
        customerId: customer,
        description: description,
        claim_problem_id: typeProblemId,
        departmentsId: departments,
        imageVideos: selectedFile,
        reason: reason,
        solution: solution,
        statusId: claimStatusId
      }
    } else if (isCreateById) {
      claim = {
        customerId: customerId,
        description: description,
        claim_problem_id: typeProblemId,
        departmentsId: departments,
        imageVideos: selectedFile,
        reason: reason,
        solution: solution,
        statusId: claimStatusId
      }
    } else if (isEdit) {
      claim = {
        id: dataClaim.id,
        customerId: customerId,
        description: description,
        claim_problem_id: typeProblemId,
        reason: reason,
        solution: solution,
        statusId: claimStatusId,
        departmentsId: departments,
        imageVideos: selectedFile
      }
    } else if (isView) {
      claim = {
        id: dataClaim.id
      }
    }

    if (Object.keys(claim).length > 0) {
      let validate = validateData(claim)
      if (validate) {
        handleSubmitAction(claim)
      }
    }
  }

  const validateData = (claim) => {
    let flag = true
    setErrorMessageCustomerName('')
    setErrorMessageDescription('')
    setErrorMessageTypeProblem('')
    if (!claim.customerId) {
      setErrorMessageCustomerName(t('pleaseChoiceCustomer'))
      flag = false
    }
    if (!claim.description || claim.description.trim() === '') {
      setErrorMessageDescription(t('pleaseEnterDescriptionClaim'))
      flag = false
    }
    if (!claim.claim_problem_id) {
      setErrorMessageTypeProblem(t('pleaseChoiceTypeProblem'))
      flag = false
    }

    return flag
  }

  const handleClose = () => {
    handleCloseModal()
    setCustomer('')
    setDescription('')
    setTypeProblemId('')
    setDepartments([])
    setSelectedFile([])
    setReason('')
    setSolution('')
    setErrorMessageCustomerName('')
    setErrorMessageDescription('')
    setErrorMessageTypeProblem('')
  }

  const handleChoiceCustomer = (customer) => {
    if (customer && customer.id) {
      setCustomer(customer.id)
    } else {
      setCustomer('')
    }
  }

  const handleTypeProblem = (typeProblem) => {
    if (typeProblem && typeProblem.id) {
      setTypeProblemId(typeProblem.id)
    } else {
      setTypeProblemId('')
    }
  }

  const handleChangeDescriptionClaim = (value) => {
    setDescription(value)
  }
  const selectedDepartment = useMemo(() => {
    return departmentAll.filter((option) => departments.includes(option.id))
  }, [departments, departmentAll])

  const handleDepartmentChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setDepartments(selectedIds)
  }

  const handleChangeReason = (value) => {
    setReason(value)
  }

  const handleChangeSolution = (value) => {
    setSolution(value)
  }

  const handleAddIconClick = () => {
    fileInputRef.current.value = null;
    fileInputRef.current.click()
  }

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files);
    const errors = { image: [], video: [], other: [] };
    const validFiles = [];
    let largestFileSize = 0;

    fileArray.forEach(file => {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const isImage = commons.FORMAT_IMAGE_FILE.includes(fileExtension);
      const isVideo = commons.FORMAT_VIDEO_FILE.includes(fileExtension);

      if (isImage) {
        if (file.size > commons.MAX_SIZE_IMAGE) {
          errors.image.push(file.name);
        } else {
          validFiles.push(file);
          largestFileSize = Math.max(largestFileSize, file.size);
        }
      } else if (isVideo) {
        if (file.size > commons.MAX_SIZE_VIDEO) {
          errors.video.push(file.name);
        } else {
          validFiles.push(file);
          largestFileSize = Math.max(largestFileSize, file.size);
        }
      } else {
        errors.other.push(file.name);
      }
    });

    if (errors.image.length > 0) {
      const overSizedFilesMessage = renderUploadMessage(errors.image, t('capacityImageLimit'))
      toast.error(overSizedFilesMessage)
    }
    if (errors.video.length > 0) {
      const overSizedVideosMessage = renderUploadMessage(errors.video, t('capacityVideoLimit'))
      toast.error(overSizedVideosMessage)
    }
    if (errors.other.length > 0) {
      const invalidFilesMessage = renderUploadMessage(errors.other, t('formatImageVideos'))
      toast.error(invalidFilesMessage)
    }

    setUploadProgress(0);
    setIsUploading(true);

    const handleUpload = async (file) => {
      const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: generateUniqueFileName(file),
        Body: file,
        ContentType: file.type,
      };

      return new Promise((resolve, reject) => {
        const upload = s3.upload(params);
        upload.on('httpUploadProgress', (event) => {
          if (file.size === largestFileSize) {
            const percentComplete = Math.round((event.loaded / file.size) * 100);
            setUploadProgress(percentComplete);
          }
        });

        upload.promise()
          .then((data) => resolve(data))
          .catch((error) => {
            console.error('Upload error:', error);
            reject(error);
          });
      });
    };

    try {
      const uploadResults = await Promise.all(validFiles.map(handleUpload));
      setSelectedFile(prev => {
        const updatedFiles = [...prev];
        uploadResults.forEach(result => {
          updatedFiles.push({ file_path: result.Location });
        });
        return updatedFiles;
      });
      setUploadProgress(100);
      if(uploadResults.length > 0) {
        const successMessage = renderUploadMessage(validFiles, t('fileUploadSuccess'), 'name')
        toast.success(successMessage);
      }
    } catch (error) {
      toast.error(t('uploadFailed'))
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (index) => {
    const updatedItems = [...selectedFile]
    updatedItems.splice(index, 1)
    setSelectedFile(updatedItems)
  }

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={style}>
          <Typography component="p" className="claim-title">
            {nameTitle}
          </Typography>
          {!isView ? (
            <>
              <Box p={2}>
                <Box sx={{ mb: 2 }}>
                  {isCreateById ? (
                    <>
                      <InputLabel required className="requiredTextField inputLabel-modal">
                        {t('customerName')}
                      </InputLabel>
                      <TextField
                        size="small"
                        value={dataCustomerDetail ? dataCustomerDetail.customer_name : ''}
                        disabled={isCreateById}
                        className="input-style"
                        placeholder={t('enterCustomerName')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <InputLabel required className=" requiredTextField inputLabel-modal">
                        {t('customerName')}
                      </InputLabel>
                      <Autocomplete
                        noOptionsText={t('noResult')}
                        value={dataCustomer?.find((option) => option.id === customer) || null}
                        onChange={(event, newValue) => handleChoiceCustomer(newValue)}
                        options={dataCustomer}
                        className="input-style"
                        getOptionLabel={(option) => option.customer_name}
                        disabled={isEdit}
                        renderInput={(params) => (
                          <TextField
                            error={errorMessageCustomerName ? true : false}
                            id={errorMessageCustomerName ? 'outlined-error-helper-text' : 'outlined-required'}
                            helperText={errorMessageCustomerName ? errorMessageCustomerName : ''}
                            {...params}
                            size="small"
                            placeholder={t('enterCustomerName')}
                          />
                        )}
                        classes={{ inputRoot: 'custom-input-search' }}
                      />
                    </>
                  )}
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel required className="requiredTextField inputLabel-modal">
                    {t('typeOfProblem')}
                  </InputLabel>
                  <Autocomplete
                    noOptionsText={t('noResult')}
                    value={dataClaimProblem?.find((option) => option.id === typeProblemId) || null}
                    onChange={(event, newValue) => handleTypeProblem(newValue)}
                    options={dataClaimProblem}
                    className="input-style"
                    getOptionLabel={(option) => option.claim_problem_name}
                    renderInput={(params) => (
                      <TextField
                        error={errorMessageTypeProblem ? true : false}
                        id={errorMessageTypeProblem ? 'outlined-error-helper-text' : 'outlined-required'}
                        helperText={errorMessageTypeProblem ? errorMessageTypeProblem : ''}
                        {...params}
                        placeholder={t('selectTypeOfProblem')}
                        size="small"
                      />
                    )}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel required className="requiredTextField inputLabel-modal">
                    {t('describeTheProblem')}
                  </InputLabel>
                  <TextField
                    multiline
                    value={description ? description : ''}
                    error={errorMessageDescription ? true : false}
                    className="input-style"
                    placeholder={t('describeContent')}
                    id={errorMessageDescription ? 'outlined-error-helper-text' : 'outlined-required'}
                    helperText={errorMessageDescription ? errorMessageDescription : ''}
                    onChange={(e) => handleChangeDescriptionClaim(e.target.value)}
                    rows={2}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel className="inputLabel-modal">{t('sendTo')}</InputLabel>
                  <Autocomplete
                    multiple
                    noOptionsText={t('noResult')}
                    value={selectedDepartment}
                    onChange={handleDepartmentChange}
                    limitTags={3}
                    options={departmentAll || []}
                    className="input-style"
                    getOptionLabel={(option) => option.department_name}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('selectTheDepartmentToNotifyTheClaim')} size="small" />
                    )}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Box mt={2} mb="10px" sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <InputLabel sx={{ mb: '0 !important' }} className="inputLabel-handbook">
                      {t('imageOrVideo')}
                    </InputLabel>
                    <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddIconClick} />
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      style={{ display: 'none' }}
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                  </Box>
                  <MultimediaList
                    handleDelete={handleDelete}
                    imagesData={selectedFile}
                    isVisible={!isView}
                    fieldPath="file_path"
                    uploadProgress={uploadProgress}
                    isUploading={isUploading}
                  />
                </Box>
                <Box xs={10} sx={{ mb: 2 }}>
                  <InputLabel className="inputLabel-modal">{t('reason')}</InputLabel>
                  <TextField
                    value={reason ? reason : ''}
                    onChange={(e) => handleChangeReason(e.target.value)}
                    className="input-style"
                    placeholder={t('enterReason')}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <InputLabel className="inputLabel-modal">{t('solution')}</InputLabel>
                  <TextField
                    className="input-style"
                    multiline
                    value={solution ? solution : ''}
                    rows={2}
                    placeholder={t('enterSolution')}
                    onChange={(e) => handleChangeSolution(e.target.value)}
                  />
                </Box>
                <Box>
                  <InputLabel className="inputLabel-modal">{t('status')}</InputLabel>
                  <Autocomplete
                    disabled
                    popupIcon={<PolygonIcon />}
                    sx={{ width: '200px' }}
                    size="small"
                    options={listAllClaimStatus}
                    value={listAllClaimStatus.find((option) => option.id === claimStatusId) || null}
                    onChange={(event, value) => setClaimStatusId(value ? value.id : '')}
                    getOptionLabel={(option) => option.claim_status_name}
                    renderInput={(params) => <TextField {...params} placeholder={t('status')} />}
                    ListboxProps={{ style: { maxHeight: '180px' } }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: '8px 16px',
                  bgcolor: colors.paleblueColor
                }}
              >
                <Button onClick={handleClose} className="cancelButton">
                  {t('cancel')}
                </Button>
                {!isEdit ? (
                  <Button onClick={handleSubmit} className="confirmButton">
                    {t('add')}
                    <ArrowForwardIcon />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="confirmButton">
                    {t('confirm')}
                    <ArrowForwardIcon />
                  </Button>
                )}
              </Box>
            </>
          ) : (
            dataClaim &&
            dataClaim.customer && (
              <Box p={2}>
                <ClaimInfo title={t('customerName')} value={dataClaim.customer.customer_name} />
                <ClaimInfo title={t('typeOfProblem')} value={dataClaim.claim_problem.claim_status_name} />
                <ClaimInfo title={t('describeTheProblem')} value={description ? description : ''} />
                <Box mb={2}>
                  <Typography component="p" fontWeight="bold">
                    {t('sendTo')}
                  </Typography>
                  <Typography ml={2} component="p">
                    {selectedDepartment.length > 0
                      ? selectedDepartment.map((department) => department.department_name).join(', ')
                      : t('noSendToDepartment')}
                  </Typography>
                </Box>
                <Box mb={2}>
                  <Typography component="p" fontWeight="bold">
                    {t('imageOrVideo')}
                  </Typography>
                  <Typography ml={2} component="p">
                    <MultimediaList
                      isDetail={true}
                      handleDelete={handleDelete}
                      imagesData={selectedFile}
                      isVisible={false}
                      fieldPath="file_path"
                    />
                  </Typography>
                </Box>
                <ClaimInfo title={t('reason')} value={reason ? reason : <span>{t('causeNotDetermined')}</span>} />
                <ClaimInfo title={t('solution')} value={solution ? solution : <span>{t('noSolutionYet')}</span>} />
                <ClaimInfo title={t('status')} value={dataClaim.claim_status.claim_status_name} />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button onClick={handleCloseModal} className="cancelClaimButton">
                    {t('close')}
                  </Button>
                </Box>
              </Box>
            )
          )}
        </Box>
      </Modal>
    </Box>
  )
}
