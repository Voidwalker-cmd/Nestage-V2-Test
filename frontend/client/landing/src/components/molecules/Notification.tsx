"use client"

import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {BellIcon, CloseIcon, LeftIcon, RightIcon} from "@/components/atoms/Icons";
import {Button} from "../ui/button";
// import {demoNoti} from "@/const";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {useNotificationStore} from "@/store/notifications";
import {useWebSocket} from "@/hooks/useWebSocket";
import {useWeb3Store} from "@/store";
import * as T from "@/types";

type NotiTypes = { id: number; uuid: string; title: string; message: string }

const Notification = () => {
  const address = useWeb3Store((state) => state.address);
  const {notifications, markAsRead, setAddress} = useNotificationStore();
  useWebSocket();
  
  const [first, setFirst] = useState<T.Notification[] | []>([]);
  const [NotiList, setNotiList] = useState<T.Notification[] | []>([]);
  const [open] = useState(false);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(5);
  const [clicked, setClicked] = useState("");
  const [idz, setIdz] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  
  const Filter = (uuid: string, index: number | string) => {
    let n = min, m = max, p = !!1;
    const updatedArray: T.Notification[] = []
    const l = first.length
    const rawArray = first.filter(obj => obj.uuid !== uuid);
    for (let j = 0; j < rawArray.length; j++) {
      const {...rest} = rawArray[j]
      updatedArray.push({...rest, id: j + 1})
    }
    const u = updatedArray.length
    if (index !== '') {
      if (index === l) {
        if (u === n) {
          p = !!0
          if (n !== 0) {
            m = n
            n -= 5
            setMin(n)
            setMax(m)
          }
        } else {
          m = u
          setMax(m)
        }
      }
    }
    const sliced = updatedArray.slice(n, m)
    if (p) {
      if (sliced[sliced.length - 1].id < max) {
        setMax(updatedArray.length)
      }
    }
    setFirst(updatedArray)
    setNotiList(sliced);
    markAsRead(uuid)
  }
  
  useEffect(() => {
    if (address) setAddress(address)
  }, [address])
  
  useEffect(() => {
    if (notifications) setFirst(notifications)
  }, [notifications])
  
  const setToEmpty = () => {
    setFirst([])
    setNotiList([])
    setMin(0)
    setMax(5)
    setModalOpen(!!0)
  }
  
  const handleNotificationClick = (x: NotiTypes) => {
    setClicked(x.uuid);
    setIdz(x.id)
    setModalOpen(true); // Open the modal
  };
  
  const handleModalClose = (uuid: string, id: number) => {
    Filter(uuid, id); // Call Filter with the parameters
    setModalOpen(false); // Close the modal
  };
  
  useEffect(() => {
    if (!open && clicked) {
      Filter(clicked, '')
    }
  }, [open]);
  
  const Cut = (n: number = min, m: number = max) => {
    setMin(n);
    // if (m === first.length) {
    //   setMax(5);
    // } else {
    setMax(m);
    // }
    const updatedArray = first.slice(n, m);
    setNotiList(updatedArray);
  }
  
  useEffect(() => {
    if (first.length) Cut()
  }, [first])
  
  return (
    <Popover>
      <PopoverTrigger>
        <BellIcon className="w-6 lg:w-5 h-6 lg:h-5 !text-black dark:!text-white cursor-pointer"/>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-16 lg:!mr-14 !mt-1">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            {first.length ? (
              <p className="text-sm text-muted-foreground">
                {first.length} Unread Notifications - {min} - {max}
              </p>
            ) : ("")}
          </div>
          {NotiList.length ? (
            <>
              <div className="border-y border-gray-500">
                <div className="flex flex-col py-2 px-3">
                  {NotiList.map((x, i) => (
                    <div onClick={() => handleNotificationClick(x)} key={`noti-${i}-${x.uuid}`}
                         className={`${i + 1 < NotiList.length ? "border-b border-gray-500" : ""} cursor-pointer z-[1] flex justify-between px-1 py-2.5`}
                    >
                      <div>
                        <h3 className={"text-base font-bold line-clamp-1"}>{x.title}</h3>
                        <p className={"text-xs line-clamp-1"}>{x.message}</p>
                      </div>
                      <Button onClick={() => Filter(x.uuid, x.id)} variant={"ghost"} size={"icon"}
                              className="!px-0 !py-0 hover:!bg-transparent hover:!text-red-500"><CloseIcon/></Button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between z-[2]">
                <span
                  className={`${min === 0 ? "cursor-not-allowed text-gray-500 pointer-event-none" : "cursor-pointer text-white"}`}
                  onClick={() => {
                    if (min === 0) {
                      Cut(0, 5)
                    } else {
                      if (min + 5 > first.length) {
                        Cut(min - 5, min)
                      } else {
                        Cut(min - 5, max - 5)
                      }
                    }
                  }}><LeftIcon/></span>
                <Button onClick={setToEmpty} variant="link">Mark all as read</Button>
                <span
                  className={`${max === first.length ? "cursor-not-allowed text-gray-500 pointer-event-none" : "cursor-pointer text-white"}`}
                  onClick={() => {
                    if (max === first.length) {
                      Cut(min, first.length)
                    } else if (max + 5 >= first.length) {
                      Cut(min + 5, first.length)
                    } else {
                      Cut(min + 5, max + 5)
                    }
                  }}><RightIcon/></span>
              </div>
            </>
          ) : (
            <span className="text-center italic font-semibold">You have no unread notifications</span>
          )}
        </div>
      </PopoverContent>
      <ShowModal
        title={NotiList.find((n) => n.uuid === clicked)?.title || ""}
        message={NotiList.find((n) => n.uuid === clicked)?.message || ""}
        open={modalOpen}
        setOpen={setModalOpen}
        onClose={() => handleModalClose(clicked, idz)} // Pass the Filter parameters
      />
    </Popover>
  )
}

export default Notification


const ShowModal = (
  {
    title,
    message,
    open,
    setOpen,
    onClose,
  }: {
    title: string;
    message: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    onClose: () => void;
  }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        onClose(); // Call onClose when the modal is closed
      }
      setOpen(isOpen); // Update the modal open state
    }}>
      <DialogContent className="sm:max-w-[425px] !bg-accent">
        <DialogHeader>
          <DialogTitle className={"!tracking-normal"}>{title}</DialogTitle>
        </DialogHeader>
        <div className={"!tracking-normal"}>{message}</div>
        <DialogFooter>
          <div className={"w-full flex items-center justify-between"}>
            <span
              className="italic text-red-500 text-sm tracking-wider">closing this notification marks it as read!</span>
            <Button type="button" onClick={() => {
              onClose()
              setOpen(false)
            }}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
