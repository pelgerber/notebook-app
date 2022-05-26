import React, { useEffect, useState } from "react";


export default function RestrictRender({ children, server, client}) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted && client) {
        return null;
    }

    if (isMounted && server) {
        return null;
    }

    return children;
}