import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

import './Confetti.css';

const Confetti: React.FC<Props> = ({ showConfetti, setShowConfetti }) => {
  const confettiRef: ConfettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let colors: string[] = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    let positions: number = 500;
    let H: number = window.innerHeight;
    let W: number = window.innerWidth;
    const refCurrent: HTMLCanvasElement | null = confettiRef.current;
    const ctx = refCurrent?.getContext('2d');

    const setCanvasSize = (): void => {
      if (confettiRef.current !== null && ctx !== null && ctx !== undefined) {
        confettiRef.current.width = W;
        confettiRef.current.height = H;
        confettiRef.current.style.width = window.innerWidth + 'px';
        confettiRef.current.style.height = window.innerHeight + 'px';
        ctx.scale(1, 1);
      };
    };

    const startPositions = (): Array<{ x: number, y: number }> => {
      const record: Array<{ x: number, y: number }> = Array(positions).fill(0).map(() => {
        return {
          x: anime.random(0, W),
          y: -128
        };
      });
      return record;
    };

    const endPosition = (): { x: number, y: number } => {
      return {
        x: anime.random(-(W * 0.2), (W * 1.2)),
        y: H,
      };
    };

    const createSquare = (position: { x: number, y: number }) => {
      let confetti: confetti = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        delay: 0,
        duration: 0,
        color: '',
        endPos: {},
        draw: () => { },
      }
      confetti.x = position.x
      confetti.y = position.y
      confetti.width = anime.random(3, 8)
      confetti.height = anime.random(1, 8)
      confetti.delay = anime.random(0, 1500)
      confetti.duration = anime.random(2000, 7000)
      confetti.color = colors[anime.random(0, colors.length - 1)]
      confetti.endPos = endPosition()
      confetti.draw = (): void => {
        if (ctx !== null && ctx !== undefined) {
          ctx.beginPath();
          ctx.rect(confetti.x, confetti.y, confetti.width, confetti.height);
          ctx.scale(-1, 1);
          ctx.lineJoin = "round";
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = confetti.color;
          ctx.fill();
        }
      }
      return confetti;
    }

    const animateSquares = (): any => {
      let particules: confetti[] = [];
      let confettis = startPositions();

      confettis.forEach(item => {
        particules[particules.length] = createSquare(item);
      });

      let animation = anime.timeline().add({
        targets: particules,
        x: (confetti: { endPos: { x: number } }) => { return confetti.endPos.x },
        y: (confetti: { endPos: { y: number } }) => { return confetti.endPos.y },
        duration: (confetti: any) => { return confetti.duration },
        delay: (confetti: any) => { return confetti.delay },
        easing: 'easeOutSine',
        update: renderSquare,
      }).finished.then(() => setShowConfetti(false));
      return animation;
    }

    const renderSquare = (anim: any) => {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
      }
    }

    const render = anime({
      duration: Infinity,
      update: function (): void {
        ctx?.clearRect(0, 0, W, H);
      }
    });

    if (showConfetti) {
      const renderLoop = (): void => {
        animateSquares();
        render.play();
      };

      renderLoop();
      setCanvasSize();
    }
  }, [
    showConfetti,
    confettiRef,
    setShowConfetti,
  ]);

  const handleClose = (): void => {
    setShowConfetti(false);
  }

  return (
    <div className="confetti-wrapper" onClick={handleClose}>
      <canvas ref={confettiRef}></canvas>
    </div>
  )
}

interface Props {
  showConfetti: boolean;
  setShowConfetti: React.Dispatch<React.SetStateAction<boolean>>;
}

interface confetti {
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  color: string;
  duration: number;
  endPos: object;
  draw: Function;
}

type ConfettiRef = React.RefObject<HTMLCanvasElement>;

export default Confetti;
