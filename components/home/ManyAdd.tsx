import { useAuthStore } from 'store/auth';
import { useRef, MouseEvent } from 'react';
import { FiPlus } from 'react-icons/fi';
import { alertError } from 'utils/alert';
import * as s from 'styles/home/ManyAdd';

export default function ManyAdd({ refetch }: { refetch: () => void }) {
  const refAddPopUp = useRef<HTMLDivElement>(null);
  const refAddInput = useRef<HTMLInputElement>(null);
  const { id: myid } = useAuthStore();

  const click$addRoom = () => {
    if (refAddPopUp.current) {
      refAddPopUp.current.classList.add('visible');
    }
  };

  const click$popup = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    if (e.target === refAddPopUp.current) {
      refAddPopUp.current.classList.remove('visible');
    }
  };

  const click$submit = async () => {
    const $popup = refAddPopUp.current;
    const $input = refAddInput.current;
    if (!$popup || !$input) {
      return;
    }
    if (!($input instanceof HTMLInputElement)) {
      return;
    }
    if ($input.value === '') {
      alertError('한 글자 이상을 입력하셔야 합니다.');
    }
    const response = await fetch('/api/many-list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        myid,
        title: $input.value,
      }),
    });
    if (response.status !== 201) {
      alertError('죄송합니다. 문제가 생겼습니다.');
      return;
    }
    refetch();
    $input.value = '';
    $popup.classList.remove('visible');
  };

  return (
    <>
      <s.AddButton onClick={click$addRoom}>
        <FiPlus />
      </s.AddButton>
      <s.AddPopUp ref={refAddPopUp} onClick={click$popup}>
        <s.AddPopUpContent>
          <s.AddPopUpContentTitle>방 생성하기</s.AddPopUpContentTitle>
          <s.AddPopUpContentInput>
            <label htmlFor={'name'}>이름</label>
            <input type={'text'} id={'name'} ref={refAddInput} />
          </s.AddPopUpContentInput>
          <s.AddPopUpContentSubmit onClick={click$submit}>확인</s.AddPopUpContentSubmit>
        </s.AddPopUpContent>
      </s.AddPopUp>
    </>
  );
}
