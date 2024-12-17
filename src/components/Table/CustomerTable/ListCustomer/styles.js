import { makeStyles } from '@mui/styles'
import colors from 'constants/colors'

export const useStyles = makeStyles({
  btnSort: {
    minWidth: 'auto',
    p: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textTransform: 'none'
  },
  wrapperHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnProductName: {
    display: 'flex',
    background: 'transparent',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textTransform: 'none',
    justifyContent: 'start',
    color: colors.blackColor,
    '&:hover': {
      backgroundColor: 'none !important'
    }
  }
})
