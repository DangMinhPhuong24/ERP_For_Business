import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const Notification = ({ loading, data, titleTable, isSearch }) => {
    const { t } = useTranslation();

    return (
        <>
            {loading && data?.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={titleTable.length}>
                        <Typography
                            variant="body1"
                            color="textSecondary"
                            align="center"
                            style={{ fontSize: '14px', textAlign: 'center' }}
                        >
                            {t("loading")}
                        </Typography>
                    </TableCell>
                </TableRow>
            ) : isSearch && data?.length === 0 ? (
              <TableRow>
                  <TableCell colSpan={titleTable.length}>
                      <Typography
                        variant="body1"
                        color="error"
                        align="center"
                        style={{ fontSize: '14px', textAlign: 'center' }}
                      >
                          {t("noSuitableResultsFound")}
                      </Typography>
                  </TableCell>
              </TableRow>
            ) : (
                data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={titleTable.length}>
                            <Typography
                                variant="body1"
                                color="textSecondary"
                                align="center"
                                style={{ fontSize: '14px', textAlign: 'center' }}
                            >
                                {t("noData")}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )
            )}
        </>
    );
};

export default Notification;
