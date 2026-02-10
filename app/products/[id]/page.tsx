'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import ContentViewer from '@/components/ContentViewer';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [expandedModule, setExpandedModule] = useState<number | null>(1);
  const [activeLesson, setActiveLesson] = useState({ id: 1, type: 'Reading' as 'Reading' | 'Video' });

  const modules = [
    {
      id: 1,
      title: '01 Introduction',
      lessons: [
        { id: 1, title: 'Introduction to Interior Design', type: 'Reading', duration: '2 min', active: activeLesson.id === 1 },
        { id: 2, title: 'Approaching Interior Design', type: 'Video', duration: '5 min', active: activeLesson.id === 2 }
      ]
    },
    { id: 2, title: '02 Discovery', lessons: [] },
    { id: 3, title: '03 Timeline', lessons: [] },
    { id: 4, title: '04 Practice', lessons: [] },
    { id: 5, title: '05 Test', lessons: [] }
  ];

  const comments = [
    {
      id: 1,
      author: 'Jane Doe',
      time: '1 Month ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
      text: 'Can someone please provide me with some examples of similar work that\'s been done before? I want to',
      isCreator: false
    },
    {
      id: 2,
      author: 'John Doe',
      time: '1 Month ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      text: 'Running behind schedule on this task, can someone please provide me with some help to catch up?',
      isCreator: false
    },
    {
      id: 3,
      author: 'Sarah Smith',
      time: '2 Months ago',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      text: 'This is exactly what I was looking for! Thank you for creating this course.',
      isCreator: true
    }
  ];

  return (
    <PageContainer>
      {/* Go Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 px-2 py-1.5 w-[88px] h-[29px] bg-[#F9F9FB] rounded-md hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-[#2B2834]" />
        <span className="font-['Neue_Montreal'] font-medium text-[14px] leading-[17px] tracking-[-0.01em] text-[#2B2834]">
          Go back
        </span>
      </button>

      {/* Content Layout */}
      <div className="flex gap-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Title */}
          <h1 className="font-['Neue_Montreal'] font-bold text-[20px] leading-[24px] tracking-[-0.01em] text-[#2B2834] line-clamp-2">
            Interior Design Course
          </h1>

          {/* Content Viewer */}
          <div className="flex flex-col gap-4">
            <ContentViewer type={activeLesson.type} />

            {/* Lesson Title and Description */}
            <div className="flex flex-col gap-3.5">
              <h2 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#1F1F1F] line-clamp-2">
                {activeLesson.type === 'Reading' ? 'Introduction to Interior Design' : 'Approaching Interior Design'}
              </h2>
              <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#4B4B4B] line-clamp-3">
                Explore the fascinating realm of interior design with our comprehensive book! You&apos;ll discover inspiring projects and gain personalized insights to ignite your creativity.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-[#EBEBEB]" />

            {/* Comments Section */}
            <div className="flex flex-col gap-3">
              <h3 className="font-['Neue_Montreal'] font-bold text-[16px] leading-[19px] text-[#1F1F1F]">
                Comments
              </h3>
              <div className="flex flex-col gap-4 p-4 bg-white border border-[#EBEBEB] rounded">
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className={`flex gap-2 pb-4 ${index !== comments.length - 1 ? 'border-b border-[#EBEBEB]' : ''}`}
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`font-['Neue_Montreal'] text-[13.5px] leading-[16px] text-[#1F1F1F] truncate ${comment.isCreator ? 'font-bold' : 'font-medium'}`}>
                          {comment.author}
                        </span>
                        <span className="font-['Neue_Montreal'] font-normal text-[10px] leading-[12px] text-[#A5A1AF]">
                          {comment.time}
                        </span>
                      </div>
                      {comment.isCreator ? (
                        <div className="px-2 py-1 bg-[#F9F9FB] rounded-br-lg rounded-bl-lg rounded-tr-lg">
                          <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#1F1F1F] line-clamp-3">
                            {comment.text}
                          </p>
                        </div>
                      ) : (
                        <p className="font-['Neue_Montreal'] font-normal text-[13.5px] leading-[16px] text-[#5F5971] line-clamp-3">
                          {comment.text}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Course Content Sidebar */}
        <div className="w-[306px] flex flex-col gap-6">
          <h3 className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#5F5971]">
            Course Content
          </h3>

          <div className="flex flex-col gap-2 p-4 bg-white border border-[#EBEBEB] rounded-lg">
            {modules.map((module) => (
              <div key={module.id} className="flex flex-col">
                {/* Module Header */}
                <button
                  onClick={() => module.lessons.length > 0 ? setExpandedModule(expandedModule === module.id ? null : module.id) : undefined}
                  className={`flex items-center justify-between py-2.5 ${module.id !== modules.length ? 'border-b border-[#EBEBEB]' : ''} ${module.lessons.length === 0 ? 'cursor-default' : ''}`}
                >
                  <span className="font-['Neue_Montreal'] font-medium text-[16px] leading-[19px] text-[#2B2834] truncate">
                    {module.title}
                  </span>
                  {module.lessons.length > 0 && (
                    expandedModule === module.id ? (
                      <ChevronDown className="w-4 h-4 text-[#5F5971]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#5F5971]" />
                    )
                  )}
                </button>

                {/* Module Lessons */}
                {expandedModule === module.id && module.lessons.length > 0 && (
                  <div className="flex flex-col gap-1 pt-3">
                    {module.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson({ id: lesson.id, type: lesson.type as 'Reading' | 'Video' })}
                        className={`flex items-center gap-3 p-3 rounded-lg ${lesson.active ? 'bg-[#F3F0FF]' : 'bg-white border border-[#EAECF0]'}`}
                      >
                        {lesson.type === 'Reading' ? (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <rect width="32" height="32" rx="8" fill="#5838FC" />
                            <path d="M16.0002 22.7194C15.8002 22.7194 15.6002 22.6727 15.4335 22.5794C14.1868 21.8994 11.9935 21.1794 10.6202 20.9994L10.4268 20.9727C9.5535 20.866 8.8335 20.046 8.8335 19.1594V11.106C8.8335 10.5794 9.04016 10.0994 9.42016 9.75269C9.80016 9.40602 10.2935 9.23935 10.8135 9.28602C12.2802 9.39935 14.4935 10.1327 15.7468 10.9194L15.9068 11.0127C15.9535 11.0394 16.0535 11.0394 16.0935 11.0194L16.2002 10.9527C17.4535 10.166 19.6668 9.41935 21.1402 9.29269C21.1535 9.29269 21.2068 9.29269 21.2202 9.29269C21.7068 9.24602 22.2068 9.41935 22.5802 9.76602C22.9602 10.1127 23.1668 10.5927 23.1668 11.1194V19.166C23.1668 20.0594 22.4468 20.8727 21.5668 20.9794L21.3468 21.006C19.9735 21.186 17.7735 21.9127 16.5535 22.586C16.3935 22.6794 16.2002 22.7194 16.0002 22.7194ZM10.6535 10.2794C10.4402 10.2794 10.2468 10.3527 10.0935 10.4927C9.92683 10.646 9.8335 10.866 9.8335 11.106V19.1594C9.8335 19.5527 10.1735 19.9327 10.5535 19.986L10.7535 20.0127C12.2535 20.2127 14.5535 20.966 15.8868 21.6927C15.9468 21.7194 16.0335 21.726 16.0668 21.7127C17.4002 20.9727 19.7135 20.2127 21.2202 20.0127L21.4468 19.986C21.8268 19.9394 22.1668 19.5527 22.1668 19.1594V11.1127C22.1668 10.866 22.0735 10.6527 21.9068 10.4927C21.7335 10.3394 21.5135 10.266 21.2668 10.2794C21.2535 10.2794 21.2002 10.2794 21.1868 10.2794C19.9135 10.3927 17.8602 11.0794 16.7402 11.7794L16.6335 11.8527C16.2668 12.0794 15.7468 12.0794 15.3935 11.8594L15.2335 11.766C14.0935 11.066 12.0402 10.386 10.7335 10.2794C10.7068 10.2794 10.6802 10.2794 10.6535 10.2794Z" fill="white" />
                            <path d="M16 22.1602C15.7267 22.1602 15.5 21.9335 15.5 21.6602V11.6602C15.5 11.3868 15.7267 11.1602 16 11.1602C16.2733 11.1602 16.5 11.3868 16.5 11.6602V21.6602C16.5 21.9402 16.2733 22.1602 16 22.1602Z" fill="white" />
                            <path d="M13.1665 14.1602H11.6665C11.3932 14.1602 11.1665 13.9335 11.1665 13.6602C11.1665 13.3868 11.3932 13.1602 11.6665 13.1602H13.1665C13.4398 13.1602 13.6665 13.3868 13.6665 13.6602C13.6665 13.9335 13.4398 14.1602 13.1665 14.1602Z" fill="white" />
                            <path d="M13.6665 16.1602H11.6665C11.3932 16.1602 11.1665 15.9335 11.1665 15.6602C11.1665 15.3868 11.3932 15.1602 11.6665 15.1602H13.6665C13.9398 15.1602 14.1665 15.3868 14.1665 15.6602C14.1665 15.9335 13.9398 16.1602 13.6665 16.1602Z" fill="white" />
                          </svg>
                        ) : (
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
                            <rect width="32" height="32" rx="8" fill="#5838FC" />
                            <path d="M15.9801 23.1663C12.0335 23.1663 8.81348 19.953 8.81348 15.9997C8.81348 12.0463 12.0335 8.83301 15.9801 8.83301C19.9268 8.83301 23.1468 12.0463 23.1468 15.9997C23.1468 19.953 19.9335 23.1663 15.9801 23.1663ZM15.9801 9.83301C12.5801 9.83301 9.81348 12.5997 9.81348 15.9997C9.81348 19.3997 12.5801 22.1663 15.9801 22.1663C19.3801 22.1663 22.1468 19.3997 22.1468 15.9997C22.1468 12.5997 19.3801 9.83301 15.9801 9.83301Z" fill="white" />
                            <path d="M15.04 19.3267C14.7467 19.3267 14.4667 19.2533 14.22 19.1133C13.6467 18.78 13.3267 18.1267 13.3267 17.2733V15.04C13.3267 14.1867 13.64 13.5333 14.2133 13.2C14.7867 12.8667 15.5133 12.92 16.2533 13.3467L18.1867 14.46C18.9267 14.8867 19.3333 15.4867 19.3333 16.1533C19.3333 16.8133 18.9267 17.42 18.1867 17.8467L16.2533 18.96C15.84 19.2067 15.42 19.3267 15.04 19.3267ZM15.04 13.98C14.92 13.98 14.8067 14.0067 14.72 14.06C14.4667 14.2067 14.3267 14.56 14.3267 15.04V17.2733C14.3267 17.7467 14.4667 18.1067 14.72 18.2467C14.9667 18.3933 15.3467 18.3333 15.76 18.1L17.6933 16.9867C18.1067 16.7467 18.34 16.4467 18.34 16.16C18.34 15.8733 18.1 15.5733 17.6933 15.3333L15.76 14.22C15.4933 14.06 15.2467 13.98 15.04 13.98Z" fill="white" />
                          </svg>
                        )}
                        <div className="flex-1 flex flex-col gap-0.5">
                          <span className={`font-['Neue_Montreal'] font-medium text-[14px] leading-[17px] truncate ${lesson.active ? 'text-[#5F2EFC]' : 'text-[#2B2834]'}`}>
                            {lesson.title}
                          </span>
                          <span className={`font-['Neue_Montreal'] font-normal text-[11px] leading-[13px] ${lesson.active ? 'text-[#5F2EFC]' : 'text-[#A5A1AF]'}`}>
                            {lesson.type} • {lesson.duration}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}