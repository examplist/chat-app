import { auth } from 'fb';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { alertError } from 'utils/alert';
import * as s from 'styles/sign/SignForm';

export default function SignForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);

  // 로그인
  const click$login = async () => {
    setLoading(true);
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alertError('이메일과 비밀번호를 입력하셔야 합니다!');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, emailInput, passwordInput);
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes('user-not-found')) {
          alertError('해당 계정이 존재하지 않습니다!');
        }
        if (error.message.includes('auth/wrong-password')) {
          alertError('잘못된 비밀번호를 입력하셨습니다!');
        }
      }
      setLoading(false);
    }
  };

  // 회원가입
  const click$signup = async () => {
    setLoading(true);
    const emailInput = refEmail.current?.value;
    const passwordInput = refPassword.current?.value;
    if (!emailInput || !passwordInput) {
      alertError('이메일과 비밀번호를 입력하셔야 합니다!');
      setLoading(false);
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
      router.push('/');
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes('auth/weak-password')) {
          alertError('비밀번호는 6자리 이상이어야 합니다!');
        }
        if (error.message.includes('email-already-in-use')) {
          alertError('이미 가입되어 있습니다!');
        }
      }
      setLoading(false);
    }
  };

  return (
    <s.NotLoggedIn id="sign-form">
      <s.Label htmlFor="email">이메일</s.Label>
      <s.Input type={'email'} id="email" ref={refEmail} />
      <s.Label htmlFor="password">비밀번호</s.Label>
      <s.Input type={'password'} id="password" ref={refPassword} />
      <s.Buttons>
        <s.Login onClick={click$login} disabled={loading} id="log-in">
          로그인
        </s.Login>
        <s.Signup onClick={click$signup} disabled={loading} id="sign-up-button">
          회원가입
        </s.Signup>
      </s.Buttons>
    </s.NotLoggedIn>
  );
}
