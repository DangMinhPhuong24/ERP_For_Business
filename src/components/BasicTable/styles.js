import { makeStyles } from '@mui/styles'
import colors from 'constants/colors'

export const useStyle = makeStyles({
  overdue: {
    borderLeft: `3px solid ${colors.redColor}`,
    backgroundColor: colors.peachColor
  }
})
