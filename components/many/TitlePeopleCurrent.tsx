import { useManyStore } from 'store/many';
import * as s from 'styles/many/TitlePeopleCurrent';

export default function TitlePeopleCurrent() {
  const { curPeople } = useManyStore();
  const elements = [];

  for (const key in curPeople) {
    const curPerson = curPeople[key];
    elements.push(<span key={key}>{curPerson.name} </span>);
  }

  return (
    <s.Container>
      <s.Title>현재 멤버</s.Title>
      <s.ListContainer>{elements}</s.ListContainer>
    </s.Container>
  );
}
