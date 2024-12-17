import { makeStyles } from '@mui/styles'
import colors from 'constants/colors'

export const useStyles = makeStyles({
  wrapTable: {
    backgroundColor: colors.lilywhiteColor,
    borderRadius: '10px',
    padding: '20px',
    margin: 16
  },
  title: {
    color: colors.indigoColor
  },
  wrapSearchBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
