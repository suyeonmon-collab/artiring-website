import CatVideo from '@/components/common/CatVideo';

export default function HeroWalkingCharacter() {
  return (
    <CatVideo
      src="/videos/cat1.mp4"
      alt="뮤모 캐릭터"
      className="w-80 h-80 md:w-full md:max-w-[680px] md:h-auto md:aspect-square mx-auto md:mx-0 md:ml-auto object-contain"
    />
  );
}
