import { auth } from 'fb';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuthStore } from 'store/auth';
import { useEffect } from 'react';
import { alertError } from 'utils/alert';

export default function Auth() {
  const { changeAll } = useAuthStore();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // 사용자가 없는 경우
      if (!user) {
        changeAll({
          status: 'failed',
          id: null,
          name: null,
          photo: null,
        });
        return;
      }

      const resGet = await fetch(`/api/auth?user=${user.uid}`);

      // 로그인
      if (resGet.status === 200) {
        const { name, photo } = await resGet.json();
        changeAll({
          status: 'fetched',
          id: user.uid,
          name,
          photo,
        });
        return;
      }

      // 회원가입
      if (resGet.status === 404) {
        const defaultPhoto = process.env.NEXT_PUBLIC_USER_PHOTO;
        if (typeof defaultPhoto !== 'string') {
          alertError('죄송합니다. 회원가입이 되지 않았습니다.');
          return;
        }
        const { uid, displayName, email, photoURL } = user;
        if (typeof email !== 'string') {
          alertError('죄송합니다. 회원가입이 되지 않았습니다.');
          return;
        }
        const name = displayName ? displayName : email?.split('@')[0];
        const photo = photoURL ? photoURL : defaultPhoto;
        const resPost = await fetch(`/api/auth?user=${uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, photo }),
        });
        if (resPost.status !== 201) {
          alertError('죄송합니다. 회원가입이 되지 않았습니다.');
          return;
        }
        changeAll({
          status: 'fetched',
          id: uid,
          name,
          photo,
        });
        return;
      }

      // 오류 발생
      alertError('죄송합니다. 문제가 발생해서 처리되지 않았습니다.');
      return;
    });
  }, []);

  return <></>;
}
