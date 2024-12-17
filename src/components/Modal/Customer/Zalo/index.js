import { InputLabel } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import colors from '../../../../constants/colors'
import '../../../../resource/style/ModalClaimStyle.css'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoAlertCircleSharp } from "react-icons/io5";


export default function ZaloModal({
                                      open,
                                      handleCloseModal,
                                      customerName
                                  }) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '64vw',
        bgcolor: 'background.paper',
        borderRadius: '16px',
        overflow: 'auto'
    };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplayTimeout: 10000,
    };

    const handleLogin = () =>{
        const url = `${process.env.REACT_APP_ZALO_LOGIN}`;
        window.open(url, '_blank')
    }

    const handleManage = () =>{
        const url = `${process.env.REACT_APP_ZALO_MANAGE}`;
        window.open(url, '_blank')
    }

    const handleDashboard = () =>{
        const url = `${process.env.REACT_APP_ZALO_DASHBOARD}`;
        window.open(url, '_blank')
    }

    const { t } = useTranslation();

    return (
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
            <Box className='title-wrapper'>
              <IoAlertCircleSharp style={{color: colors.redColor, fontSize:'24px'}}/>{t('customerNotCare')} {customerName}
            </Box>
            <Box p={2}>
              <Typography sx={{p:'0px !important'}}>
                <InputLabel className="zalo-content">
                  {t('requestToShareInformation')}
                </InputLabel>
                <InputLabel className="zalo-content">
                  {t('instructions')}:
                </InputLabel>
              </Typography>
              <Box p={2}>
                <Slider {...settings}>
                    <Box>
                        <Typography mb={1} sx={{display:'flex'}}><span style={{fontWeight: 'bold', marginRight:'4px'}}>{t('stepOne')}:</span>{t('loginZaloOA')}
                            <Button className="text-field-input" onClick={() => handleLogin()}
                                    sx={{textDecoration: 'underline', textTransform: 'none', p: 0}}>
                                {t('here')}
                            </Button>
                            {t('choose1Of2OptionsBelow')}
                        </Typography>
                        <img src="/image/login%20zalo.png"/>
                    </Box>
                    <Box>
                        <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepTwo')}:</span> {t('clickOnLinhHieuZaloOAAccount')}
                            <Button className="text-field-input" onClick={() => handleManage()}
                                    sx={{textDecoration: 'underline', textTransform: 'none', p: 0}}>
                                {t('here')}
                            </Button>
                        </Typography>
                        <img src="/image/images-2.png"/>
                    </Box>
                    <Box>
                        <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepThree')}:</span> {t('clickOnChatZalo')}
                            <Button className="text-field-input" onClick={() => handleDashboard()}
                                    sx={{textDecoration: 'underline', textTransform: 'none', p: 0}}>
                                {t('here')}
                            </Button>
                        </Typography>
                        <img src="/image/Screenshot%20at%20Sep%2016%2010-44-04.png"/>
                    </Box>
                  <Box>
                    <Typography mb={1} sx={{display:'flex'}}><span style={{fontWeight: 'bold', marginRight:'4px'}}>{t('stepFour')}:</span>
                      {t('findCustomerInfo')}
                    </Typography>
                    <img src="/image/Instruction-images-1.png"/>
                  </Box>
                  <Box>
                    <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepFive')}:</span> {t('contentStepTwo')}</Typography>
                    <img src="/image/Instruction-images-2.png"/>
                  </Box>
                  <Box>
                    <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepSix')}:</span> {t('contentStepThree')}</Typography>
                    <img src="/image/Instruction-images-3.png"/>
                  </Box>
                  <Box>
                    <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepSeven')}:</span> {t('contentStepFour')}</Typography>
                    <img src="/image/Instruction-images-4.png"/>
                  </Box>
                  <Box>
                    <Typography mb={1}><span style={{fontWeight: 'bold'}}>{t('stepEight')}:</span> {t('contentStepFive')}</Typography>
                    <img src="/image/Instruction-images-5.png"/>
                  </Box>
                </Slider>
              </Box>
            </Box>
            <Box
              sx={{
                position: 'sticky',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '8px 16px',
                bgcolor: colors.paleblueColor,
                zIndex: 1
              }}
            >
              <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                {t('close')}
              </Button>
            </Box>
          </Box>
        </Modal>
    );
}
