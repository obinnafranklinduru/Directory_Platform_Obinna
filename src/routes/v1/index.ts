import express, { Router } from 'express';

import authRoute from './auth.route';
import adminRoute from './admin.route';
import categoryRoute from './category.route';
import mentorRoute from './mentor.route';
import socialLinkRoute from './socialLink.route';
import fileRoute from './file.route';
import whitelistEmailRoute from './whitelistEmail.route';
import docsRoute from './docs.route';
import { ENV } from '../../config';

const router: Router = express.Router();

interface RouteConfig {
    path: string;
    route: Router;
}

const defaultRoutes: RouteConfig[] = [
    {
        path: '/auth',
        route: authRoute,
    },
    {
        path: '/docs',
        route: docsRoute
    },
    {
        path: '/admins',
        route: adminRoute
    },
    {
        path: '/whitelist_email',
        route: whitelistEmailRoute
    },
    {
        path: '/categories',
        route: categoryRoute
    },
    {
        path: '/uploads',
        route: fileRoute
    },
    {
        path: '/social_links',
        route: socialLinkRoute
    },
    {
        path: '/mentors',
        route: mentorRoute
    },
];

const devRoutes: RouteConfig[] = [
    // routes available only in development mode
    {
        path: '/admins',
        route: adminRoute
    },
    {
        path: '/mentors',
        route: mentorRoute
    },
    {
        path: '/categories',
        route: categoryRoute
    },
    {
        path: '/social_links',
        route: socialLinkRoute
    },
    {
        path: '/uploads',
        route: fileRoute
    },
    {
        path: '/whitelist_email',
        route: whitelistEmailRoute
    },
    {
        path: '/docs',
        route: docsRoute
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

/* istanbul ignore next */
if (ENV === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;