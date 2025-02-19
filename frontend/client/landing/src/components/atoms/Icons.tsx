import {Bell, ChevronLeft, ChevronRight, Copy, CopyCheck, Languages, Menu, Plus, X, PowerOff} from "lucide-react"
import * as T from "@/types";
import {FC} from "react"
import {SocialIcon as SI} from 'react-social-icons'

export const MenuIcon: FC<T.IconProps> = ({className}) => {
  return <Menu className={className}/>
}

export const CloseIcon: FC<T.IconProps> = ({className}) => {
  return <X className={className}/>
}

export const BellIcon: FC<T.IconProps> = ({className}) => {
  return <Bell className={className}/>
}

export const CopyIcon: FC<T.IconProps> = ({className}) => {
  return <Copy className={className}/>;
};

export const CopiedIcon: FC<T.IconProps> = ({className}) => {
  return <CopyCheck className={className}/>;
};

export const AddIcon: FC<T.IconProps> = ({className}) => {
  return <Plus className={className}/>;
};

export const LeftIcon: FC<T.IconProps> = ({className}) => {
  return <ChevronLeft className={className}/>;
};

export const RightIcon: FC<T.IconProps> = ({className}) => {
  return <ChevronRight className={className}/>;
};

export const LanguageIcon: FC<T.IconProps> = ({className}) => {
  return <Languages className={className}/>;
};

export const PowerOffIcon: FC<T.IconProps> = ({className}) => {
  return <PowerOff className={className}/>;
};

// Social Icons
export const SocialIcon: FC<T.SocialIconProps> = ({className, url, network}) => {
  return <SI url={url} network={network} className={className}/>
}

