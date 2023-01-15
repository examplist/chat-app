import { useRouter } from 'next/router';
import * as s from 'styles/home/CardGroup';
import { Datum } from 'components/home/ManyList';

export default function CardGroup({ id, title }: Datum) {
  const router = useRouter();

  const click$card = () => {
    router.push(`/many/${id}`);
  };

  return <s.Card onClick={click$card}>{title}</s.Card>;
}
