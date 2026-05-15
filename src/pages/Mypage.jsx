import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { selectUser, updateProfile, logout } from '../store/authSlice';

const profileSchema = z.object({
  name: z.string().min(1, '이름을 입력해 주세요.').trim().min(1, '이름을 입력해 주세요.'),
});

function Mypage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name ?? '' },
  });

  const onSubmit = (data) => {
    dispatch(updateProfile({ name: data.name.trim() }));
    reset({ name: data.name.trim() });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const initial = user?.name?.charAt(0) ?? '?';

  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      <h1 className="text-2xl font-bold text-text-main font-ui mb-8">마이페이지</h1>

      <div className="max-w-lg space-y-6">
        {/* 프로필 카드 */}
        <div
          className="bg-white rounded-card p-6 flex items-center gap-5"
          style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}>
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-white font-ui">{initial}</span>
          </div>
          <div>
            <p className="text-lg font-bold text-text-main font-ui">{user?.name}</p>
            <p className="text-sm text-text-muted font-body mt-0.5">{user?.email}</p>
          </div>
        </div>

        {/* 프로필 수정 */}
        <div
          className="bg-white rounded-card p-6"
          style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}>
          <h2 className="text-base font-bold text-text-main font-ui mb-4">프로필 수정</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-text-sub font-ui mb-1.5">
                이름
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="이름을 입력해 주세요"
                className={`w-full px-4 py-3 rounded-input bg-bg-input text-sm font-body text-text-main placeholder:text-text-disabled outline-none transition-all border ${
                  errors.name
                    ? 'border-red-400 focus:border-red-400'
                    : 'border-transparent focus:border-primary'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500 font-body">{errors.name.message}</p>
              )}
            </div>

            {isSubmitSuccessful && !isDirty && (
              <p className="mb-3 text-xs text-green-600 font-body">이름이 변경되었습니다.</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-btn bg-primary text-white text-sm font-bold font-ui transition-all hover:opacity-90 active:scale-95"
              style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }}>
              저장
            </button>
          </form>
        </div>

        {/* 계정 관리 */}
        <div
          className="bg-white rounded-card p-6"
          style={{ boxShadow: '0px 4px 17px rgba(0, 0, 0, 0.07)' }}>
          <h2 className="text-base font-bold text-text-main font-ui mb-4">계정 관리</h2>
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-btn border border-border-line text-sm font-semibold font-ui text-text-sub hover:border-primary hover:text-primary transition-colors">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
