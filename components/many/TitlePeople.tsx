import { useRef, MouseEvent } from 'react';
import TitlePeopleCurrent from 'components/many/TitlePeopleCurrent';
import TitlePeopleLater from 'components/many/TitlePeopleLater';
import * as s from 'styles/many/TitlePeople';

export default function TitlePeople() {
  const refMembers = useRef<HTMLDivElement>(null);

  const click$button = () => {
    if (refMembers.current) {
      refMembers.current.classList.toggle('visible');
    }
  };

  const click$list = (e: MouseEvent) => {
    if (refMembers.current) {
      if (e.target instanceof HTMLDivElement) {
        if (refMembers.current === e.target) {
          refMembers.current.classList.remove('visible');
        }
      }
    }
  };

  return (
    <>
      <s.Button>
        <button onClick={click$button}>멤버</button>
      </s.Button>
      <s.Users ref={refMembers} onClick={click$list}>
        <s.UsersContainer>
          <TitlePeopleCurrent />
          <TitlePeopleLater />
        </s.UsersContainer>
      </s.Users>
    </>
  );
}
