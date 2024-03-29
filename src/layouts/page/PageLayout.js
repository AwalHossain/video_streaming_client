import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Header from '../dashboard/header';
import Nav from '../dashboard/nav';
//

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
        paddingTop: APP_BAR_DESKTOP + 24,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

const StyledHeader = styled('header')(({ theme }) => ({
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(5, 5, 0),
    },
}));

// ----------------------------------------------------------------------

export default function PageLayout() {
    const [open, setOpen] = useState(false);

    const handleToggleNav = useCallback(() => {
        setOpen((prevOpen) => !prevOpen);
    }, []);

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <StyledRoot>
            <Header onOpenNav={handleToggleNav} />

            {isMobile && <Nav openNav={open} onCloseNav={handleToggleNav} />}

            <Main>
                <Outlet />
            </Main>
        </StyledRoot>
    );
}
