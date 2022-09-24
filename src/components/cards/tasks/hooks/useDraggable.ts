import {useEffect, useState} from "react";

export const useDraggable = function (taskRef) {

    const [pressed, setPressed] = useState(false);
    const [currentPos, setCurrentPos] = useState({x: 0, y: 0});
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    useEffect(() => {
        if (taskRef.current) {
            taskRef.current.addEventListener('mouseleave', handleMouseUp);
            taskRef.current.addEventListener('mousedown', handleMouseDown)
        }
    }, []);

    useEffect(() => {
        if (!pressed) {
            return;
        }

        taskRef.current.addEventListener('mousemove', handleDragStart);
        taskRef.current.addEventListener('mouseup', handleMouseUp);

        return () => {
            taskRef.current.removeEventListener('mousemove', handleDragStart);
            taskRef.current.removeEventListener('mouseup', handleMouseUp);
        }
    }, [pressed]);


    const handleMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setMousePos({
            x: e.pageX - currentPos.x,
            y: e.pageY - currentPos.y
        })
        setPressed(true);
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setPressed(false);
        setCurrentPos({
            x: null,
            y: null
        })
    }

    const handleDragStart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (pressed) {
            const x = e.pageX - mousePos.x;
            const y = e.pageY - mousePos.y;
            setCurrentPos({x, y});
        }
    }

    return {currentPos, dragging: pressed};
}
