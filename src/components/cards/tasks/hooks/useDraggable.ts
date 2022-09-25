import {useEffect, useState} from "react";


export const useDraggable = function (taskRef, parentRef, taskItem) {
    const [pressed, setPressed] = useState(false);
    const [currentPos, setCurrentPos] = useState({x: 0, y: 0});
    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    useEffect(() => {
        if (taskRef.current) {
            taskRef.current.addEventListener('mouseleave', handleMouseLeave);
            taskRef.current.addEventListener('mousedown', handleMouseDown)
        }
    }, []);


    useEffect(() => {
        if (!pressed) {
            return;
        }

        taskRef.current.addEventListener('mousemove', onMouseMove);
        taskRef.current.addEventListener('mouseup', handleMouseUp);
        taskRef.current.addEventListener('taskreset', handleTaskReset);

        return () => {
            taskRef.current.removeEventListener('mousemove', onMouseMove);
            taskRef.current.removeEventListener('mouseup', handleMouseUp);
            taskRef.current.removeEventListener('taskreset', handleTaskReset);
        }
    }, [pressed]);


    const handleMouseLeave = (e) => {
        setPressed(false);
    }
    const handleMouseDown = (e) => {
        setMousePos({
            x: e.pageX - currentPos.x,
            y: e.pageY - currentPos.y
        })
        setPressed(true);
        e.preventDefault();
        e.stopPropagation();
    }


    const handleMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        parentRef.current.dispatchEvent(new CustomEvent('taskdrop', {
            detail: {
                taskRef: taskRef,
                draggedItem: taskItem
            }
        }));

        setPressed(false);
    }

    const onMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (pressed) {
            const x = e.pageX - mousePos.x;
            const y = e.pageY - mousePos.y;
            setCurrentPos({x, y});
        }
    }

    const handleTaskReset = (e) => {
        setCurrentPos({x: null, y: null});
    }


    return {currentPos, pressed};
}
