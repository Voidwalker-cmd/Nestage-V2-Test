import { LinkProps } from '@tanstack/react-router'

export interface AuthUser {
  accountNo: string
  email: string
  role: string[]
  exp: number
}

export interface AuthState {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  auth: {
    user: AuthUser | null
    setUser: (user: AuthUser | null) => void
    accessToken: string
    setAccessToken: (accessToken: string) => void
    resetAccessToken: () => void
    reset: () => void
  }
}

export interface Web3State {
  isConnected: boolean;
  masterAddress: string;
  refAddress: string;
  setIsConnected: (isConnected: boolean) => void;
  setMasterAddress: (masterAddress: string) => void;
  setRefAddress: (refAddress: string) => void;
}

interface User {
  name: string
  email: string
  avatar: string
}

interface Team {
  name: string
  logo: React.ElementType
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: React.ElementType
}

type NavLink = BaseNavItem & {
  url: LinkProps['to']
  items?: never
}

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[]
  url?: never
}

type NavItem = NavCollapsible | NavLink

interface NavGroup {
  title: string
  items: NavItem[]
}

interface SidebarData {
  user: User
  teams: Team[]
  navGroups: NavGroup[]
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink }

export interface ParsedStakersData {
  staker: string;
  id?: number;
  uuid?: string;
  amount: string;
  amtUSD?: number;
  pftUSD?: number;
  startDate: number;
  endDate: number;
  profit: string;
}

export interface rawStakers {
  id: bigint;
  amount: bigint;
  startDate: bigint;
  endDate: bigint;
  profit: bigint;
  staker: string
}