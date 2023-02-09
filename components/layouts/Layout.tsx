import { FC } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';
import { Navbar, Sidebar } from '../ui';

interface Props {
    title?: string,
    children: any
}

export const Layout:FC <Props> = ({ title = 'Open Jira', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{ title }</title>
            </Head>

            {/* Sidebar */}
            <Navbar />
            {/* Sidebar */}
            <Sidebar />

            <Box sx={{ padding: '10px 20px' }}>
                { children }
            </Box>

        </Box>
    )
}
