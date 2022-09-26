import { useEffect, useState } from 'react';

export const useDraggable = function (taskRef, parentRef, taskItem) {
    const [pressed, setPressed] = useState(false);
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        let currentTaskRef = taskRef.current;
        if (currentTaskRef) {
            currentTaskRef.classList.remove('transition-up');
            currentTaskRef.classList.remove('transition-down');
            currentTaskRef.addEventListener('mouseleave', handleMouseLeave);
            currentTaskRef.addEventListener('mousedown', handleMouseDown);
            document.addEventListener('taskmove', handleTaskMove);
            document.addEventListener('taskresetpos', handleResetPos);
        }
        return () => {
            if (currentTaskRef) {
                currentTaskRef.removeEventListener(
                    'mouseleave',
                    handleMouseLeave
                );
                currentTaskRef.removeEventListener(
                    'mousedown',
                    handleMouseDown
                );
            }
            document.removeEventListener('taskmove', handleTaskMove);
            document.removeEventListener('taskresetpos', handleResetPos);
        };
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
        };
    }, [pressed, taskRef]);

    const handleMouseLeave = (e) => {
        setPressed(false);
    };
    const handleMouseDown = (e) => {
        //set z-index to maximum

        setMousePos({
            x: e.pageX - currentPos.x,
            y: e.pageY - currentPos.y,
        });
        setPressed(true);
        e.preventDefault();
        e.stopPropagation();
    };

    const handleMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        parentRef.current.dispatchEvent(
            new CustomEvent('taskdrop', {
                detail: {
                    taskRef: taskRef,
                    draggedItem: taskItem,
                },
            })
        );

        setPressed(false);
    };

    const onMouseMove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (pressed) {
            const x = e.pageX - mousePos.x;
            const y = e.pageY - mousePos.y;
            setCurrentPos({ x, y });
            document.dispatchEvent(
                new CustomEvent('taskmove', {
                    detail: {
                        currentTaskRef: taskRef,
                    },
                })
            );
        }
    };

    const handleTaskReset = (e) => {
        setCurrentPos({ x: null, y: null });
    };

    const handleTaskMove = (e) => {
        const { currentTaskRef } = e.detail;

        if (currentTaskRef.current === taskRef.current) {
            return;
        }
        // if intersecting with the current task, then transition the task either up or down
        const movingTaskRect = currentTaskRef.current.getBoundingClientRect();
        const taskRect = taskRef.current.getBoundingClientRect();
        const parentTaskRect = parentRef.current.getBoundingClientRect();

        // if the taskRef position is outside  the parentRef, then move the task down
        if (movingTaskRect.top >= parentTaskRect.bottom) {
            taskRef.current.classList.remove('transition-up');
            taskRef.current.classList.add('transition-down');
        } else if (movingTaskRect.bottom <= taskRect.bottom) {
            taskRef.current.classList.add('transition-down');
        }
    };

    const handleResetPos = (e) => {
        taskRef.current.classList.remove('transition-up');
        taskRef.current.classList.remove('transition-down');
    };

    return { currentPos, pressed };
};
