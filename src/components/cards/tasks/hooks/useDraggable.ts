import {useEffect, useState} from "react";


export const useDraggable = function (taskRef, parentRef, taskItem) {
    const [pressed, setPressed] = useState(false);
    const [currentPos, setCurrentPos] = useState({x: 0, y: 0});
    const [mousePos, setMousePos] = useState({x: 0, y: 0});


    useEffect(() => {
        let currentTaskRef = taskRef.current;
        if (currentTaskRef) {
            currentTaskRef.addEventListener('mouseleave', handleMouseLeave);
            currentTaskRef.addEventListener('mousedown', handleMouseDown)
        }
        return () => {
            if (currentTaskRef) {
                currentTaskRef.removeEventListener('mouseleave', handleMouseLeave);
                currentTaskRef.removeEventListener('mousedown', handleMouseDown)
            }
        }
    }, []);


    useEffect(() => {
        const currentTaskRef = taskRef.current;
        if (!pressed) {
            return;
        }

        currentTaskRef.addEventListener('mousemove', onMouseMove);
        currentTaskRef.addEventListener('mouseup', handleMouseUp);
        currentTaskRef.addEventListener('taskreset', handleTaskReset);

        return () => {
            currentTaskRef.removeEventListener('mousemove', onMouseMove);
            currentTaskRef.removeEventListener('mouseup', handleMouseUp);
            currentTaskRef.removeEventListener('taskreset', handleTaskReset);
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
