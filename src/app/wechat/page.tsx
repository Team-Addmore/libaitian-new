import WeChatHero from '@/components/wechat/WeChatHero';
import WeChatMiniProgram from '@/components/wechat/WeChatMiniProgram';
import WeChatFeatures from '@/components/wechat/WeChatFeatures';
import MarketingStrategy from '@/components/wechat/MarketingStrategy';
import PlatformCase from '@/components/wechat/PlatformCase';
// import ContactForm from '@/components/wechat/ContactForm';

export const metadata = {
  title: 'WeChat - LIBAITIAN',
  description: 'LIBAITIAN의 WeChat 공식 계정을 통해 더 가까이 소통하세요.',
};

export default function WeChatPage() {
  return (
    <>
      <WeChatHero />
      <WeChatMiniProgram />
      <WeChatFeatures />
      <MarketingStrategy />
      <PlatformCase />
      {/* <ContactForm /> */}
    </>
  );
}
