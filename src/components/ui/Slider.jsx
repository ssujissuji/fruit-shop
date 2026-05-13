import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    title: '신선한 과일을',
    titleHighlight: '매일 배송',
    description: '산지에서 바로 보내는 최고의 신선함을 경험해보세요',
    bg: 'from-emerald-500 via-green-500 to-teal-500',
    bgLight: 'bg-emerald-50',
    emoji: '🍎',
    emojiList: ['🍊', '🍋', '🍇'],
    cta: '지금 쇼핑하기',
    badge: '당일 산지 직송',
  },
  {
    id: 2,
    title: '제철 과일',
    titleHighlight: '특가 할인',
    description: '이번 주 제철 과일을 특별한 가격에 만나보세요',
    bg: 'from-orange-400 via-amber-400 to-yellow-400',
    bgLight: 'bg-orange-50',
    emoji: '🍊',
    emojiList: ['🍋', '🥭', '🍑'],
    cta: '할인 상품 보기',
    badge: '최대 30% 할인',
  },
  {
    id: 3,
    title: '국내산 프리미엄',
    titleHighlight: '과일 모음',
    description: '믿을 수 있는 국내 농가에서 직접 재배한 건강한 과일',
    bg: 'from-pink-500 via-rose-400 to-red-400',
    bgLight: 'bg-pink-50',
    emoji: '🍓',
    emojiList: ['🍑', '🍒', '🫐'],
    cta: '국내산 보기',
    badge: '인증 농가 직송',
  },
];

const AUTO_PLAY_INTERVAL = 4000;

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const goToSlide = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goPrev = () =>
    goToSlide((currentIndex - 1 + SLIDES.length) % SLIDES.length);

  const goNext = () => goToSlide((currentIndex + 1) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIndex];

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-linear-to-br ${slide.bg} transition-all duration-500`}
      style={{ minHeight: '340px' }}>
      {/* 배경 장식 원들 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-8 w-56 h-56 rounded-full bg-white/10" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white/5" />
      </div>

      {/* 좌우 화살표 */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
        aria-label="이전 슬라이드">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
        aria-label="다음 슬라이드">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* 콘텐츠 */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-16 py-12 gap-6">
        {/* 텍스트 영역 */}
        <div className="text-white text-center md:text-left">
          {/* 뱃지 */}
          <span className="inline-block bg-white/25 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            ✨ {slide.badge}
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-2">
            {slide.title}
            <br />
            <span className="text-white drop-shadow-sm">
              {slide.titleHighlight}
            </span>
          </h2>
          <p className="text-white/80 text-base md:text-lg mb-6 max-w-xs">
            {slide.description}
          </p>

          <button
            onClick={() => navigate('/')}
            className="bg-white text-green-700 font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 text-sm">
            {slide.cta} →
          </button>
        </div>

        {/* 이모지 영역 */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <div
            className="text-8xl md:text-9xl drop-shadow-lg animate-bounce"
            style={{ animationDuration: '2s' }}>
            {slide.emoji}
          </div>
          <div className="flex flex-col gap-2">
            {slide.emojiList.map((emoji, i) => (
              <div
                key={i}
                className="text-3xl md:text-4xl opacity-70 hover:opacity-100 transition-opacity">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-7'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`${index + 1}번 슬라이드`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
