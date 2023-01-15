import { auth } from 'fb';
import { deleteUser } from 'firebase/auth';
import { useAuthStore } from 'store/auth';
import { useRouter } from 'next/router';
import { alertError } from 'utils/alert';
import * as s from 'styles/profile/Delete';
import { LoadStatus } from 'pages/profile';

export default function AccountDelete({ loadStatus }: { loadStatus: LoadStatus }) {
  const { loading, setLoading } = loadStatus;
  const router = useRouter();
  const { id: userid, changeAll } = useAuthStore();

  const click$delete = async () => {
    const answer = confirm(
      '정말로 탈퇴하시겠습니까? 탈퇴를 하시면 모든 채팅방에서 나가시게 되고, 이는 시간이 걸립니다.'
    );
    if (!answer) {
      return;
    }
    if (!userid || !auth.currentUser) {
      alertError('현재 사용자가 없습니다.');
      return;
    }
    setLoading(true);
    // auth에서 삭제
    try {
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.error(error);
      alertError('죄송합니다. 계정이 삭제되지 않았습니다.');
      setLoading(false);
    }
    // firestore에서 삭제
    const response = await fetch(`/api/auth?user=${userid}`, {
      method: 'DELETE',
    });
    if (response.status !== 204) {
      alertError('계정 정보가 완전히 삭제되지 않았습니다.');
    }
    // zustand
    changeAll({
      status: 'failed',
      id: null,
      name: null,
      photo: null,
    });
    // 홈페이지로
    router.push('/');
  };

  return (
    <s.Section>
      <s.Button onClick={click$delete} disabled={loading} id="delete-account-button">
        탈퇴
      </s.Button>
    </s.Section>
  );
}
