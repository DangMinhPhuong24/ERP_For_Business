import { ExpandLessRounded, ExpandMoreRounded } from '@mui/icons-material'
import { Box, Collapse, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

const CollapseComponent = ({ title, children }) => {
  const [showAll, setShowAll] = useState(true)
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
        <IconButton onClick={() => setShowAll(!showAll)}>
          {showAll ? <ExpandLessRounded /> : <ExpandMoreRounded />}
        </IconButton>
      </Box>
      <Collapse in={showAll}>{children}</Collapse>
    </>
  )
}

export default CollapseComponent
