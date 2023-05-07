import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

import './Confetti.css';

const Confetti: React.FC<Props> = ({ showConfetti, setShowConfetti }) => {
  const confettiRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];
    let positions = 100
    let H = window.innerHeight;
    let W = window.innerWidth;

    let ctx: null | CanvasRenderingContext2D;
    if (confettiRef.current !== null) {
      ctx = confettiRef.current.getContext('2d');
    }

    function setCanvasSize() {
      if (confettiRef.current !== null && ctx !== null) {
        confettiRef.current.width = W;
        confettiRef.current.height = H;
        confettiRef.current.style.width = window.innerWidth + 'px';
        confettiRef.current.style.height = window.innerHeight + 'px';
        ctx.scale(1, 1);
      }
    }

    const startPositions = () => {
      const record = Array(positions).map((_, index) => {
        return {
          x: anime.random(0, W),
          y: -128
        }
      })
      return record;
    }

    const endPosition = () => {
      return {
        x: anime.random(-(W / 4), (W * 1.2)),
        y: H,
      }
    }

    const createSquare = (position: { x: number, y: number }) => {
      let confetti: confetti = {
        x: position.x,
        y: position.y,
        width: anime.random(3, 8),
        height: anime.random(1, 8),
        delay: anime.random(0, 200),
        duration: anime.random(3000, 12000),
        color: colors[anime.random(0, colors.length - 1)],
        endPos: endPosition(),
        draw: () => { },
      }
      confetti.draw = () => {
        if (ctx !== null) {
          ctx.beginPath()
          ctx.rect(confetti.x, confetti.y, confetti.width, confetti.height)
          ctx.scale(-1, 1);
          ctx.lineJoin = "round"
          ctx.globalAlpha = 0.9
          ctx.fillStyle = confetti.color
          ctx.fill()
        }
      }
      return confetti
    }

    const animateSquares = () => {
      let particules: any = []
      let confettis = startPositions()

      confettis.forEach(item => {
        particules[particules.length] = createSquare(item)
      })

      anime.timeline().add({
        targets: particules,
        x: (confetti: { endPos: { x: number } }) => { return confetti.endPos.x },
        y: (confetti: { endPos: { y: number } }) => { return confetti.endPos.y },
        duration: (confetti: any) => { return confetti.duration },
        delay: (confetti: any) => { return confetti.delay },
        easing: 'easeOutSine',
        update: renderSquare,
      })
    }

    const renderSquare = (anim: any) => {
      for (let i = 0; i < anim.animatables.length; i++) {
        anim.animatables[i].target.draw();
      }
    }

    const render = anime({
      duration: Infinity,
      update: function () {
        if (ctx !== null) {
          ctx.clearRect(0, 0, W, H);
        }
      }
    });

    if (showConfetti) {
      const renderLoop = () => {
        animateSquares();
        render.play()
        anime({}).finished.then(renderLoop);
      }

      renderLoop()
      setCanvasSize()
    }
  }, [showConfetti]);

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

export default Confetti;
