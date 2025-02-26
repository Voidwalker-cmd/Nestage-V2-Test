import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
// @ts-ignore
import {AxiosError} from 'axios'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import {RouterProvider, createRouter} from '@tanstack/react-router'
import {useAuthStore} from '@/stores/authStore'
import {handleServerError} from '@/utils/handle-server-error'
import {toast} from '@/hooks/use-toast'
import {FontProvider} from './context/font-context'
import {ThemeProvider} from './context/theme-context'
import './index.css'
// Generated Routes
import {routeTree} from './routeTree.gen'
import {DEV, PROD} from './config'
import {ThirdwebProvider} from "thirdweb/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // eslint-disable-next-line no-console
        if (DEV) console.log({failureCount, error})
        
        if (failureCount >= 0 && DEV) return false
        if (failureCount > 3 && PROD) return false
        
        return !(
          error instanceof AxiosError &&
          [401, 403].includes(error.response?.status ?? 0)
        )
      },
      refetchOnWindowFocus: PROD,
      staleTime: 10 * 1000, // 10s
    },
    mutations: {
      onError: (error) => {
        handleServerError(error)
        
        if (error instanceof AxiosError) {
          if (error.response?.status === 304) {
            toast({
              variant: 'destructive',
              title: 'Content not modified!',
            })
          }
        }
      },
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          toast({
            variant: 'destructive',
            title: 'Session expired!',
          })
          useAuthStore.getState().auth.reset()
          const redirect = `${router.history.location.href}`
          // TODO: Create this paths and remove the ts-ignore
          // @ts-ignore
          // router.navigate({to: '/', search: {nexturl:
          //     redirect}})
        }
        if (error.response?.status === 500) {
          toast({
            variant: 'destructive',
            title: 'Internal Server Error!',
          })
          // TODO: Create this paths and remove the ts-ignore
          // @ts-ignore
          router.navigate({to: '/500'})
        }
        if (error.response?.status === 403) {
          // router.navigate("/forbidden", { replace: true });
        }
        if (error.response?.status === 401) {
          router.navigate("/", { replace: true });
        }
      }
    },
  }),
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {queryClient},
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThirdwebProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme='light' storageKey='nestage-admin-theme'>
            <FontProvider>
              <RouterProvider router={router}/>
            </FontProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ThirdwebProvider>
    </StrictMode>
  )
}
