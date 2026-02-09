'use client';

import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import EmptyStateIllustration from './EmptyStateIllustration';
import PageContainer from './layout/PageContainer';

interface Message {
  id: string;
  sender: string;
  role: string;
  message: string;
  time: string;
  avatar: string;
  unread?: number;
  isActive?: boolean;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Ramson Idris',
    role: 'Creator',
    message: 'Lorem ipsum erat tristique ut gravida id quis adipiscing magna.',
    time: '12:30 PM',
    avatar: '/image.png',
    isActive: true,
  },
  {
    id: '2',
    sender: 'Noah Smith',
    role: 'User',
    message: 'Lorem ipsum erat tristique ut gravida id quis adipiscing magna.',
    time: '12:30 PM',
    avatar: '/image.png',
    unread: 2,
  },
  {
    id: '3',
    sender: 'Justin Lake',
    role: 'User',
    message: 'Lorem ipsum erat tristique ut gravida id quis adipiscing magna.',
    time: '12:30 PM',
    avatar: '/image.png',
  },
  {
    id: '4',
    sender: 'James Brown',
    role: 'Creator',
    message: 'Lorem ipsum erat tristique ut gravida id quis adipiscing magna.',
    time: '12:30 PM',
    avatar: '/image.png',
  },
];

export default function SupportCenter() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Filter messages based on active tab
  const filteredMessages = mockMessages.filter((msg) => {
    if (activeTab === 'pending') {
      return msg.unread && msg.unread > 0; // Only show messages with unread badges
    }
    if (activeTab === 'closed') {
      return !msg.unread || msg.unread === 0; // Only show messages WITHOUT unread badges
    }
    return true; // Show all messages for 'all' tab
  });

  return (
    <PageContainer>
      {/* Header and Stats */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[20px] font-bold text-[#2B2834] leading-6 tracking-[-0.01em]">Support Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
          <div className="flex flex-col items-start bg-white border border-[#EBEBEB] rounded-lg p-4 gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs leading-[14px] text-[#5F5971]">Open Tickets</span>
              <span className="text-lg leading-[22px] font-medium text-[#2B2834]">1,247</span>
            </div>
            <span className="text-[10px] leading-3 text-[#239B73]">+23 today</span>
          </div>
          <div className="flex flex-col items-start bg-white border border-[#EBEBEB] rounded-lg p-4 gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs leading-[14px] text-[#5F5971]">User Tickets</span>
              <span className="text-lg leading-[22px] font-medium text-[#2B2834]">892</span>
            </div>
            <span className="text-[10px] leading-3 text-[#A5A1AF]">72%</span>
          </div>
          <div className="flex flex-col items-start bg-white border border-[#EBEBEB] rounded-lg p-4 gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs leading-[14px] text-[#5F5971]">Creator Tickets</span>
              <span className="text-lg leading-[22px] font-medium text-[#2B2834]">355</span>
            </div>
            <span className="text-[10px] leading-3 text-[#A5A1AF]">28%</span>
          </div>
          <div className="flex flex-col items-start bg-white border border-[#EBEBEB] rounded-lg p-4 gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs leading-[14px] text-[#5F5971]">Auto-Resolved</span>
              <span className="text-lg leading-[22px] font-medium text-[#2B2834]">156</span>
            </div>
            <span className="text-[10px] leading-3 text-[#A5A1AF]">12%</span>
          </div>
        </div>
      </div>

      {/* Tabs and Chat Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center p-[3px] bg-[#F9F9FB] rounded-lg w-[249px] h-[34px] gap-[3px]">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex flex-col justify-center items-center px-6 h-7 text-xs font-medium leading-[14px] text-center rounded-[5px] transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#17181C] shadow-[0px_0px_3px_rgba(22,0,155,0.35)]'
                : 'bg-[#F8F7FC] text-[#999999]'
            }`}
            style={{ width: '61px' }}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex flex-col justify-center items-center px-6 h-7 text-xs font-medium leading-[14px] text-center rounded-[5px] transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-[#17181C] shadow-[0px_0px_3px_rgba(22,0,155,0.35)]'
                : 'bg-[#F8F7FC] text-[#999999]'
            }`}
            style={{ width: '85px' }}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`flex flex-col justify-center items-center px-6 h-7 text-xs font-medium leading-[14px] text-center rounded-[5px] transition-all ${
              activeTab === 'closed'
                ? 'bg-white text-[#17181C] shadow-[0px_0px_3px_rgba(22,0,155,0.35)]'
                : 'bg-[#F8F7FC] text-[#999999]'
            }`}
            style={{ width: '91px' }}
          >
            Closed
          </button>
        </div>

        <div className="flex border border-[#EBEBEB] rounded-2xl overflow-hidden h-[656px]">
          {/* Messages List */}
          <div className="flex flex-col w-[388px] bg-white p-4 gap-2.5">
            {/* Search */}
            <div className="flex items-center gap-2 px-2.5 py-2 bg-[#F9F9FB] border border-[#EBEBEB] rounded h-[30px]">
              <Search className="w-3 h-3 text-[#5F5971] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search users, products, docs"
                className="flex-1 bg-transparent text-xs leading-[14px] text-[#A5A1AF] outline-none placeholder:text-[#A5A1AF]"
              />
            </div>

            {/* Messages List */}
            <div className="flex flex-col gap-0 overflow-y-auto">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg)}
                  className={`flex items-center gap-2 p-4 rounded-lg transition-colors h-20 ${
                    selectedMessage?.id === msg.id ? 'bg-[#F3F0FF]' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-gray-200 flex-shrink-0" />
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-base leading-[19px] text-[#2B2834] truncate">
                        {msg.sender}
                      </span>
                      <span className="text-xs leading-[14px] text-[#5F5971] flex-shrink-0 ml-2">
                        {msg.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <p className="text-[13.5px] leading-4 text-[#5F5971] truncate flex-1">
                        {msg.message}
                      </p>
                      {msg.unread && (
                        <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#CD110A] text-white text-xs font-medium leading-[18px] rounded-full flex-shrink-0">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-[#F3F0FF] border-l border-[#F0EBF4]">
            {!selectedMessage ? (
              /* Empty State - Show until a chat is clicked */
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="w-[166px] h-[166px] flex items-center justify-center">
                  <EmptyStateIllustration />
                </div>
                <p className="text-base leading-[19px] text-center text-[#1F1F1F] max-w-[184px]">
                  Select a conversation to proceed
                </p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="flex flex-col justify-center items-center px-4 pr-8 py-4 bg-white border-b border-[#EEEEEE] h-20">
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-base leading-[19px] text-[#2B2834]">
                        {selectedMessage.sender}
                      </span>
                      <span className="text-[13.5px] leading-4 font-medium text-[#5F5971]">
                        {selectedMessage.role}
                      </span>
                    </div>
                  </div>
                </div>

            {/* Messages */}
            <div className="flex-1 flex flex-col px-8 pt-8 pb-0 overflow-y-auto">
              <div className="flex flex-col items-end gap-6">
                {/* Date Divider */}
                <div className="flex items-center gap-[21px] w-full">
                  <div className="flex-1 h-px border-t border-[#E1E1E1]" />
                  <span className="text-xs font-medium leading-[18px] text-[#4B4B4B]">
                    March 24, 2026
                  </span>
                  <div className="flex-1 h-px border-t border-[#E1E1E1]" />
                </div>

                {/* Messages Container */}
                <div className="flex flex-col items-start gap-6 w-full">
                  {/* Incoming Message */}
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium leading-[22px] text-[#1F1F1F]">
                          {selectedMessage.sender}
                        </span>
                        <span className="text-xs font-medium leading-[18px] text-[#8E8E8E]">
                          2:20pm
                        </span>
                      </div>
                      <div className="px-3.5 py-2.5 bg-white rounded-tr-lg rounded-b-lg">
                        <p className="text-base leading-[26px] text-[#1F1F1F]">
                          Hey Olivia, can you please review the latest design when you can?
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Incoming Audio Message */}
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium leading-[22px] text-[#1F1F1F]">
                        {selectedMessage.sender}
                      </span>
                      <div className="flex items-center gap-3 px-3.5 py-2 bg-white rounded-tr-lg rounded-b-lg h-12">
                        <button className="w-8 h-8 rounded-full bg-[#5838FC] flex items-center justify-center flex-shrink-0">
                          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-0.5" />
                        </button>
                        <div className="flex items-center gap-1 py-2">
                          {[2, 8, 14, 4, 16, 14, 10, 10, 10, 14, 10, 16, 10, 4, 2].map((h, i) => (
                            <div
                              key={i}
                              className="w-0.5 bg-[#1F1F1F] opacity-66 rounded-full"
                              style={{ height: `${h}px` }}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium leading-[22px] text-[#1F1F1F] opacity-66">
                          0:32
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Outgoing Message */}
                  <div className="flex justify-end w-full">
                    <div className="flex flex-col gap-1.5 items-end max-w-[369px]">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium leading-5 text-[#344054]">You</span>
                        <span className="text-xs leading-[18px] text-[#667085]">2:20pm</span>
                      </div>
                      <div className="px-3.5 py-2.5 bg-[#5838FC] rounded-tl-lg rounded-b-lg">
                        <p className="text-base leading-6 text-white">
                          Sure thing, I'll have a look today.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium leading-[22px] text-[#1F1F1F]">
                        {selectedMessage.sender}
                      </span>
                      <div className="px-2.5 py-2.5 bg-white rounded-tr-lg rounded-b-lg flex items-center gap-1 h-7">
                        <div className="flex items-end h-2 gap-0">
                          <div className="w-1 h-1 bg-[#667085] rounded-full" />
                        </div>
                        <div className="flex items-start h-2 gap-0">
                          <div className="w-1 h-1 bg-[#98A2B3] rounded-full" />
                        </div>
                        <div className="flex items-end h-2 gap-0">
                          <div className="w-1 h-1 bg-[#667085] rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-2 pb-2">
              <div className="flex items-center justify-between gap-2 px-3 py-3 bg-white border border-[#E8E8E8] rounded-lg">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 text-base text-[#141414] outline-none"
                />
                <button className="w-8 h-8 flex items-center justify-center bg-[#5838FC] rounded-full hover:bg-[#4729d4] transition-colors">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
