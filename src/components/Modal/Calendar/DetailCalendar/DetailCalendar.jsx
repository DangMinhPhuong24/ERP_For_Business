// @ts-nocheck
import {
  AccessTimeRounded,
  CloseRounded,
  EditOutlined,
  EventRounded,
  InfoOutlined,
  PeopleOutlineRounded,
  SquareRounded
} from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography
} from '@mui/material'
import { stringAvatar } from 'common/common'
import { statusApproveCalendar } from 'constants'
import dayjs from 'dayjs'
import { isEmpty } from 'lodash'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import paramKeys from 'repositories/remote/request/paramKeys'
import {
  approveCalendarAction,
  deleteCalendarAction,
  detailCalendarAction,
  searchCalendarByUserIdAction
} from '../../../../redux/calendar/calendar.action'
import { calendarById } from '../../../../redux/calendar/calendar.selectors'
import CreateCalendar from '../CreateCalendar'
import { permissionOfEachEvent } from 'constants'
import { LoadingButton } from '@mui/lab'

const DetailCalendar = (props) => {
  const { onClose, open, selectedValue, arrInviteesId } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false)
  const event = useSelector(calendarById)

  const [loading, setLoading] = React.useState(false)
  const [currentApprove, setCurrentApprove] = React.useState()

  useEffect(() => {
    dispatch(detailCalendarAction({ [paramKeys.CALENDAR_ID]: selectedValue?.extendedProps.event_id }))
  }, [dispatch, selectedValue?.extendedProps.event_id, openUpdateDialog])

  const handleClose = () => {
    onClose()
  }

  const handleOpenUpdateDialog = () => {
    setOpenUpdateDialog(true)
  }

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false)
  }

  const handleDeleteCalendar = (event_id) => {
    try {
      dispatch(deleteCalendarAction({ [paramKeys.CALENDAR_ID]: event_id }))
      dispatch(searchCalendarByUserIdAction({ [paramKeys.USER_IDS]: arrInviteesId }))
      toast.success(t('deleteEventSuccessful'))
    } catch (error) {
      toast.error(error.message)
    }
    onClose()
  }

  const handleApproveCalendar = (event_id, calendar_status_id) => {
    setLoading(!loading)
    setCurrentApprove(calendar_status_id)
    try {
      const dataApprove = {
        [paramKeys.CALENDAR_ID]: event_id,
        [paramKeys.CALENDAR_STATUS_ID]: calendar_status_id
      }
      dispatch(approveCalendarAction(dataApprove))
      dispatch(searchCalendarByUserIdAction({ [paramKeys.USER_IDS]: arrInviteesId }))

      setTimeout(() => {
        setLoading(!loading)
        toast.success(t('approveEventSuccessful'))
        onClose()
      }, 1000)
    } catch (error) {
      toast.error(error.message)
      setLoading(!loading)
    }
  }

  const renderColor = (status) => {
    switch (status) {
      case 2:
        return 'success'
      case 3:
        return 'error'
      default:
        return ''
    }
  }

  return (
    <>
      {selectedValue && open && !isEmpty(event) && (
        <Dialog fullWidth onClose={handleClose} open={open} maxWidth="xs">
          <DialogTitle sx={{ padding: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              {selectedValue?.extendedProps.is_owner === permissionOfEachEvent.EDIT && (
                <>
                  <IconButton onClick={handleOpenUpdateDialog}>
                    <EditOutlined />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCalendar(selectedValue?.extendedProps.event_id)}>
                    <HiOutlineTrash />
                  </IconButton>
                </>
              )}
              <IconButton onClick={handleClose}>
                <CloseRounded />
              </IconButton>
            </Box>
          </DialogTitle>
          {!isEmpty(event) && (
            <DialogContent>
              <Box mt={2}>
                <Box pb={2}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <SquareRounded
                      fontSize="small"
                      sx={{ minWidth: 30, color: selectedValue?.backgroundColor ?? null }}
                    />
                    <Typography variant="h5">{event?.title}</Typography>
                  </Box>
                  <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccessTimeRounded fontSize="small" sx={{ minWidth: 30 }} />
                    <Box>
                      <Typography variant="body1">
                        {`${dayjs(event.date + 'T' + event.start_time).format('HH:mm DD/MM/YYYY')} - ${dayjs(event.date + 'T' + event.end_time).format('HH:mm DD/MM/YYYY')} `}
                      </Typography>
                    </Box>
                  </Box>
                  {event.description && (
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                      <InfoOutlined fontSize="small" sx={{ minWidth: 30 }} />
                      <Box>
                        <Typography variant="body1">{`${event.description ?? ''} `}</Typography>
                      </Box>
                    </Box>
                  )}

                  {event?.calendar_user.length > 0 && (
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <PeopleOutlineRounded fontSize="small" sx={{ minWidth: 30 }} />
                      <Box>
                        {event?.calendar_user.map((invitee, index) => {
                          return (
                            <Box key={index} mt={index > 0 ? 1 : 0} sx={{ display: 'flex', alignItems: 'center' }}>
                              <Badge
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right'
                                }}
                                variant="dot"
                                overlap="circular"
                                badgeContent=" "
                                color={renderColor(invitee.calendar_status.id)}
                              >
                                <Avatar {...stringAvatar(invitee.user.name ?? 'Unknown')} />
                              </Badge>
                              <Typography ml={1} variant="body1">
                                {invitee.user.name ?? 'Unknown'}
                              </Typography>
                            </Box>
                          )
                        })}
                      </Box>
                    </Box>
                  )}

                  <Box mt={2} sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventRounded fontSize="small" sx={{ minWidth: 30 }} />
                    <Typography variant="body1">{event?.creator.name}</Typography>
                  </Box>
                </Box>
                {selectedValue?.extendedProps.is_owner === permissionOfEachEvent.APPROVE_EVENT && (
                  <>
                    <Divider />
                    <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="body1">{t('youWillJoin')}</Typography>
                      <ButtonGroup disableElevation variant="text">
                        <LoadingButton
                          loading={loading && currentApprove === statusApproveCalendar.APPROVED}
                          onClick={() =>
                            handleApproveCalendar(selectedValue?.extendedProps.event_id, statusApproveCalendar.APPROVED)
                          }
                        >
                          {t('yes')}
                        </LoadingButton>
                        <LoadingButton
                          loading={loading && currentApprove === statusApproveCalendar.REJECTED}
                          onClick={() =>
                            handleApproveCalendar(selectedValue?.extendedProps.event_id, statusApproveCalendar.REJECTED)
                          }
                        >
                          {t('no')}
                        </LoadingButton>
                      </ButtonGroup>
                    </Box>
                  </>
                )}
              </Box>
            </DialogContent>
          )}
        </Dialog>
      )}
      {openUpdateDialog && (
        <CreateCalendar open={openUpdateDialog} onClose={handleCloseUpdateDialog} valueUpdate={selectedValue} isEdit />
      )}
    </>
  )
}

export default DetailCalendar
