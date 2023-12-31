import { useTheme } from '@emotion/react';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { Box, Button, Grid, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetAllVideosQuery } from '../../redux/features/video/videoApi';
import PaginationControl from '../paginate/PaginationControl';
import VideoGridItem from './VideoGridItem';

const VideoGrid = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    const { search, filter, sort, tags } = useSelector((state) => state.filter);

    const handlePageSizeChange = (newPageSize) => {
        setPage(1);
        setPageSize(newPageSize)
    }

    const params = {
        page: page,
        pageSize: pageSize,
        sortBy: 'createdAt',
        sortOrder: sort,
        searchTerm: search,
    };

    if (tags.length > 0) {
        params.tags = tags;
    }

    const { isFetching, isLoading, isError, error, data, refetch } = useGetAllVideosQuery(params, { refetchOnReconnect: true, refetchOnMountOrArgChange: true, refetchOnFocus: true, });

    let content;
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));


    if (isLoading || isFetching) {
        content =
            <Grid container wrap='wrap' spacing={2}>
                {Array.from({ length: 15 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <VideoGridItem key={index} isLoading={isLoading} isFetching={isFetching} />
                    </Grid>
                ))}
            </Grid>
    } else if (isError) {
        content = <div>{error.message}</div>;
    } else if (data?.data?.length === 0) {
        content = <div>No data found</div>
    } else if (data?.data?.length > 0) {
        content =
            <Grid container wrap='wrap' spacing={2}>
                {data?.data?.map((video) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={video._id}>
                        <VideoGridItem video={video} />
                    </Grid>
                ))}
            </Grid>
    } else {
        content = (
            <Box
                flexDirection="column"
                // justifyContent="center"
                alignItems="center"
                // height="100vh"
                textAlign="center"
            >
                <Typography variant="h4" component="div" gutterBottom>
                    Something went wrong
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SvgIcon component={RefreshIcon} />}
                    onClick={() => refetch()}
                >
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box pt={3}>
                {content}
            </Box>
            <PaginationControl
                page={page}
                pageSize={pageSize}
                totalItems={data?.meta?.totalRecords}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
        </Box >
    )
}

export default VideoGrid;