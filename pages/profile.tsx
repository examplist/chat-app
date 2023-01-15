import { useState, Dispatch, SetStateAction } from 'react';
import Photo from 'components/profile/Photo';
import Name from 'components/profile/Name';
import Delete from 'components/profile/Delete';
import * as s from 'styles/profile/page';

export interface LoadStatus {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function profile() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <s.Container>
      <Photo loadStatus={{ loading, setLoading }} />
      <Name loadStatus={{ loading, setLoading }} />
      <Delete loadStatus={{ loading, setLoading }} />
    </s.Container>
  );
}
