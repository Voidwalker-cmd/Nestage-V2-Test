"use client"

import { useState, useEffect } from "react";

type DeviceSize = "sm" | "md" | "lg" | "null";

const useDeviceSize = (): DeviceSize => {
    const [deviceSize, setDeviceSize] = useState<DeviceSize>("null");

    const checkDeviceSize = () => {
        if (window.matchMedia("(max-width: 640px)").matches) {
            setDeviceSize("sm");
        } else if (window.matchMedia("(max-width: 1024px)").matches) {
            setDeviceSize("md");
        } else {
            setDeviceSize("lg");
        }
    };

    useEffect(() => {
        checkDeviceSize();

        const handleResize = () => {
            checkDeviceSize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return deviceSize;
};

export default useDeviceSize;
