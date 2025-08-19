import React, { useState } from 'react';
import '../styles/EndPage.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import { useEffect, useRef } from 'react';

function EndPage() {
    const currentData = useSelector((state: RootState) => state.data); 
    console.log(currentData);
    const lottieRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
        }
        });

        if (lottieRef.current) {
        observer.observe(lottieRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div className='load-place' ref={lottieRef}>
        {isVisible && (
            <>
            <div className='anim-place'>
                <DotLottieReact
                src="https://lottie.host/a2009b69-2f9f-4837-a633-3ed8b09e0dcd/VKAB3DTT6Y.lottie"
                autoplay
                />
            </div>
            <h1>Ответ получен!</h1>
            </>
        )}
        </div>
    );
}

export default EndPage;