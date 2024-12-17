// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup'
import { AddCircleOutlineRounded, CheckBoxOutlined } from '@mui/icons-material'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CollapseComponent from 'components/CollapseComponent'
import { isEmpty, isNull } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import HeaderPage from '../../../components/HeaderPage'
import colors from '../../../constants/colors'
import { TbEdit } from 'react-icons/tb'
import {
  createRoleAction,
  getDetailRoleWithPermissionsAction,
  getListPermissionsAction,
  getListRoleTypeAction,
  getRoleListAction,
  removeMessageErrorAction,
  updateRoleAction
} from '../../../redux/account/account.actions'
import {
  createRoleSuccessFlagState,
  errorRoleMessageState,
  listPermissionsState,
  listRoleTypeState,
  listRoleWithPermissionsDetailState,
  updateRoleSuccessFlagState
} from '../../../redux/account/account.selectors'
import { useUser } from 'contexts/AuthContext'
import roles from 'constants/titleRole'

function CreateOrUpdateRole() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const roleId = queryParams.get('id')
  const isCreateMode = location.pathname.includes('/create')
  const isEditMode = location.pathname.includes('/edit')
  const isShowMode = location.pathname.includes('/show')
  const listPermissions = useSelector(listPermissionsState)
  const listRoleWithPermissionsDetail = useSelector(listRoleWithPermissionsDetailState)
  const createRoleSuccessFlag = useSelector(createRoleSuccessFlagState)
  const updateRoleSuccessFlag = useSelector(updateRoleSuccessFlagState)
  const errorRoleMessage = useSelector(errorRoleMessageState)
  const listRoleType = useSelector(listRoleTypeState)
  const dispatch = useDispatch()
  const [permissionsArr, setPermissionsArr] = useState([])
  const [loading, setLoading] = useState(false)
  const { userInfo } = useUser()
  const isSuperAdmin = userInfo.role?.name === roles.SUPER_ADMIN
  const modulesPerList = Math.ceil(listPermissions.length / 2)
  const listPermissionsLeft = listPermissions.slice(0, modulesPerList)
  const listPermissionsRight = listPermissions.slice(modulesPerList)
  const [listModuleSale, setListModuleSale] = useState({})
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    dispatch(getRoleListAction())
    dispatch(getListPermissionsAction())
    dispatch(getListRoleTypeAction())
  }, [dispatch])

  const validationSchema = yup.object().shape({
    displayName: yup.string().required(t('pleaseEnterRoleName')).max(255, t('roleNameMaxLength')),
    roleType: yup.string().required(t('pleaseChooseRoleType')),
    permissions: yup.array().nullable()
  })

  const {
    control,
    handleSubmit,
    reset,
    register,
    setError,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      displayName: '',
      roleType: '',
      permissions: []
    },
    mode: 'all'
  })

  useEffect(() => {
    if (roleId) {
      dispatch(getDetailRoleWithPermissionsAction(roleId))
    }
  }, [])

  useEffect(() => {
    const moduleSale = listPermissions
      ?.find((item) => item.name === 'module_sales')
      ?.children.find((item) => item.name === 'module_sales.setting')
    setListModuleSale(moduleSale)
  }, [listPermissions])

  useEffect(() => {
    if (roleId && listRoleWithPermissionsDetail) {
      let data = []
      setValue('displayName', listRoleWithPermissionsDetail?.display_name ?? '')
      setValue('roleType', listRoleWithPermissionsDetail.type?.name ?? '')

      listRoleWithPermissionsDetail?.permission?.forEach((permission) => {
        permission.children.forEach((child) => {
          data.push(child)
        })
      })
      const isRoleSuperAdminOrAdminDetail =
        listRoleWithPermissionsDetail?.name === roles.SUPER_ADMIN || listRoleWithPermissionsDetail?.name === roles.ADMIN
      setIsChecked(isRoleSuperAdminOrAdminDetail)
      setPermissionsArr(data)
    }
  }, [roleId, listRoleWithPermissionsDetail, setValue])

  function getSelectedPermissionNames(arr, result = []) {
    arr.forEach((item) => {
      if (item.children.length > 0) {
        getSelectedPermissionNames(item.children, result)
      } else {
        result.push(item.name)
      }
    })
    return result
  }

  function flattenPermissions(list, result = []) {
    list.forEach((item) => {
      result.push(item.name)
      if (item.children.length > 0) {
        flattenPermissions(item.children, result)
      }
    })
    return result
  }

  const onSubmit = async (dataSubmit) => {
    const selectedPermissions = getSelectedPermissionNames(permissionsArr)

    const allPermissions = flattenPermissions(listPermissions)

    const matchedPermissions = selectedPermissions.filter((name) => allPermissions.includes(name))

    const mappedData = {
      display_name: dataSubmit.displayName,
      role_type: dataSubmit.roleType,
      permissions: matchedPermissions
    }

    try {
      setLoading(true)
      if (isCreateMode) {
        await dispatch(createRoleAction(mappedData))
      } else if (isEditMode) {
        await dispatch(updateRoleAction({ id: roleId, ...mappedData }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [dispatch])

  useEffect(() => {
    if (createRoleSuccessFlag || updateRoleSuccessFlag) {
      removeMessageError()
      setError()
      reset()
      navigate(`/account/roles/`)
    }
  }, [createRoleSuccessFlag, updateRoleSuccessFlag, navigate, setError, reset, removeMessageError])

  useEffect(() => {
    if (errorRoleMessage) {
      if (errorRoleMessage.display_name && errorRoleMessage.display_name.length > 0) {
        setError('displayName', {
          type: 'manual',
          message: errorRoleMessage.display_name[0]
        })
      }
    }
  }, [errorRoleMessage, setError])

  const renderChildPermission = (permissions, grand = null) => {
    let children = ''
    if (!isEmpty(permissions.children)) {
      children = permissions.children.map((child, key) => (
        <>
          <FormControlLabel
            key={`${key}-child`}
            label={child?.display_name}
            {...register('permission')}
            control={
              <Checkbox
                color="success"
                icon={<CheckBoxOutlined />}
                onChange={() => handleCheckChildren(permissions, child, grand)}
                checked={isChecked || isCheckedChild(permissions, child, grand)}
                sx={{
                  '&.Mui-checked': {
                    color: 'success.main'
                  }
                }}
                disabled={isShowMode}
              />
            }
          ></FormControlLabel>
          <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
            {child.children && renderChildPermission(child, permissions)}
          </Box>
        </>
      ))
    }

    return children
  }

  const renderObjectPermission = (permission) => {
    if (permission.children.length > 0) {
      permission.children.forEach((item) => renderObjectPermission(item))
    }
    return {
      id: permission.id,
      name: permission.name,
      children: permission.children.map((child) => renderObjectPermission(child))
    }
  }

  const handleCheckParent = (parentPermission) => {
    let updatedPermissions = [...permissionsArr]
    const filteredPermissions = updatedPermissions.filter((p) => p.id !== parentPermission.id)
    const existingParent = updatedPermissions.find((p) => p.id === parentPermission.id)

    if (existingParent) {
      let firstChildren = parentPermission.children[0]
      if (firstChildren) {
        const totalChildren = parentPermission.children.reduce((acc, child) => acc + child.children.length, 0)
        const totalExistingChildren = existingParent.children.reduce((acc, child) => acc + child.children.length, 0)

        updatedPermissions = [...filteredPermissions]

        if (totalChildren !== totalExistingChildren) {
          const updatedParent = {
            ...existingParent,
            children: parentPermission.children
          }
          updatedPermissions = [...filteredPermissions, updatedParent]
        }
      } else {
        const updatedParent = {
          ...existingParent,
          children: parentPermission.children
        }
        updatedPermissions = [...filteredPermissions, updatedParent]

        if (existingParent.children.length === parentPermission.children.length) {
          updatedPermissions = [...filteredPermissions]
        }
      }
    } else {
      const newParent = renderObjectPermission(parentPermission)
      updatedPermissions = [...filteredPermissions, newParent]
    }

    setPermissionsArr(updatedPermissions)
  }

  const handleCheckChildren = (parent, child, grandParent) => {
    let updatedPermissions = [...permissionsArr]
    const isIndexChild = child.name.includes('index')
    const indexChild = parent.children.find((c) => c.name.includes('index'))

    if (isNull(grandParent)) {
      const filteredPermissions = updatedPermissions.filter((p) => p.id !== parent.id)
      const existingParent = updatedPermissions.find((p) => p.id === parent.id)

      if (existingParent) {
        let updatedChildren = existingParent.children.some((c) => c.id === child.id)
          ? existingParent.children.filter((c) => c.id !== child.id)
          : [...existingParent.children, child]

        if (isIndexChild && existingParent.children.filter((c) => c.id !== child.id).length > 0) {
          updatedChildren = existingParent.children
        }

        let updatedParent = {
          ...existingParent,
          children: updatedChildren
        }

        if (child.children.length !== 0) {
          const existingChild = existingParent.children.find((c) => c.id === child.id)
          if (existingChild && existingChild.children.length !== child.children.length) {
            const remainingChildren = existingParent.children.filter((c) => c.id !== child.id)
            const updatedChild = {
              id: existingChild.id,
              name: existingChild.name,
              children: [...child.children]
            }
            updatedParent = {
              ...existingParent,
              children: [...remainingChildren, updatedChild]
            }
          }
        }

        updatedPermissions = [...filteredPermissions, updatedParent]

        if (updatedParent.children.length === 0) {
          updatedPermissions = [...filteredPermissions]
        }
      } else {
        const newChild = {
          id: child.id,
          name: child.name,
          children: child.children.map((c) => ({
            id: c.id,
            name: c.name,
            children: []
          }))
        }

        updatedPermissions = [...filteredPermissions, { id: parent.id, name: parent.name, children: [newChild] }]

        if (!isIndexChild && indexChild) {
          updatedPermissions = [
            ...filteredPermissions,
            { id: parent.id, name: parent.name, children: [newChild, indexChild] }
          ]
        }
      }
    }

    if (grandParent) {
      const filteredPermissions = updatedPermissions.filter((p) => p.id !== grandParent.id)
      const existingGrandParent = updatedPermissions.find((p) => p.id === grandParent.id)

      if (existingGrandParent) {
        const existingParent = existingGrandParent.children.find((p) => p.id === parent.id)

        if (existingParent) {
          const newChild = { id: child.id, name: child.name, children: [] }
          let updatedChildren = existingParent.children.some((c) => c.id === child.id)
            ? existingParent.children.filter((c) => c.id !== child.id)
            : [...existingParent.children, child]

          if (isIndexChild && existingParent.children.filter((c) => c.id !== child.id).length > 0) {
            updatedChildren = existingParent.children
          }

          const updatedParent = {
            id: parent.id,
            name: parent.name,
            children: updatedChildren
          }

          let updatedGrandParent = {
            ...existingGrandParent,
            children: [...existingGrandParent.children.filter((c) => c.id !== parent.id), updatedParent]
          }

          if (updatedParent.children.length === 0) {
            updatedGrandParent = {
              ...existingGrandParent,
              children: [...existingGrandParent.children.filter((c) => c.id !== parent.id)]
            }
          }

          updatedPermissions = [...filteredPermissions, updatedGrandParent]

          if (updatedGrandParent.children.length === 0) {
            updatedPermissions = [...filteredPermissions]
          }
        } else {
          const newChild = { id: child.id, name: child.name, children: [] }
          let updatedParent = { id: parent.id, name: parent.name, children: [newChild] }

          if (!isIndexChild) {
            updatedParent = { id: parent.id, name: parent.name, children: [newChild, indexChild] }
          }

          const updatedGrandParent = {
            ...existingGrandParent,
            children: [...existingGrandParent.children, updatedParent]
          }

          updatedPermissions = [...filteredPermissions, updatedGrandParent]
        }
      } else {
        const newChild = { id: child.id, name: child.name, children: [] }
        let updatedParent = { id: parent.id, name: parent.name, children: [newChild] }

        if (!isIndexChild) {
          updatedParent = { id: parent.id, name: parent.name, children: [newChild, indexChild] }
        }

        updatedPermissions = [
          ...filteredPermissions,
          { id: grandParent.id, name: grandParent.name, children: [updatedParent] }
        ]
      }
    }

    setPermissionsArr(updatedPermissions)
  }

  const isCheckedParent = (parentPermission) => {
    const existingPermission = permissionsArr.find((p) => p.id === parentPermission.id)

    if (!parentPermission.children || parentPermission.children.length === 0) {
      return Boolean(existingPermission && existingPermission.children.length === 0)
    }

    const countChildren = (permission) => {
      if (!permission.children || permission.children.length === 0) return 0

      let count = permission.children.length
      permission.children.forEach((child) => {
        count += countChildren(child)
      })

      return count
    }

    const totalParentChildren = countChildren(parentPermission)
    const totalExistingChildren = existingPermission ? countChildren(existingPermission) : 0

    return totalParentChildren === totalExistingChildren
  }

  const isCheckedChild = (parent, child, grandParent) => {
    if (isNull(grandParent)) {
      const grandPermission = permissionsArr.find((p) => p.id === parent.id)
      const existingChild = grandPermission?.children.find((c) => c.id === child.id)

      if (existingChild) {
        return existingChild.children.length === child.children.length
      }

      return Boolean(grandPermission && grandPermission.children.some((c) => c.id === child.id))
    }

    const grandPermission = permissionsArr.find((p) => p.id === grandParent.id)
    if (grandPermission) {
      const existingParent = grandPermission.children.find((p) => p.id === parent.id)
      return Boolean(existingParent && existingParent.children.some((c) => c.id === child.id))
    }

    return false
  }

  const handleChangeEdit = (e, productId) => {
    e.preventDefault()
    navigate(`/account/roles/edit?id=${roleId}`)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HeaderPage
          title={
            isCreateMode
              ? t('addNewRole')
              : isEditMode
                ? t('editPermissionTitle')
                : isShowMode
                  ? t('showDetailPermission')
                  : ''
          }
          actionButton={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {isShowMode && isSuperAdmin && !isChecked ? (
                <Button
                  type="button"
                  variant="contained"
                  className="modalButtonClick"
                  onClick={(e) => handleChangeEdit(e, roleId)}
                  startIcon={<TbEdit style={{ fontSize: '16px', marginBottom: '2px' }} />}
                >
                  {t('editPermissionTitle')}
                </Button>
              ) : (
                <>
                  {isCreateMode && (
                    <Button
                      disabled={loading}
                      variant="contained"
                      type="submit"
                      className="buttonAction"
                      startIcon={<AddCircleOutlineRounded />}
                    >
                      {t('add')}
                    </Button>
                  )}

                  {isEditMode && (
                    <Button
                      disabled={loading}
                      variant="contained"
                      type="submit"
                      className="buttonAction"
                      startIcon={<TbEdit style={{ fontSize: '16px', marginBottom: '2px' }} />}
                    >
                      {t('save')}
                    </Button>
                  )}
                </>
              )}
            </Box>
          }
          setIsChecked={setIsChecked}
          removeMessageError={removeMessageError}
        />

        <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputLabel required className="requiredTextField inputLabel-calendar">
                {t('roleName')}
              </InputLabel>
              <Controller
                name="displayName"
                control={control}
                render={({ field }) => (
                  <TextField
                    sx={{ width: '100%' }}
                    {...field}
                    size="small"
                    placeholder={t('enterRoleName')}
                    error={!!errors.displayName}
                    helperText={errors.displayName ? errors.displayName.message : ''}
                    disabled={isShowMode}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel required className="requiredTextField inputLabel-calendar">
                {t('roleType')}
              </InputLabel>
              <Controller
                name="roleType"
                control={control}
                render={({ field }) => (
                  <>
                    <FormControl error={!!errors.roleType} variant="standard">
                      <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" {...field}>
                        {listRoleType.map((item, key) => (
                          <FormControlLabel
                            key={key}
                            value={item.name}
                            control={<Radio color="default" />}
                            label={item.display_name}
                            disabled={isShowMode}
                          />
                        ))}
                      </RadioGroup>
                      {!!errors.roleType && <FormHelperText>{errors.roleType.message}</FormHelperText>}
                    </FormControl>
                  </>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ paddingLeft: '2rem' }}>
          <Typography variant="h6" sx={{ fontSize: '16px !important', fontWeight: 700 }}>
            <em>{t('listRole')}</em>
            <span className="required"> *</span>
          </Typography>
          {errorRoleMessage.permissions && (
            <Typography color="error" sx={{ fontSize: '0.75rem' }}>
              {errorRoleMessage.permissions[0]}
            </Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Grid>
                {listPermissionsLeft.map((permission, index) => {
                  return (
                    <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2 }}>
                      <CollapseComponent title={permission.display_name}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          {permission?.children?.map((permission, key) => {
                            return (
                              <FormGroup key={key}>
                                <FormControlLabel
                                  label={t(permission.display_name)}
                                  {...register('permission')}
                                  control={
                                    <Checkbox
                                      color="success"
                                      icon={<CheckBoxOutlined />}
                                      onChange={() => handleCheckParent(permission)}
                                      checked={isChecked || isCheckedParent(permission)}
                                      sx={{
                                        '&.Mui-checked': {
                                          color: 'success.main'
                                        }
                                      }}
                                      disabled={isShowMode}
                                    />
                                  }
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
                                  {permission.children && renderChildPermission(permission)}
                                </Box>
                              </FormGroup>
                            )
                          })}
                        </Box>
                      </CollapseComponent>
                    </Box>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid item xs={12}>
              <Grid>
                {listPermissionsRight.map((permission, index) => {
                  return (
                    <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2 }}>
                      <CollapseComponent title={permission.display_name}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          {permission?.children?.map((permission, key) => {
                            return (
                              <FormGroup key={key}>
                                <FormControlLabel
                                  label={t(permission.display_name)}
                                  {...register('permission')}
                                  control={
                                    <Checkbox
                                      color="success"
                                      icon={<CheckBoxOutlined />}
                                      onChange={() => handleCheckParent(permission)}
                                      checked={isChecked || isCheckedParent(permission)}
                                      sx={{
                                        '&.Mui-checked': {
                                          color: 'success.main'
                                        }
                                      }}
                                      disabled={isShowMode}
                                    />
                                  }
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4 }}>
                                  {permission.children && renderChildPermission(permission)}
                                </Box>
                              </FormGroup>
                            )
                          })}
                        </Box>
                      </CollapseComponent>
                    </Box>
                  )
                })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateOrUpdateRole
