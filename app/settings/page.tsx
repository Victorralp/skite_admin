'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import LiveStreamingModal from '@/components/LiveStreamingModal';
import ComplianceModal from '@/components/ComplianceModal';
import NotificationSettingsModal from '@/components/NotificationSettingsModal';

export default function SettingsPage() {
  const router = useRouter();
  const [isLiveStreamingModalOpen, setIsLiveStreamingModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  const settingCards = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.93005 12.0473H1.52539C1.31074 12.0473 1.10489 11.962 0.95311 11.8102C0.80133 11.6585 0.71606 11.4526 0.71606 11.238C0.71606 10.594 0.97187 9.9765 1.4272 9.5211C1.88254 9.0658 2.5001 8.81 3.14404 8.81H3.95337M3.95337 6.3415C3.6562 6.2808 3.37649 6.1539 3.13495 5.9705C2.89341 5.787 2.6962 5.5516 2.55793 5.2816C2.41966 5.0116 2.34386 4.714 2.33613 4.4108C2.3284 4.1076 2.38895 3.80648 2.5133 3.52982C2.63764 3.25315 2.8226 3.00799 3.05448 2.81245C3.28637 2.61692 3.55925 2.47602 3.85295 2.40019C4.1466 2.32436 4.4536 2.31553 4.7512 2.37435C5.0487 2.43318 5.3293 2.55815 5.572 2.74003M14.0699 12.0473H14.4746C14.6893 12.0473 14.8951 11.962 15.0469 11.8102C15.1987 11.6585 15.2839 11.4526 15.2839 11.238C15.2839 10.594 15.0281 9.9765 14.5728 9.5211C14.1175 9.0658 13.4999 8.81 12.856 8.81H12.0466M12.0466 6.3415C12.3438 6.2808 12.6235 6.1539 12.8651 5.9705C13.1066 5.787 13.3038 5.5516 13.4421 5.2816C13.5803 5.0116 13.6561 4.714 13.6639 4.4108C13.6716 4.1076 13.611 3.80648 13.4867 3.52982C13.3624 3.25315 13.1774 3.00799 12.9455 2.81245C12.7136 2.61692 12.4407 2.47602 12.1471 2.40019C11.8534 2.32436 11.5464 2.31553 11.2488 2.37435C10.9513 2.43318 10.6707 2.55815 10.428 2.74003M10.8326 13.6659H5.16741C4.95276 13.6659 4.74691 13.5807 4.59513 13.4289C4.44335 13.2771 4.35808 13.0713 4.35808 12.8566C4.35808 12.2127 4.61389 11.5951 5.06922 11.1398C5.52456 10.6844 6.14212 10.4286 6.78606 10.4286H9.21404C9.85798 10.4286 10.4755 10.6844 10.9309 11.1398C11.3862 11.5951 11.642 12.2127 11.642 12.8566C11.642 13.0713 11.5567 13.2771 11.4049 13.4289C11.2531 13.5807 11.0473 13.6659 10.8326 13.6659ZM10.0233 5.9773C10.0233 6.514 9.8101 7.0286 9.4307 7.408C9.0513 7.7875 8.5366 8.0007 8 8.0007C7.4634 8.0007 6.9487 7.7875 6.5693 7.408C6.1899 7.0286 5.9767 6.514 5.9767 5.9773C5.9767 5.4407 6.1899 4.9261 6.5693 4.5466C6.9487 4.1672 7.4634 3.95402 8 3.95402C8.5366 3.95402 9.0513 4.1672 9.4307 4.5466C9.8101 4.9261 10.0233 5.4407 10.0233 5.9773Z" stroke="#5F2EFC" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Admin Roles',
      description: 'Manage permissions, add/remove admins, role hierarchy',
      href: '/settings/admin-roles',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.3586 12.3947C9.6206 13 8.5253 13 6.3333 13C4.142 13 3.04598 13 2.30798 12.3947C2.17308 12.2839 2.04937 12.1602 1.93865 12.0253C1.33331 11.2867 1.33331 10.192 1.33331 8C1.33331 5.8087 1.33331 4.7127 1.93865 3.97467C2.04937 3.83977 2.17308 3.71606 2.30798 3.60533C3.04665 3 4.1413 3 6.3333 3C8.5246 3 9.6206 3 10.3586 3.60533C10.4935 3.71606 10.6173 3.83977 10.728 3.97467C11.3333 4.7133 11.3333 5.808 11.3333 8C11.3333 10.1913 11.3333 11.2873 10.728 12.0253C10.6173 12.1602 10.4935 12.2839 10.3586 12.3947ZM11.3333 8.6667V7.3333L13.0666 5.022C13.1785 4.8726 13.3346 4.7622 13.5127 4.7065C13.6908 4.6508 13.8819 4.6526 14.059 4.7116C14.2361 4.7706 14.39 4.8839 14.4991 5.0353C14.6082 5.1868 14.6668 5.3687 14.6666 5.5553V10.4447C14.6668 10.6313 14.6082 10.8132 14.4991 10.9647C14.39 11.1161 14.2361 11.2294 14.059 11.2884C13.8819 11.3474 13.6908 11.3492 13.5127 11.2935C13.3346 11.2378 13.1785 11.1274 13.0666 10.978L11.3333 8.6667Z" stroke="#5F2EFC" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M6.3333 9C6.5985 9 6.8529 8.8946 7.0404 8.7071C7.228 8.5196 7.3333 8.2652 7.3333 8C7.3333 7.7348 7.228 7.4804 7.0404 7.2929C6.8529 7.1054 6.5985 7 6.3333 7M6.3333 9C6.0681 9 5.8137 8.8946 5.6262 8.7071C5.4387 8.5196 5.3333 8.2652 5.3333 8C5.3333 7.7348 5.4387 7.4804 5.6262 7.2929C5.8137 7.1054 6.0681 7 6.3333 7M6.3333 9V7" stroke="#5F2EFC" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Live Streaming',
      description: 'Stream limits, RTMP settings, emergency controls',
      href: 'modal',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6227 9.986C12.4238 9.6682 12.3182 9.3009 12.318 8.926V6.15C12.318 5.0048 11.8631 3.90653 11.0533 3.09674C10.2435 2.28696 9.1452 1.83203 8 1.83203C6.8548 1.83203 5.7565 2.28696 4.9467 3.09674C4.1369 3.90653 3.68199 5.0048 3.68199 6.15V8.9247C3.68205 9.3001 3.57647 9.6679 3.37733 9.986L2.65199 11.146C2.58892 11.2469 2.55401 11.3629 2.55089 11.4819C2.54777 11.6008 2.57654 11.7185 2.63423 11.8225C2.69192 11.9266 2.77642 12.0134 2.87895 12.0738C2.98149 12.1342 3.09832 12.166 3.21733 12.166H12.7827C12.9017 12.166 13.0185 12.1342 13.121 12.0738C13.2236 12.0134 13.3081 11.9266 13.3658 11.8225C13.4234 11.7185 13.4522 11.6008 13.4491 11.4819C13.446 11.3629 13.4111 11.2469 13.348 11.146L12.6227 9.986Z" stroke="#5F2EFC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.6667 14.166H9.3333" stroke="#5F2EFC" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Notifications',
      description: 'Email/SMS templates, delivery channels, rate limits',
      href: 'modal-notification',
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6.9453C2 4.8133 2 3.74732 2.252 3.38865C2.50333 3.03065 3.50533 2.68732 5.51 2.00132L5.892 1.87065C6.9367 1.51265 7.4587 1.33398 8 1.33398C8.5413 1.33398 9.0633 1.51265 10.108 1.87065L10.49 2.00132C12.4947 2.68732 13.4967 3.03065 13.748 3.38865C14 3.74732 14 4.814 14 6.9453V7.9947C14 11.7533 11.174 13.578 9.4007 14.352C8.92 14.562 8.68 14.6673 8 14.6673C7.32 14.6673 7.08 14.562 6.5993 14.352C4.826 13.5773 2 11.754 2 7.9947V6.9453Z" stroke="#5F2EFC" strokeWidth="1.5"/>
          <path d="M8 5.334V8.0007" stroke="#5F2EFC" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 10.6673C8.3682 10.6673 8.6666 10.3688 8.6666 10.0007C8.6666 9.6325 8.3682 9.334 8 9.334C7.6318 9.334 7.3333 9.6325 7.3333 10.0007C7.3333 10.3688 7.6318 10.6673 8 10.6673Z" fill="#5F2EFC"/>
        </svg>
      ),
      title: 'Compliance',
      description: 'Content moderation, data retention, NDPR/GDPR',
      href: 'modal-compliance',
    },
  ];

  return (
    <PageContainer>
      <div className="flex flex-col gap-2">
        <h1 className="text-[20px] font-bold text-[#2B2834] leading-[100%] tracking-[-0.01em] font-['Neue_Montreal']">
          Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          {settingCards.map((card, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (card.href === 'modal') {
                    setIsLiveStreamingModalOpen(true);
                  } else if (card.href === 'modal-compliance') {
                    setIsComplianceModalOpen(true);
                  } else if (card.href === 'modal-notification') {
                    setIsNotificationModalOpen(true);
                  } else if (card.href !== '#') {
                    router.push(card.href);
                  }
                }}
                className="flex flex-row items-start p-3 gap-2 w-full max-w-[268px] h-[78px] bg-[#F9F9FB] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex flex-col justify-center items-center w-7 h-7 rounded flex-shrink-0">
                  {card.icon}
                </div>

                <div className="flex flex-col justify-center items-start gap-1.5 flex-1 min-w-0 h-[54px]">
                  <h3 className="text-[13.5px] font-bold leading-4 text-[#5F2EFC] w-full">
                    {card.title}
                  </h3>
                  <p className="text-[13.5px] font-normal leading-4 text-[#2B2834] w-full">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LiveStreamingModal
        isOpen={isLiveStreamingModalOpen}
        onClose={() => setIsLiveStreamingModalOpen(false)}
      />

      <ComplianceModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
      />

      <NotificationSettingsModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </PageContainer>
  );
}
