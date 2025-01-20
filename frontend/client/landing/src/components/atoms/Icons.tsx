import { Menu, X, Bell } from "lucide-react"
import * as T from "@/types";
import { FC } from "react"
import { SocialIcon as SI } from 'react-social-icons'



export const MenuIcon: FC<T.IconProps> = ({ className }) => {
    return <Menu className={className} />
}

export const CloseIcon: FC<T.IconProps> = ({ className }) => {
    return <X className={className} />
}

export const BellIcon: FC<T.IconProps> = ({ className }) => {
    return <Bell className={className} />
}

// Social Icons
export const SocialIcon: FC<T.SocialIconProps> = ({ className, url, network }) => {
    return <SI url={url} network={network} className={className} />
}

