import { useAuthStore } from 'store/auth';
import { useRef } from 'react';
import { alertError } from 'utils/alert';
import * as s from 'styles/profile/Name';
import { LoadStatus } from 'pages/profile';

export default function Name({ loadStatus }: { loadStatus: LoadStatus }) {
  const { loading, setLoading } = loadStatus;
  const { name, id: userid, changeName } = useAuthStore();
  const username = name ? name : '';
  const refNameSection = useRef<HTMLElement>(null);
  const refInputName = useRef<HTMLInputElement>(null);

  const click$edit = () => {
    refNameSection.current?.classList.add('edit-mode');
  };
  const click$cancel = () => {
    const $inputName = refInputName.current;
    const $nameSection = refNameSection.current;
    if (!$inputName || !$nameSection) {
      return;
    }
    $inputName.value = username;
    $nameSection.classList.remove('edit-mode');
  };
  const click$confirm = async () => {
    setLoading(true);
    const $inputName = refInputName.current;
    if (!$inputName) {
      return;
    }
    if ($inputName.value.length === 0) {
      alertError('이름은 한 글자 이상이어야 합니다.');
      setLoading(false);
      return;
    }
    if (!userid) {
      setLoading(false);
      return;
    }
    const response = await fetch(`/api/auth?user=${userid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: $inputName.value, photo: null }),
    });
    if (response.status !== 204) {
      alertError('수정이 되지 않았습니다.');
    } else {
      changeName($inputName.value);
      refNameSection.current?.classList.remove('edit-mode');
    }
    setLoading(false);
  };

  return (
    <s.Section ref={refNameSection}>
      <s.Text id="profile-name">{username}</s.Text>
      <s.Edit onClick={click$edit} disabled={loading} id="profile-name__to-edit">
        수정
      </s.Edit>
      <s.Input
        type={'text'}
        ref={refInputName}
        defaultValue={username}
        id="profile-name__edit-input"
      />
      <s.Cancel onClick={click$cancel} disabled={loading}>
        취소
      </s.Cancel>
      <s.Confirm
        onClick={click$confirm}
        disabled={loading}
        id="profile-name__edit-confirm"
      >
        확인
      </s.Confirm>
    </s.Section>
  );
}
