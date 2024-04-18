/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const UsbIndexLazyImport = createFileRoute('/usb/')()
const NodesIndexLazyImport = createFileRoute('/nodes/')()
const NodeUpgradeIndexLazyImport = createFileRoute('/node-upgrade/')()
const InfoIndexLazyImport = createFileRoute('/info/')()
const FirmwareUpgradeIndexLazyImport = createFileRoute('/firmware-upgrade/')()
const AboutIndexLazyImport = createFileRoute('/about/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const UsbIndexLazyRoute = UsbIndexLazyImport.update({
  path: '/usb/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/usb/index.lazy').then((d) => d.Route))

const NodesIndexLazyRoute = NodesIndexLazyImport.update({
  path: '/nodes/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/nodes/index.lazy').then((d) => d.Route))

const NodeUpgradeIndexLazyRoute = NodeUpgradeIndexLazyImport.update({
  path: '/node-upgrade/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/node-upgrade/index.lazy').then((d) => d.Route),
)

const InfoIndexLazyRoute = InfoIndexLazyImport.update({
  path: '/info/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/info/index.lazy').then((d) => d.Route))

const FirmwareUpgradeIndexLazyRoute = FirmwareUpgradeIndexLazyImport.update({
  path: '/firmware-upgrade/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/firmware-upgrade/index.lazy').then((d) => d.Route),
)

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  path: '/about/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about/': {
      preLoaderRoute: typeof AboutIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/firmware-upgrade/': {
      preLoaderRoute: typeof FirmwareUpgradeIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/info/': {
      preLoaderRoute: typeof InfoIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/node-upgrade/': {
      preLoaderRoute: typeof NodeUpgradeIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/nodes/': {
      preLoaderRoute: typeof NodesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/usb/': {
      preLoaderRoute: typeof UsbIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AboutIndexLazyRoute,
  FirmwareUpgradeIndexLazyRoute,
  InfoIndexLazyRoute,
  NodeUpgradeIndexLazyRoute,
  NodesIndexLazyRoute,
  UsbIndexLazyRoute,
])

/* prettier-ignore-end */
