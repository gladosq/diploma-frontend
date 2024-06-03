import s from './MainAppLayout.module.scss';
import {Outlet} from 'react-router-dom';
import Header from '../Header/Header.tsx';
import {motion} from 'framer-motion';


export default function MainAppLayout() {

  return (
    <div className={s.outerWrapper}>
      <div className={s.wrapper}>
        <Header/>
        <motion.main
          initial={{opacity: 0}}
          animate={{opacity: 1, scale: [0.8, 1, 0.9, 1]}}
          exit={{opacity: 0}}
          transition={{
            duration: 0.5,
            type: 'spring',
            times: [0, 0.1, 0.9, 1]
          }}
        >
        <div className={s.contentWrapper}>
          <Outlet/>
        </div>
        </motion.main>
      </div>
      <div className={s.footer}>
        <div className={s.footerInner}>
          <a href="">gladosq@gmail.com</a>
          <a href="">https://github.com/gladosq</a>
        </div>
      </div>
    </div>
  );
}
