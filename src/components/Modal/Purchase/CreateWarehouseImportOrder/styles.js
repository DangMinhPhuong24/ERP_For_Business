import { makeStyles } from '@mui/styles'
import colors from 'constants/colors'

export const useStyles = makeStyles({
  '.MuiPaper-root': {
    borderRadius: '16px !important'
  },
  wrapAction: {
    backgroundColor: colors.paleblueColor,
    padding: '16px !important'
  },
  cancelBtn: {
    backgroundColor: `${colors.lightblueColor} !important`,
    color: `${colors.redColor} !important`,
    textTransform: 'none !important',
    borderRadius: '8px !important',
    minWidth: '100px !important',
    maxHeight: 34
  },
  wrapTitleCreate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '8px 0 !important'
  },
  title: {
    fontSize: '20px !important',
    color: colors.charcoalBlackColor
  },
  textLabel: {
    fontSize: '14px !important',
    color: colors.charcoalBlackColor
  },
  textFieldAutocomplete: {
    '& .MuiOutlinedInput-root': {
      marginRight: '25px',
      borderRadius: '8px',
      'MuiAutocomplete-inputRoot': {
        paddingRight: '56px !important',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    },
    '& .MuiAutocomplete-inputRoot': {
      borderRadius: '8px'
    }
  },
  textError: {
    fontSize: '14px !important'
  }
})
