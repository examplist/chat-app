import { useAuthStore } from 'store/auth';
import { ChangeEvent, useRef } from 'react';
import { FiUpload } from 'react-icons/fi';
import { alertError } from 'utils/alert';
import * as s from 'styles/profile/Photo';
import { LoadStatus } from 'pages/profile';

export default function Photo({ loadStatus }: { loadStatus: LoadStatus }) {
  const { loading, setLoading } = loadStatus;
  const { id: userid, photo, changePhoto } = useAuthStore();
  const userphoto = photo ? photo : '';
  const refInputPhoto = useRef<HTMLInputElement>(null);

  const change$inputPhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    if (!e.target.files || !userid) {
      return;
    }
    const file = e.target.files[0];
    const buffer = await file.arrayBuffer();
    const bufferArray = new Uint8Array(buffer);
    const response = await fetch(`/api/auth?user=${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: null, photo: Array.from(bufferArray) }),
    });
    if (response.status !== 200) {
      alertError('죄송합니다. 수정이 되지 않았습니다.');
    } else {
      const { url } = await response.json();
      changePhoto(url);
    }
    setLoading(false);
  };

  const click$changePhoto = () => {
    refInputPhoto.current?.click();
  };

  return (
    <s.Section>
      <s.Container>
        <s.Img src={userphoto} />
        <s.Edit disabled={loading} onClick={click$changePhoto}>
          <FiUpload />
        </s.Edit>
      </s.Container>
      <input
        type={'file'}
        style={{ display: 'none' }}
        ref={refInputPhoto}
        accept="image/jpeg, image/jpg, image/png"
        onChange={change$inputPhoto}
      />
    </s.Section>
  );
}
