import { auth } from 'fb';
import { signOut } from 'firebase/auth';
import { useAuthStore, status } from 'store/auth';
import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiUser } from 'react-icons/fi';
import * as s from 'styles/common/HeaderAuth';

export default function HeaderAuth() {
  const { status: currentStatus, photo } = useAuthStore();
  const userphoto = photo ?? '';
  const router = useRouter();
  const refLoginContent = useRef<HTMLDivElement>(null);

  const click$logout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const pointerdown$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.toggle('visible');
    }
  };

  const mouseenter$photo = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.add('visible');
    }
  };

  const mouseleave$container = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove('visible');
    }
  };

  const click$logincontent = () => {
    if (refLoginContent.current) {
      refLoginContent.current.classList.remove('visible');
    }
  };

  if (currentStatus === status.loading) {
    return (
      <s.Container>
        <s.Skeleton></s.Skeleton>
      </s.Container>
    );
  }

  if (currentStatus === status.failed) {
    return (
      <s.Container id="to-login">
        <s.Icon>
          <Link href={'/sign'}>
            <a>
              <FiUser />
            </a>
          </Link>
        </s.Icon>
      </s.Container>
    );
  }

  if (currentStatus === status.fetched) {
    return (
      <s.Container onMouseLeave={mouseleave$container}>
        <s.Photo
          onPointerDown={pointerdown$photo}
          onMouseEnter={mouseenter$photo}
          id="to-profile"
        >
          <img src={userphoto} alt={'프로필 사진'} referrerPolicy={'no-referrer'} />
        </s.Photo>
        <s.LoginContent ref={refLoginContent} onClick={click$logincontent}>
          <s.LogoutButton>
            <button onClick={click$logout} id="log-out">
              로그아웃
            </button>
          </s.LogoutButton>
          <s.ToProfile>
            <Link href={'/profile'}>
              <a id="to-profile-button">프로필</a>
            </Link>
          </s.ToProfile>
        </s.LoginContent>
      </s.Container>
    );
  }

  return <></>;
}
