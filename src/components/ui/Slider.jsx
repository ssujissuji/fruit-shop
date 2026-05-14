import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    title: '신선한 과일을\n매일 배송',
    description: '산지에서 바로 보내는 최고의 신선함을 경험해보세요',
    bg: '#FFF5F3',
    badgeColor: '#DF4128',
    emoji: '🍎',
    emojiList: ['🍊', '🍋', '🍒'],
    cta: '지금 쇼핑하기',
    badge: '당일 산지 직송',
  },
  {
    id: 2,
    title: '제철 과일\n특가 할인',
    description: '이번 주 제철 과일을 특별한 가격에 만나보세요',
    bg: '#F4F0FF',
    badgeColor: '#7C5CBF',
    emoji: '🍇',
    emojiList: ['🫐', '🍒', '🍑'],
    cta: '할인 상품 보기',
    badge: '최대 30% 할인',
  },
  {
    id: 3,
    title: '국내산 프리미엄\n과일 모음',
    description: '믿을 수 있는 국내 농가에서 직접 재배한 건강한 과일',
    bg: '#F0FFF5',
    badgeColor: '#059669',
    emoji: '🥝',
    emojiList: ['🍐', '🍈', '🥭'],
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
    const timer = setInterval(goNext, AUTO_PLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const slide = SLIDES[currentIndex];

  return (
    <div
      className="relative rounded-card overflow-hidden transition-colors duration-500"
      style={{ minHeight: '340px', backgroundColor: slide.bg }}
    >
      {/* 좌우 화살표 */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-sub transition-all hover:text-primary"
        style={{ boxShadow: '0px 4px 14px 1px rgba(0, 0, 0, 0.16)' }}
        aria-label="이전 슬라이드"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center text-text-sub transition-all hover:text-primary"
        style={{ boxShadow: '0px 4px 14px 1px rgba(0, 0, 0, 0.16)' }}
        aria-label="다음 슬라이드"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 콘텐츠 */}
      <div className="relative flex flex-col md:flex-row items-center justify-between px-20 py-14 gap-8">
        {/* 텍스트 영역 */}
        <div className="text-left">
          <span
            className="inline-block text-white text-xs font-semibold font-ui px-3 py-1 rounded-full mb-5"
            style={{ backgroundColor: slide.badgeColor }}
          >
            ✨ {slide.badge}
          </span>

          <h2
            className="text-4xl md:text-5xl text-text-main leading-tight mb-4 whitespace-pre-line"
            style={{ fontFamily: 'Amethysta, serif' }}
          >
            {slide.title}
          </h2>

          <p className="text-text-sub text-base md:text-lg mb-8 max-w-xs font-body">
            {slide.description}
          </p>

          <button
            onClick={() => navigate('/')}
            className="text-white font-bold font-ui px-8 py-3.5 transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: slide.badgeColor, borderRadius: '5px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }}
          >
            {slide.cta}
          </button>
        </div>

        {/* 이모지 영역 */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="text-8xl md:text-9xl drop-shadow-md" style={{ animationDuration: '2s' }}>
            {slide.emoji}
          </div>
          <div className="flex flex-col gap-3">
            {slide.emojiList.map((emoji, i) => (
              <div key={i} className="text-3xl md:text-4xl opacity-60 hover:opacity-100 transition-opacity">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: index === currentIndex ? '28px' : '8px',
              backgroundColor: index === currentIndex ? slide.badgeColor : '#D8D8D8',
            }}
            aria-label={`${index + 1}번 슬라이드`}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
