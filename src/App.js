import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  max-width: 600px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const Board = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled(motion.div)`
  background-color: rgba(255, 255, 255);
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
`;
const Button = styled(motion.button)`
  position: absolute;
  bottom: 100px;
  height: 30px;
  background-color: rgba(255, 255, 255);
  color: rgba(9, 132, 227, 1);
  border: 0;
  border-radius: 3px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  cursor: pointer;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardVars = {
  initial: (i) => ({
    scale: 1,
    x: 0,
    y: 0
  }),
  hover: (i) => ({
    scale: 1.1,
    y: i ? -10 : 10,
    x: i ? -15 : 15
  })
};
const BtnVars = {
  click: {
    scale: 1.2,
    color: "rgba(255, 118, 117,1.0)"
  }
};
const overlayVars = {
  initial: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" }
};

export default function App() {
  const [id, setId] = useState(null);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  const boxClicked = (i) => setId(i);
  return (
    <Container>
      <Boards>
        <Board
          onClick={() => boxClicked("1")}
          layoutId="1"
          variants={BoardVars}
          custom={true}
          initial="initial"
          whileHover="hover"
        />
        <Board>{!clicked ? <Circle layoutId="circle" /> : null}</Board>
        <Board>{clicked ? <Circle layoutId="circle" /> : null}</Board>
        <Board
          onClick={() => boxClicked("2")}
          layoutId="2"
          variants={BoardVars}
          custom={false}
          initial="initial"
          whileHover="hover"
        />
      </Boards>
      <Button onClick={toggleClicked} variants={BtnVars} whileTap="click">
        Switch
      </Button>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => boxClicked(null)}
            variants={overlayVars}
            initial="initial"
            animate="visible"
            exit="exit"
          >
            <Board
              layoutId={id}
              style={{
                width: 400,
                height: 300,
                backgroundColor: "rgba(255, 255, 255)"
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Container>
  );
}
