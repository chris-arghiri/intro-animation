import { FunctionComponent, useRef, useEffect } from 'react';
import styles from './App.module.css';

import { gsap } from 'gsap';

type AppProps = { text: string };

const App: FunctionComponent<AppProps> = ({ text }) => {
  const preloader = useRef<HTMLDivElement | null>(null);
  const desOnlyTop = useRef<HTMLSpanElement | null>(null);
  const desFull = useRef<HTMLSpanElement | null>(null);
  const desOnlyBott = useRef<HTMLSpanElement | null>(null);
  const desTop = useRef<HTMLSpanElement[] | any>([]);
  const desBott = useRef<HTMLSpanElement[] | any>([]);

  const addSetToTimeline = (
    timeline: gsap.core.Timeline,
    ref: any,
    props: any,
    position?: string | number
  ) => {
    timeline.add(gsap.set(ref, props), position);
  };

  const addToTimeline = (
    timeline: gsap.core.Timeline,
    ref: any,
    props: any,
    position?: string | number
  ) => {
    timeline.add(gsap.to(ref, props), position);
  };

  useEffect(() => {
    let timeline = gsap.timeline({ delay: 0.2 });
    addToTimeline(timeline, desOnlyBott.current, {
      opacity: 1
    });
    addToTimeline(timeline, desOnlyTop.current, { opacity: 1 }, '<');
    addToTimeline(
      timeline,
      desTop.current,
      {
        opacity: 1,
        stagger: -0.1
      },
      '<'
    );
    addToTimeline(
      timeline,
      desBott.current,
      {
        opacity: 1,
        stagger: 0.1
      },
      '<'
    );
    addToTimeline(timeline, desFull.current, { opacity: 0 });
    addToTimeline(
      timeline,
      desTop.current,
      {
        opacity: 0,
        stagger: -0.1
      },
      '<'
    );
    addToTimeline(
      timeline,
      desBott.current,
      {
        opacity: 0,
        stagger: 0.1
      },
      '<'
    );
    addToTimeline(
      timeline,
      desOnlyBott.current,
      {
        opacity: 0
      },
      '<'
    );
    addToTimeline(timeline, desOnlyTop.current, { opacity: 0 }, '<');
    addToTimeline(timeline, desTop.current, {
      opacity: 1,
      stagger: 0.1
    });
    addToTimeline(
      timeline,
      desBott.current,
      {
        opacity: 1,
        stagger: -0.1
      },
      '<'
    );
    addToTimeline(timeline, desOnlyTop.current, { opacity: 1 }, '<0.5');
    addToTimeline(timeline, desOnlyBott.current, { opacity: 1 }, '<');
    addToTimeline(timeline, desFull.current, { opacity: 1 }, '<');
    addToTimeline(timeline, desTop.current, { opacity: 0, stagger: 0.1 }, '>');
    addToTimeline(
      timeline,
      desBott.current,
      { opacity: 0, stagger: -0.1 },
      '<'
    );
    addToTimeline(timeline, desOnlyTop.current, { opacity: 0 }, '<0.5');
    addToTimeline(timeline, desOnlyBott.current, { opacity: 0 }, '<');
    addSetToTimeline(
      timeline,
      preloader.current,
      {
        backgroundColor: 'black'
      },
      '>'
    );
    addToTimeline(timeline, desFull.current, { color: 'white' }, '<');
    timeline.duration(4).play();
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div
      className={styles.App}
      ref={(el) => {
        preloader.current = el;
      }}>
      <div className={styles.Wrap}>
        {[text, text, text, text, text].map((item, index) => {
          return (
            <span
              className={styles.Top}
              key={`span-${index}`}
              ref={(el) => {
                desTop.current[index] = el;
              }}>
              {item}
            </span>
          );
        })}
        <span
          className={styles.OnlyTop}
          ref={(el) => {
            desOnlyTop.current = el;
          }}>
          {text}
        </span>
        <span
          className={styles.Full}
          ref={(el) => {
            desFull.current = el;
          }}>
          {text}
        </span>
        <span
          className={styles.OnlyBott}
          ref={(el) => {
            desOnlyBott.current = el;
          }}>
          {text}
        </span>
        {[text, text, text, text, text].map((item, index) => {
          return (
            <span
              className={styles.Bott}
              key={`span-${index}`}
              ref={(el) => (desBott.current[index] = el)}>
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default App;
